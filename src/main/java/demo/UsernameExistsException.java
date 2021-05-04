package demo;

public class UsernameExistsException extends RuntimeException {
	public UsernameExistsException(String username) {
		super("This username already exists " + username);
	}
}
