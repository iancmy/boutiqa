package com.boutiqa.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "SELECT * FROM User WHERE :EmailAddress = emailAddress AND :Password = password", nativeQuery = true)
	User authenticate(@Param("EmailAddress") String emailAddress, @Param("Password") String password);
	
	@Query(value = "SELECT * FROM User WHERE :EmailAddress = emailAddress", nativeQuery = true)
	User findByEmail(@Param("EmailAddress") String emailAddress);
}
