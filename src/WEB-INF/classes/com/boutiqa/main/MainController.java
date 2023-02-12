package com.boutiqa.main;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.boutiqa.model.User;
import com.boutiqa.service.UserService;

@Controller
public class MainController {
	@Autowired
	private UserService userService;

	@GetMapping("/")
	public String index() {
		return "redirect:/home";
	}

	@GetMapping("/home")
	public ModelAndView home() {
		ModelAndView mv = new ModelAndView("index");
		return mv;
	}

	@GetMapping("/cart")
	public ModelAndView cart(HttpServletRequest req) {
		User authenticatedUser = userService.postAuthenticate(req);

		if (authenticatedUser == null) {
			return new ModelAndView("login");
		}
		
		if (!authenticatedUser.getUserType().equals("buyer")) {
			String referer = req.getHeader("Referer");
			return new ModelAndView("redirect:"+ referer);
		}

		ModelAndView mv = new ModelAndView("cart");
		return mv;
	}

	@GetMapping("/browse")
	public ModelAndView browse() {
		ModelAndView mv = new ModelAndView("browse");
		return mv;
	}
}