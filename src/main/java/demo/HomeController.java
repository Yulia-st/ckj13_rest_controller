package demo;

import java.security.Principal;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class HomeController {
	private UserRepository userRepository;
	private UserService userservice;
	private ConfirmTokenRepository tokenRepository;
	private MailService mailService;
	private PasswordEncoder passwordEncoder;

//	@Autowired
//	public HomeController(UserRepository userRepository, UserService userservice,
//			ConfirmTokenRepository tokenRepository) {
//		
//		this.userRepository = userRepository;
//		this.userservice = userservice;
//		this.tokenRepository = tokenRepository;
//	}

//	@Autowired
//	public HomeController(UserRepository userRepository, UserService userservice) {
//		
//		this.userRepository = userRepository;
//		this.userservice = userservice;
//	}

	@GetMapping("/index")
	public String index(Principal prl, Model model) {
		if (prl != null) {
			User user = userRepository.findByUsername(prl.getName());
			String msg = "Hello, " + user.getUsername();
			model.addAttribute("message", msg);
		}
		return "index";
	}

	@GetMapping("/admin_page")
	public String adminPage() {
		return "admin_page";
	}

	@GetMapping("/login")
	public String signIn() {
		return "login";
	}

	@GetMapping("/signup")
	public String signUp() {
		return "signup";
	}

	@PostMapping("/signup")
	public String registerNewUser(@RequestParam("username") String username, 
			@RequestParam("password") String password,
			@RequestParam("email") String email) {
		
		try {
			
			User user = userservice.register(username, password, email);
			ConfirmToken token = new ConfirmToken(user);
			tokenRepository.save(token);
			
			String confirmLink = "http://localhost:8080/confirm?token=" + token.getValue();
			String text = "Please, confirm your email via this link: " + confirmLink;

			SimpleMailMessage mail = new SimpleMailMessage();
			mail.setSubject("Confirm yr email");
			mail.setFrom("notebook@mail.com");
			mail.setTo(user.getEmail());
			mail.setText(text);
			mailService.sendMail(mail);
			return "redirect:/";
			
		} catch (UsernameExistsException e) {
			return "redirect:/signup?error";
		}
	}
	// catch (ServletException e) {
	// e.printStackTrace();
	// return "redirect:/login";
	// }

	// }

	@GetMapping("/confirm")
	public String confirmEmailWithToken(@RequestParam("token") String tokenValue) {
		
		ConfirmToken token = tokenRepository.findByValue(tokenValue);
		if (token != null) {
			User user = userRepository.findByUsername(token.getUser().getUsername());
			user.setEnabled(true);
			userRepository.save(user);
			tokenRepository.delete(token);
		}
		return "redirect:/login";
	}
	
	@GetMapping("/forgotPassword")
	public String forgot_pass() {
		return "forgot_password";
	}
	
	@PostMapping("/createPassword")
	public String remind(@RequestParam("username") String username, 
			@RequestParam("email") String email) {
		
		try {
			User user2 = userRepository.findByUsername(username);
			User userEmail = userRepository.findByEmail(email);
			if (user2 == null || userEmail==null) {
				return "redirect:/signup";
			}
			user2.setPassword(" ");
			ConfirmToken token2 = new ConfirmToken(user2);
			
			tokenRepository.save(token2);
			
			String generatedPwd = token2.getValue();
			String genPwd = generatedPwd.substring(generatedPwd.length()-6);
			String text = "Hello, " + user2.getUsername() + ". Your new password: " + genPwd + '\n';
			String text2 = "Please, follow this password reset link to create strong password: " + '\n';
			String newPwd = "http://localhost:8080/confirmPwd?token=" + token2.getValue();
			
			SimpleMailMessage mail = new SimpleMailMessage();
			mail.setSubject("Remember password");
			mail.setFrom("notebook@mail.com");
			mail.setTo(user2.getEmail());
			mail.setText(text + text2 + newPwd);
			mailService.sendMail(mail);
			
			return "redirect:/recoveryPwd"; 
			
		} catch (UsernameExistsException e) {
			return "redirect:/signup?error";
		}
	}
	
	@GetMapping("/recoveryPwd")
	public String recovery_pass() {
		return "recoveryPwd";
	}
	
	
	@GetMapping("/confirmPwd")
	public String confirmPwdWithToken(@RequestParam("token") String tokenValue) {
		ConfirmToken token = tokenRepository.findByValue(tokenValue);
		if (token != null) {
			User user = userRepository.findByUsername(token.getUser().getUsername());
			userRepository.save(user);
			tokenRepository.delete(token);
		}
		return "redirect:/recoveryPwd";
	}
	
	
	@PostMapping("/resetPwd")
	public String resetchange(@RequestParam("username") String username, 
			@RequestParam("password") String password) {
		User user = userservice.rebuilderPassword(username, password);
		userRepository.save(user);
		return "redirect:/";
	}
}
