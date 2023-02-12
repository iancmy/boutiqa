package com.boutiqa.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boutiqa.model.Product;
import com.boutiqa.model.ProductImages;
import com.boutiqa.repository.ProductImagesRepository;
import com.boutiqa.repository.ProductRepository;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductImagesRepository productImagesRepository;
	
	public Map<String, Object> getProductById(String productId) {
		try {
			Map<String, Object> product = new HashMap<>();

			Product productDetails = productRepository.findById(productId).get();
			List<String> productCategories = productRepository.getProductCategories(productId);
			List<ProductImages> productImages = productImagesRepository.getByProductId(productId);

			product.put("productDetails", productDetails);
			product.put("productCategories", productCategories);
			product.put("productImages", productImages);
			
			return product;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
}
