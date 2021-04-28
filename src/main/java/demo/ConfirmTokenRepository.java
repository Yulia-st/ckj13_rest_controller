package demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmTokenRepository extends CrudRepository<ConfirmToken, Integer> {
	ConfirmToken findByUser(User user);

	ConfirmToken findByValue(String value);
}
