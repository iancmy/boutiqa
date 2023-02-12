package com.boutiqa.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boutiqa.model.Cart;
import com.boutiqa.model.Consumer;
import com.boutiqa.model.Seller;
import com.boutiqa.model.User;
import com.boutiqa.repository.CartRepository;
import com.boutiqa.repository.ConsumerRepository;
import com.boutiqa.repository.SellerRepository;
import com.boutiqa.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ConsumerRepository consumerRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private SellerRepository sellerRepository;
	
	
	public User authenticate(User user) {
		try {
			User authenticatedUser = userRepository.authenticate(user.getEmailAddress(), user.getPassword());
			return authenticatedUser;
			
		} catch (Exception e) {
			System.out.println("User not authenticated: " + e);
		}
		return null;
	}
	
	public User postAuthenticate(HttpServletRequest req) {
		Cookie[] cookies = req.getCookies();
	    boolean isLoggedIn = false;
	    String userId = "";
	    User authenticatedUser = null;
	    
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if (cookie.getName().equals("userId")) {
	                isLoggedIn = true;
	                userId = cookie.getValue();
	                break;
	            }
	        }
	    }
	    
	    if(isLoggedIn) {
	    	authenticatedUser = this.getById(userId);
	    }
	    
	    return authenticatedUser;
	}
	
	public User signup(User user) {
		user = userRepository.save(user);
		
		if (user.getUserType().equals("buyer")) {
	        Consumer consumer = new Consumer();
	        consumer.setUserId(user.getUserId());
	        consumerRepository.save(consumer);

	        Cart cart = new Cart();
	        cart.setUserId(user.getUserId());
	        cartRepository.save(cart);
	    } else if (user.getUserType().equals("seller")) {
	        Seller seller = new Seller();
	        seller.setUserId(user.getUserId());
	        sellerRepository.save(seller);
	    }

		return user;
	}
	
	public User getUserByEmail(User user) {
		return userRepository.findByEmail(user.getEmailAddress());
	}
	
	public User updatePassword(User user, String newPassword) {
		user.setPassword(newPassword);
		
		return userRepository.save(user);
	}
	
	public String getUserType(String userId) {
		User foundUser = userRepository.findById(userId).get();
		
		return foundUser.getUserType();
	}
	
	public User getById (String userId) {
		return userRepository.findById(userId).get();
	}
}
