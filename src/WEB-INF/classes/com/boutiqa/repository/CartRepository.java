package com.boutiqa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
	@Query(value = "SELECT * FROM Cart WHERE :userId = userId", nativeQuery = true)
	Cart findByUserId(@Param("userId") String userId);
}
