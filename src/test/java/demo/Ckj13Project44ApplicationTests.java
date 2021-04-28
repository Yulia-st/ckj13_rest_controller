package demo;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class Ckj13Project44ApplicationTests {
//	private MailService mailService;
//
//	@Autowired
//	public Ckj13Project44ApplicationTests(MailService mailService) {
//		this.mailService = mailService;
//	}
//
//	@Test
//	@Disabled
//	void sendMailTest() {
//		SimpleMailMessage mail = new SimpleMailMessage();
//		String text = "This mail is sent from java test";
//		mail.setFrom("sender@mail.com");
//		mail.setTo("receiver@mail.com");
//		mail.setText(text);
//		mail.setSubject("This mail is test");
//
//		System.out.println("Try to send mail");
//		
//		mailService.sendMail(mail);
//		System.out.println("Test done");
//	}
//
//	@Test
//	void contextLoads() {
//	}
//
//	@Test
//	@Disabled
//	void testPasswordEncoder() {
//		PasswordEncoder encoder = new BCryptPasswordEncoder();
//
//		// System.out.println(encoder.encode("user"));
//
//		// String str = "admin";
//		// System.out.println("Encoded string: " + str);
//		// System.out.println(encoder.encode(str));
//
////		String strMan = "manager";
////		System.out.println("Encoded string: " + strMan);
////		System.out.println(encoder.encode(strMan));
//
//	}

}
