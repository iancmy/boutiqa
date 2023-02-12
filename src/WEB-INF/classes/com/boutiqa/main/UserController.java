package com.boutiqa.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.boutiqa.model.User;
import com.boutiqa.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {
	@Autowired
	private UserService userService;
	
	@ModelAttribute
	public void addAttributes(Model model) {
	    model.addAttribute("user", new User());
	}


	@GetMapping("/login")
	public ModelAndView login(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
		
		if(authenticatedUser != null) {
			return new ModelAndView(new RedirectView("account"));
		}
		
		return new ModelAndView("login");
	}

	@PostMapping("/login")
	public ModelAndView authenticate(@ModelAttribute("user") User user, HttpServletRequest req,
			HttpServletResponse res) {

		HttpSession session = req.getSession();
		User authenticatedUser = userService.authenticate(user);

		if (authenticatedUser != null) {
			Cookie iCookie = new Cookie("userId", String.valueOf(authenticatedUser.getUserId()));
			iCookie.setMaxAge(10 * 60);
			res.addCookie(iCookie);

			session.setAttribute("email", authenticatedUser.getEmailAddress());
			session.setAttribute("userId", authenticatedUser.getUserId());
			session.setAttribute("roleId", authenticatedUser.getUserType());
			session.setAttribute("isLoggedIn", true);
			
			String referer = req.getHeader("Referer");
			return new ModelAndView("redirect:"+ referer);
		}
		
		// If not authenticated
		return new ModelAndView(new RedirectView("login?error=1"));
	}

	@GetMapping("/logout")
	public String logout(HttpServletResponse res, HttpServletRequest req, HttpSession session) throws Exception {
		session.invalidate();
	
		Cookie iCookie = new Cookie("userId", null);
		iCookie.setMaxAge(0);
		res.addCookie(iCookie);
		
		// Redirect to previous page
		String referer = req.getHeader("Referer");
		return "redirect:"+ referer;
	}
	
	@GetMapping("/signup")
	public ModelAndView signUp(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
		
		if(authenticatedUser != null) {
			return new ModelAndView(new RedirectView("account"));
		}
		
		return new ModelAndView("signup");
	}
	
	@PostMapping("/signup")
	public ModelAndView signUpAccount(@ModelAttribute("user") User user, HttpSession session) {
		try {
			userService.signup(user);
			
			ModelAndView mv = new ModelAndView("confirmregistration");
			session.setAttribute("firstName", user.getFirstName());
			session.setAttribute("lastName", user.getLastName());
			
			mv.addObject("emailAddress", user.getEmailAddress());
	
			return mv;
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return new ModelAndView(new RedirectView("signup?error=1"));
	}
	
	@PostMapping("/registersuccess")
	public ModelAndView confirmSignUp(HttpSession session) {
		ModelAndView mv = new ModelAndView("registersuccess");
		String firstName = (String) session.getAttribute("firstName");
		String lastName = (String) session.getAttribute("lastName");
		
		mv.addObject("firstName", firstName);
		mv.addObject("lastName", lastName);
		
		session.invalidate();
		return mv;
	}
	
	@GetMapping("/forgot")
	public ModelAndView forgotPassword() {
		ModelAndView mv = new ModelAndView("forgotpassword");
		return mv;
	}
	
	@PostMapping("/confirmreset")
	public ModelAndView confirmReset(@ModelAttribute("user") User user, HttpSession session) {
		
		User foundUser = userService.getUserByEmail(user);
		
		if(foundUser != null) {
			session.setAttribute("user", foundUser);
			
			return new ModelAndView("confirmpasswordreset");
		}
		
		return new ModelAndView(new RedirectView("forgot?error=1"));
	}
	
	@GetMapping("/reset")
	public ModelAndView resetPasswordForm() {
		ModelAndView mv = new ModelAndView("resetpassword");
		return mv;
	}
	
	@PostMapping("/reset")
	public ModelAndView resetPassword(@ModelAttribute("user") User user, HttpSession session) {
		User foundUser = (User) session.getAttribute("user");
		session.invalidate();
		
		if(foundUser != null) {
			if(foundUser.getPassword().equals(user.getPassword())) {
				return new ModelAndView(new RedirectView("reset?error=1"));
			}
			
			userService.updatePassword(foundUser, user.getPassword());
			
			return new ModelAndView("resetsuccess");
		}
		
		return new ModelAndView(new RedirectView("reset?error=2"));
	}
	
	@RequestMapping("/account")
	public String viewAccount(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
	    
	    if (authenticatedUser != null) {
	    	String userType = userService.getUserType(authenticatedUser.getUserId());
	    	
	    	return userType.equals("buyer") ? "redirect:/buyer" 
	    			: userType.equals("seller") ? "redirect:/seller" 
	    			: userType.equals("admin") ? "redirect:/admin"
	    			: "redirect:/login";
	    }
		
		return "redirect:/login";
	}
	
	@RequestMapping("/buyer")
	public ModelAndView buyerAccount(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
		String redirect = null;
		
		if (authenticatedUser != null) {
	    	String userType = userService.getUserType(authenticatedUser.getUserId());
	    	
	    	if(!userType.equals("buyer")) {
	    		redirect = userType.equals("seller") ? "seller"
		    			: userType.equals("admin") ? "admin"
		    			: null;
		    	
		    	return new ModelAndView(new RedirectView(redirect));
	    	}
	    	
	    	return new ModelAndView("buyerprofile");
	    }
		
		return new ModelAndView(new RedirectView("login"));
	}
	
	@RequestMapping("/seller")
	public ModelAndView sellerAccount(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
		String redirect = null;
		
		if (authenticatedUser != null) {
	    	String userType = userService.getUserType(authenticatedUser.getUserId());
	    	
	    	if(!userType.equals("seller")) {
	    		redirect = userType.equals("buyer") ? "buyer"
		    			: userType.equals("admin") ? "admin"
		    			: null;
		    	
		    	return new ModelAndView(new RedirectView(redirect));
	    	}
	    	
	    	return new ModelAndView("sellerprofile");
	    }
		
		return new ModelAndView(new RedirectView("login"));
	}
	
	@RequestMapping("/admin")
	public ModelAndView adminAccount(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);
		String redirect = null;
		
		if (authenticatedUser != null) {
	    	String userType = userService.getUserType(authenticatedUser.getUserId());
	    	
	    	if(!userType.equals("admin")) {
	    		redirect = userType.equals("buyer") ? "buyer"
		    			: userType.equals("seller") ? "seller"
		    			: null;
		    	
		    	return new ModelAndView(new RedirectView(redirect));
	    	}
	    	
	    	return new ModelAndView("admindashboard");
	    }
		
		return new ModelAndView(new RedirectView("login"));
	}
}
