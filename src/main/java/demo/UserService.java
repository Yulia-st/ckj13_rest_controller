package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	private PasswordEncoder passwordEncoder;
	private UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User register(String username, String password, String email) {

		// User user= new User();

		User user = userRepository.findByUsername(username);
		if (user == null) {
			user = new User();

			user.setUsername(username);
			user.setPassword(passwordEncoder.encode(password));
			user.setRole("ROLE_USER");
			user.setEmail(email);
			user.setEnabled(false);
			// }
			// return userRepository.save(user);
		} else {
			throw new UsernameExistsException(username);
		}
		return userRepository.save(user);
	}
	
	public User rebuilderPassword(String username, String password) {

		User user= new User();

		user = userRepository.findByUsername(username);
		if (user != null) {
			//user = new User();

			user.setUsername(username);
			user.setPassword(passwordEncoder.encode(password));
			
			// return userRepository.save(user);
		} 
		else {
			throw new UsernameNotExistException(username);
			
		}
		return userRepository.save(user);
	}
}
