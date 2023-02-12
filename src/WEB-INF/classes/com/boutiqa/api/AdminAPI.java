package com.boutiqa.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.boutiqa.model.User;
import com.boutiqa.repository.UserRepository;
import com.boutiqa.service.AdminService;
import com.boutiqa.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class AdminAPI {
	@Autowired
	private AdminService adminService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/api/getAllUsers")
	public ResponseEntity<Map<String, Object>> getAllUsers(HttpServletRequest req, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();

		User authenticatedUser = userService.postAuthenticate(req);

		res.setContentType("application/json");

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("admin")) {
			List<Map<String, Object>> usersList = new ArrayList<Map<String, Object>>();
			List<User> allUsers = adminService.getAllUsers();

			for (User user : allUsers) {
				Map<String, Object> userDetails = new HashMap<>();

				userDetails.put("userId", user.getUserId());
				userDetails.put("fullName", user.getFirstName() + " " + user.getLastName());
				userDetails.put("email", user.getEmailAddress());

				usersList.add(userDetails);
			}

			response.put("users", usersList);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@GetMapping("/api/getUser")
	public ResponseEntity<Map<String, Object>> getUser(HttpServletRequest req, HttpServletResponse res,
			@RequestParam("userId") String userId) {
		Map<String, Object> response = new HashMap<>();

		User authenticatedUser = userService.postAuthenticate(req);

		res.setContentType("application/json");

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("admin")) {
			User fetchedUser = adminService.getById(userId);

			response.put("user", fetchedUser);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@DeleteMapping("/api/deleteUser")
	public ResponseEntity<Map<String, Object>> deleteUser(@RequestBody Map<String, String> reqBody,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean deleteSuccessful = false;
		String userId = reqBody.get("userId");

		if (authenticatedUser == null || !userService.getUserType(authenticatedUser.getUserId()).equals("admin")) {
			response.put("deleteSuccessful", deleteSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		try {
			userRepository.deleteById(userId);
			deleteSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("deleteSuccessful", deleteSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("deleteSuccessful", deleteSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/saveUser")
	public ResponseEntity<Map<String, Object>> saveUser(@RequestParam("user") String userJSON,
			HttpServletRequest req, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;
		boolean newUser = false;
		String userId = null;

		if (authenticatedUser == null || !userService.getUserType(authenticatedUser.getUserId()).equals("admin")) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		// Save user
		ObjectMapper objectMapper = new ObjectMapper();
		User user = null;
		try {
			user = objectMapper.readValue(userJSON, User.class);
			
			newUser = adminService.saveUser(user);
			userId = user.getUserId();
			updateSuccessful = true;
		} catch (JsonMappingException e1) {
			e1.printStackTrace();
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("userId", userId);
		response.put("newUser", newUser);
		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
