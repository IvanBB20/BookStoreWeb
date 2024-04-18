package com.projectStore.bookstorebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreBackendApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").
//						allowedOrigins("http://localhost:5173").
//						allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").
//						allowedHeaders("*");
//			}
//		};
//	}
}
