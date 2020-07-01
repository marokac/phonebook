package net.guides.springboot2.springboot2jpacrudexample;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import net.guides.springboot.crud.Application;
import net.guides.springboot.crud.model.Person;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EmployeeControllerIntegrationTest {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@Test
	public void contextLoads() {

	}

	@Test
	public void testGetAllEmployees() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/employees",
				HttpMethod.GET, entity, String.class);
		
		assertNotNull(response.getBody());
	}

	@Test
	public void testGetEmployeeById() {
		Person person = restTemplate.getForObject(getRootUrl() + "/employees/1", Person.class);
		System.out.println(person.getFirstName());
		assertNotNull(person);
	}

	@Test
	public void testCreateEmployee() {
		Person person = new Person();
		person.setNumber("0827943118");
		person.setFirstName("admin");
		person.setLastName("admin");

		ResponseEntity<Person> postResponse = restTemplate.postForEntity(getRootUrl() + "/employees", person, Person.class);
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
	}

	@Test
	public void testUpdateEmployee() {
		int id = 1;
		Person person = restTemplate.getForObject(getRootUrl() + "/employees/" + id, Person.class);
		person.setFirstName("admin1");
		person.setLastName("admin2");

		restTemplate.put(getRootUrl() + "/employees/" + id, person);

		Person updatedEmployee = restTemplate.getForObject(getRootUrl() + "/employees/" + id, Person.class);
		assertNotNull(updatedEmployee);
	}

	@Test
	public void testDeleteEmployee() {
		int id = 2;
		Person person = restTemplate.getForObject(getRootUrl() + "/phonebook/" + id, Person.class);
		assertNotNull(person);

		restTemplate.delete(getRootUrl() + "/phonebook/" + id);

		try {
			person = restTemplate.getForObject(getRootUrl() + "/phonebook/" + id, Person.class);
		} catch (final HttpClientErrorException e) {
			assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
		}
	}
}
