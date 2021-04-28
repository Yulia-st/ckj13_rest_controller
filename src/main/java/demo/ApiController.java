package demo;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ApiController {

	private UserRepository userRepository;
	private NoteRepository noteRepository;
	
	@GetMapping("/users")
	public Iterable<User> getUsers() {
	return userRepository.findAll()	;
	}
	
	@GetMapping("/search")
	public Iterable<Note> getAllNote() {
	return noteRepository.findAll()	;
	}
	
	@GetMapping("/notes")
	public List<EntityModel<Note>> getNotes(){
		var notes = (List<Note>)noteRepository.findAll();
		var models = notes.stream().map(note->{
			var entitymodel = EntityModel.of(note,
					linkTo(methodOn(ApiController.class).getNote(note.getId())).withRel("info")
					);
		return entitymodel;
		}).collect(Collectors.toList());
		return models;
	}
	
	
	
	//create, delete, edit, get note
	
	@PostMapping("/notes")
	public Note saveNote(@RequestBody Note note) {
		note.setStartDate(LocalDate.now());
		return noteRepository.save(note);
	}
	
	
	@GetMapping("/notes/{id}")
	public EntityModel<Note> getNote(@PathVariable Integer id ) {
		var note = noteRepository.findById(id).orElseThrow(
				()->new NoSuchElementException("Id does not exist: " + id));
		
		
		//if(note!=null) {
		//	return new ResponseEntity<>(note, HttpStatus.OK);
		//}else {
		//	return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		//}
		EntityModel<Note> response = EntityModel.of(note, 
				linkTo(methodOn(ApiController.class).getNotes()).withRel("notes"));;
		return response;
	}

	//@PutMapping("/notes")
	//public Note changeNote(@RequestBody Note newNote) {
	//	newNote.setStartDate(LocalDate.now());
	//	return noteRepository.save(newNote);
	//}
	
	@PutMapping("/notes/{id}")
	public Note changeNote(@RequestBody Note newNote, @PathVariable Integer id) {
		Note note1 = noteRepository.findById(newNote.getId()).orElseThrow(
				()->new NoSuchElementException("Id does not exist: " + newNote.getId()));

		note1.setTitle(newNote.getTitle());
		note1.setMessage(newNote.getMessage());
		note1.setStartDate(LocalDate.now());
		//noteRepository.save(note1);
		//newNote.setStartDate(LocalDate.now());
		return noteRepository.save(note1);
	}
	
	@DeleteMapping("/notes/{id}")
	public void deleteNote(@PathVariable Integer id) {
		noteRepository.deleteById(id);
	}
	
}
