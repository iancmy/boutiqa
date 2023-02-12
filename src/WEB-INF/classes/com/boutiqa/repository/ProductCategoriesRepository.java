package com.boutiqa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.boutiqa.model.ProductCategories;
import com.boutiqa.model.ProductCategoriesId;

@Repository
public interface ProductCategoriesRepository extends JpaRepository<ProductCategories, ProductCategoriesId> {
	@Query(value = "SELECT * FROM ProductCategories WHERE ProductId = :ProductId", nativeQuery = true)
	List<ProductCategories> getByProductId(@Param("ProductId") String productId);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM ProductCategories WHERE ProductId = :ProductId", nativeQuery = true)
	void deleteAllByProductId(@Param("ProductId") String productId);
}
