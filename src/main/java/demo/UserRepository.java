package demo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
	public User findByUsername(String username);
	public User findByEmail(String email);
	
	
	//@Query("UPDATE USER user SET u.password= :passwd WHERE u.username= :word")
	//public List<User> updatePwd(@Param("pwd")String passwd, @Param("word")String word);
	
}
