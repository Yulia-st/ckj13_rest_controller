package demo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



//описывает функциональность NoteDao
//унаследовал базовые CRUD-методы от CrudRepository
@Repository
public interface NoteRepository extends CrudRepository<Note, Integer>{
	//@Query("SELECT n FROM Note n WHERE n.user_id = :userId AND (n.title LIKE :word OR n.message LIKE :word)")
	//List<Note> search(@Param("word")String word, @Param("userId") int userId);
	
	@Query("SELECT n FROM Note n WHERE n.user.id = :userId AND "
			+ "(n.title LIKE :word OR n.message LIKE :word)")
	List<Note> search(@Param("word") String word, @Param("userId") int userId);
	
	@Query("SELECT n FROM Note n WHERE n.startDate LIKE :date")
	List<Note> findByStartDate(@Param("date") LocalDate date);
	
	List<Note> findBystartDate(LocalDate startDate);
	
	List<Note> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
	
	//@Query("SELECT n FROM Note n User u WHERE u.id=n.user_id ")
	//List<Note> search(@Param("word")String word);
	
}
