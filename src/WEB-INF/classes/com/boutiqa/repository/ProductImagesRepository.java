package com.boutiqa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.ProductImages;

@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages, String> {
	@Query(value = "SELECT * FROM ProductImages WHERE ProductId = :ProductId", nativeQuery = true)
	List<ProductImages> getByProductId(@Param("ProductId") String productId);
}
