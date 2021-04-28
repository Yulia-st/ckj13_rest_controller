package demo;

public class UsernameNotExistException extends RuntimeException{
	public UsernameNotExistException(String username) {
		super("This username does not exist " + username);
	}
}
