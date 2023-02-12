package com.boutiqa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@ComponentScan(basePackages = "com.boutiqa")
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {
	
	// Set the location of views
	@Bean(name="viewResolver")
	 public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		 viewResolver.setPrefix("/WEB-INF/views/");
		 viewResolver.setSuffix(".jsp");
		 return viewResolver;
	}
	
	// Handle file uploads
	@Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(524288000);
        return multipartResolver;
    }
	
	// Set the location of static resources
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		 registry.addResourceHandler("/js/**")
		         .addResourceLocations("/WEB-INF/res/js/");
		
		 registry.addResourceHandler("/img/**")
		         .addResourceLocations("/WEB-INF/res/img/");
		 
		 registry.addResourceHandler("/css/**")
			.addResourceLocations("/WEB-INF/res/css/");
	}
}
