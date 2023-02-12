package com.boutiqa.api;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.boutiqa.model.Seller;
import com.boutiqa.model.User;
import com.boutiqa.repository.SellerRepository;
import com.boutiqa.repository.UserRepository;
import com.boutiqa.service.UserService;

@Controller
public class MainAPI {
	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SellerRepository sellerRepository;

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("user", new User());
	}

	@GetMapping("/api/isLoggedIn")
	public ResponseEntity<Map<String, Object>> isLoggedIn(HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();

		boolean isLoggedIn = false;
		String userId = "";
		String userType = "";

		User authenticatedUser = userService.postAuthenticate(req);

		if (authenticatedUser != null) {
			isLoggedIn = true;
			userId = authenticatedUser.getUserId();
			userType = authenticatedUser.getUserType();
		}

		response.put("isLoggedIn", isLoggedIn);
		response.put("userId", userId);
		response.put("userType", userType);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/updateProfile")
	public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody Map<String, String> reqBody, HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}
		
		if (authenticatedUser.getUserType().equals("seller")) {
			try {
				Seller seller = sellerRepository.findById(authenticatedUser.getUserId()).get();		
				seller.setStoreName(reqBody.get("storeName"));
				sellerRepository.save(seller);
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		try {
			authenticatedUser.setFirstName(reqBody.get("firstName"));
			authenticatedUser.setLastName(reqBody.get("lastName"));
			authenticatedUser.setEmailAddress(reqBody.get("emailAddress"));
			authenticatedUser.setContactNumber(reqBody.get("contactNumber"));
			userRepository.save(authenticatedUser);
			updateSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/changePassword")
	public ResponseEntity<Map<String, Object>> changePassword(@RequestBody User user,
			@RequestHeader("Old-Password") String oldPassword, HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}
		
		if(!oldPassword.equals(authenticatedUser.getPassword())) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

		try {
			authenticatedUser.setPassword(user.getPassword());
			userRepository.save(authenticatedUser);
			updateSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
}
