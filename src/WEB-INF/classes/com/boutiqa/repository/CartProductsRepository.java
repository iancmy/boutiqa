package com.boutiqa.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.CartProducts;
import com.boutiqa.model.CartProductsId;

@Repository
public interface CartProductsRepository extends JpaRepository<CartProducts, CartProductsId> {
	@Query(value = "SELECT cp.*, p.ProductName, p.Price, p.Quantity AS MaxQuantity FROM CartProducts cp JOIN Product p ON p.ProductId = cp.ProductId WHERE cp.CartId = :CartId", nativeQuery = true)
	List<Map<String, Object>> findByCartId(@Param("CartId") String cartId);

	@Query(value = "SELECT * FROM CartProducts WHERE :CartId = CartId AND :ProductId = ProductId", nativeQuery = true)
	CartProducts findByCartAndProduct(@Param("CartId") String cartId, @Param("ProductId") String ProductId);
}
