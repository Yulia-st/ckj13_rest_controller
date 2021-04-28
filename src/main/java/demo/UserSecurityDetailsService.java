package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;





@Service
public class UserSecurityDetailsService implements UserDetailsService {
	private UserRepository userRepository;
	
	@Autowired
	public UserSecurityDetailsService(UserRepository userRepository) {
		
		this.userRepository = userRepository;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//найти пользователя в БД
		User user =userRepository.findByUsername(username);
		//если пользователь не найден, то бросить UsernameNotFoundException
		if(user==null) {
		throw new UsernameNotFoundException(username);
		}
		//преобразовать его в UserDetails и вернуть из метода
		//UserDetails details <- user;
		return new UserSecurity(user);
	}

}
