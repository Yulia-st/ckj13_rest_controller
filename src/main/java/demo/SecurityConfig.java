package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private UserSecurityDetailsService detailsService;

	@Autowired
	public SecurityConfig(UserSecurityDetailsService detailsService) {

		this.detailsService = detailsService;
	}

	// AuthenticationManager - управляет аутентификацией
	// настройка авторизации
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.authorizeRequests()
		.antMatchers("/", "/index").permitAll()
		.antMatchers("/notes/**").authenticated()
		.antMatchers("/notes/**", "/admin_page/**").hasAuthority("ROLE_ADMIN")
		//.antMatchers("/notes/**", "/admin_page/**").hasAuthority("ROLE_MANAGER")
		.antMatchers("/notes/**").hasAuthority("ROLE_USER")
		.and()
		// .formLogin()
		.formLogin().loginPage("/login")
		.and()
		.logout()
		.and()
		.rememberMe()
		.userDetailsService(detailsService).and().exceptionHandling().accessDeniedPage("/login?denied").and()
		.csrf().disable();
	}
	/////////////////////////////
//		http.authorizeRequests()
//		.antMatchers("/", "/index").permitAll()
//		.antMatchers("/notes/**").authenticated()
//		.antMatchers("/admin_page/**").hasAuthority("ROLE_ADMIN")
//		.antMatchers("/notes/**", "/admin_page/**").hasAuthority("ROLE_MANAGER")
//		.and()
//		.formLogin()
//		.and()
//		.logout()
//		.and()
//		.csrf().disable();
////////////////////////////////////		
//		http.authorizeRequests()
//		.antMatchers("/", "/index").permitAll()
//		.antMatchers("/notes/**").authenticated()
//		.antMatchers("/admin_page/**").hasRole("ADMIN")
//		.antMatchers("/notes", "/admin_page").hasRole("MANAGER")
//		.and()
//		.formLogin()
//		.and()
//		.logout()
//		.and()
//		.csrf().disable();

//	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(detailsService);
		provider.setPasswordEncoder(passwordEncoder());
		// как по username найти пользователя UserDetails
		auth.authenticationProvider(provider);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();

	}
}
