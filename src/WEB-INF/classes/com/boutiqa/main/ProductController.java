package com.boutiqa.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import com.boutiqa.service.ProductService;

@Controller
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping("/product/{id}")
	public ModelAndView viewProduct(@PathVariable String id) {
	    ModelAndView mv = new ModelAndView("product");
	    Map<String, Object> product = productService.getProductById(id);
	    
	    mv.addObject("product", product);
	    return mv;
	}
}