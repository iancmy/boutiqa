package com.boutiqa.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boutiqa.model.User;
import com.boutiqa.repository.UserRepository;

@Service
@Transactional
public class AdminService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	public boolean saveUser(User user) {
		User foundUser = this.getById(user.getUserId());
		boolean newUser = false;
		
		if(foundUser != null) {
			try {
				userRepository.save(user);
				
			} catch (Exception e) {
				System.out.println("Error saving user: " + e);
			}
		} else {
			try {
				userService.signup(user);
				newUser = true;
				
			} catch (Exception e) {
				System.out.println("Error saving user: " + e);
			}
		}
		
		return newUser;
	}
	
	public String getUserType(String userId) {
		User foundUser = userRepository.findById(userId).get();
		
		return foundUser.getUserType();
	}
	
	public User getById (String userId) {
		User fetchedUser = null;
		
		try {
			fetchedUser = userRepository.findById(userId).get();
		} catch (Exception e) {
			System.out.println("Error getting user: " + e);
		}
		
		return fetchedUser;
	}
	
	public List<User> getAllUsers (){
		return userRepository.findAll();
	}
}
