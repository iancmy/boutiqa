package com.boutiqa.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class MvcInit implements WebApplicationInitializer {

	// This method is called when the web application is starting
	public void onStartup(ServletContext servletContext) throws ServletException {
		// Create a new Spring web application context
		AnnotationConfigWebApplicationContext appContext = new AnnotationConfigWebApplicationContext();
		
		// Register MvcConfig with the application context
		appContext.register(MvcConfig.class);
		
		// Creates a dispatcher servlet -> handles all requests (front controller)
		// Name is "SpringDispatcher"
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("SpringDispatcher",
				new DispatcherServlet(appContext));
		
		// Load the dispatcher on start-up before any other servlet gets loaded
		// To make sure it's available to handle the requests as soon as the application starts
		dispatcher.setLoadOnStartup(1);
		
		// Map the root URL
		dispatcher.addMapping("/");
	}
}
