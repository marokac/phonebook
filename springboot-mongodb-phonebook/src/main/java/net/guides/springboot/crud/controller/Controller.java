package net.guides.springboot.crud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.guides.springboot.crud.exception.ResourceNotFoundException;
import net.guides.springboot.crud.model.Person;
import net.guides.springboot.crud.repository.PersonRepository;
import net.guides.springboot.crud.service.SequenceGeneratorService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class Controller {
	@Autowired
	private PersonRepository personRepository;
	
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	@GetMapping("/phonebook")
	public List<Person> getAll() {
		return personRepository.findAll();
	}

	@GetMapping("/phonebook/{id}")
	public ResponseEntity<Person> getEPersonById(@PathVariable(value = "id") Long personId)
			throws ResourceNotFoundException {
		        Person person = personRepository.findById(personId)
				.orElseThrow(() -> new ResourceNotFoundException("Contacts not found for this id :: " + personId));
		return ResponseEntity.ok().body(person);
	}

	@PostMapping("/phonebook")
	public Person createPerson(@Valid @RequestBody Person person) {
		person.setId(sequenceGeneratorService.generateSequence(Person.SEQUENCE_NAME));
		return personRepository.save(person);
	}

	@PutMapping("/phonebook/{id}")
	public ResponseEntity<Person> update(@PathVariable(value = "id") Long personId,
			@Valid @RequestBody Person personDetails) throws ResourceNotFoundException {
		Person person= personRepository.findById(personId)
				.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));

		person.setNumber(personDetails.getNumber());
		person.setLastName(personDetails.getLastName());
		person.setFirstName(personDetails.getFirstName());
		final Person updatedPerson = personRepository.save(person);
		return ResponseEntity.ok(updatedPerson);
	}

	@DeleteMapping("/phonebook/{id}")
	public Map<String, Boolean> delete(@PathVariable(value = "id") Long personId)
			throws ResourceNotFoundException {
		Person person = personRepository.findById(personId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + personId));

		personRepository.delete(person);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
