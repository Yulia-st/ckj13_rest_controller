package demo;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/notes")
public class NoteController {
	private NoteRepository noteRepository;
	private UserRepository userRepository;

	@Autowired
	public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
		this.userRepository = userRepository;
		this.noteRepository = noteRepository;
	}

	@GetMapping("/create")
	public String create() {
		return "create_note";
	}

	@PostMapping("/add")
	public String add(@ModelAttribute(name = "note") Note note, Principal prl) {
		User user = userRepository.findByUsername(prl.getName());
		note.setStartDate(LocalDate.now());

		user.addNote(note);
		noteRepository.save(note);
		userRepository.save(user);
		return "redirect:/notes";
	}

	@GetMapping
	public String all(Model model, Principal prl) {
		User user = userRepository.findByUsername(prl.getName());
		// List<Note> notes=user.getNotes();
		model.addAttribute("notes", user.getNotes());
		return "notes";
	}

	@GetMapping("/{id}")
	public String info(@PathVariable(name = "id") int id, Model model, Principal prl) {
		User user = userRepository.findByUsername(prl.getName());
		List<Note> notes = user.getNotes();
		Note note = noteRepository.findById(id).get();
		if (notes.contains(note)) {
			// model.addAttribute("note", user.getNotes());

			model.addAttribute("note", note);
			return "info";
		} else {
			return "redirect:/notes";
		}
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable(name = "id") int id, Principal prl) {

		User user = userRepository.findByUsername(prl.getName());

		Note note = noteRepository.findById(id).get();
		if (user.getNotes().contains(note))
			noteRepository.deleteById(id);
		return "redirect:/notes";

	}

	@GetMapping("/edit/{id}")
	public String edit(@PathVariable(name = "id") int id, Model model) {
		// , Principal prl
		// User user = userRepository.findByUsername(prl.getName());
		model.addAttribute("note", noteRepository.findById(id).get());
		return "edit";
	}

	@PostMapping("/change")
	public String change(@ModelAttribute(name = "note") Note note) {
		// User user = userRepository.findByUsername(prl.getName());
		Note note1 = noteRepository.findById(note.getId()).orElseThrow();

		note1.setTitle(note.getTitle());
		note1.setMessage(note.getMessage());
		note1.setStartDate(LocalDate.now());
		noteRepository.save(note1);
		// userRepository.save(user);
		return "redirect:/notes";
	}

	@GetMapping("/search")
	public String search(@RequestParam(name = "word") String word, Model model, Principal prl) {

		User user = userRepository.findByUsername(prl.getName());
		word = "%" + word + "%";
		List<Note> notes = noteRepository.search(word, user.getId());
		// List<Note> notes=noteRepository.findByStartDateBetween(date1, date2);

		// List<Note> notes=noteRepository.findByStartDate(date1);
		model.addAttribute("notes", notes);

		return "notes";
	}

//	@GetMapping("/search")
//	public String search(@RequestParam(name="word")String word, Model model){
//			//@RequestParam(name="date2")LocalDate date2, Model model ) {
//	
//	List<Note> notes=noteRepository.search("%" + word + "%");
//		//List<Note> notes=noteRepository.findByStartDateBetween(date1, date2);
//		
//		
//		//List<Note> notes=noteRepository.findByStartDate(date1);
//		model.addAttribute("notes", notes);
//		
//		return "notes";
//	}
//	@GetMapping("/search")
//	public String search(@RequestParam(name="date1")LocalDate date1, Model model){
//			//@RequestParam(name="date2")LocalDate date2, Model model ) {
//	
//	//List<Note> notes=noteRepository.search("%" + word + "%");
//		//List<Note> notes=noteRepository.findByStartDateBetween(date1, date2);
//		
//		
//		List<Note> notes=noteRepository.findByStartDate(date1);
//		model.addAttribute("notes", notes);
//		
//		return "notes";
//	}

}

//Note note = notes.stream()
//.filter(n -> n.getId()==id)
//.findFirst().get();
//notes.remove(note);

///////
//Note note = notes.stream()
//.filter(n -> n.getId()==id)
//.findFirst().get();
//model.addAttribute("note", note);
//idId=id;

///////
//@PostMapping("/change")
//public String change(@ModelAttribute(name = "note") Note note) {
//	note.setId(idId);
//	notes.set(idId-1, note);

//	return "redirect:/notes";
//}

//////////
//Note note = notes.stream()
//.filter(n -> n.getId()==id)
//.findFirst().get();