package com.boutiqa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
	@Query(value = "SELECT * FROM Product WHERE :UserId = UserId", nativeQuery = true)
	List<Product> getSellerProducts(@Param("UserId") String userId);

	@Query(value = "SELECT c.CategoryName FROM ProductCategories pc JOIN Category c ON c.CategoryCode = pc.CategoryCode WHERE pc.ProductId = :ProductId", nativeQuery = true)
	List<String> getProductCategories(@Param("ProductId") String productId);
	
	@Query(value = "SELECT * FROM Product ORDER BY `DateCreated` DESC LIMIT 10", nativeQuery = true)
	List<Product> getLatestProducts();
	
	@Query(value = "SELECT * FROM Product ORDER BY `DateCreated` DESC", nativeQuery = true)
	List<Product> getAllProductsByDate();
	
	@Query(value = "SELECT p.* \r\n"
			+ "FROM Product p\r\n"
			+ "JOIN ProductCategories pc\r\n"
			+ "ON pc.ProductId = p.ProductId\r\n"
			+ "JOIN Category c\r\n"
			+ "ON c.CategoryCode = pc.CategoryCode\r\n"
			+ "WHERE c.CategoryName = :CategoryName", nativeQuery = true)
	List<Product> getProductsByCategory(@Param("CategoryName") String categoryName);
	
	@Query(value = "SELECT * FROM Product WHERE ProductName LIKE %:query% OR Description LIKE %:query%", nativeQuery = true)
	List<Product> searchProducts(@Param("query") String query);
	
	@Query(value = "SELECT p.* \r\n"
			+ "FROM Product p\r\n"
			+ "JOIN ProductCategories pc\r\n"
			+ "ON pc.ProductId = p.ProductId\r\n"
			+ "JOIN Category c\r\n"
			+ "ON c.CategoryCode = pc.CategoryCode\r\n"
			+ "WHERE (c.CategoryName = :CategoryName)\r\n"
			+ "AND (p.ProductName LIKE %:query% OR p.Description LIKE %:query%)", nativeQuery = true)
	List<Product> searchProductsAndCategory(@Param("CategoryName") String categoryName, @Param("query") String query);
}
