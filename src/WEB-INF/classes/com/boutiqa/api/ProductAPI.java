package com.boutiqa.api;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.boutiqa.model.Product;
import com.boutiqa.model.ProductCategories;
import com.boutiqa.model.ProductImages;
import com.boutiqa.model.User;
import com.boutiqa.repository.ProductCategoriesRepository;
import com.boutiqa.repository.ProductImagesRepository;
import com.boutiqa.repository.ProductRepository;
import com.boutiqa.service.ProductService;
import com.boutiqa.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ProductAPI {
	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductCategoriesRepository productCategoriesRepository;

	@Autowired
	private ProductImagesRepository productImagesRepository;

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("product", new Product());
	}

	@GetMapping("/api/getProduct")
	public ResponseEntity<Map<String, Object>> getProduct(@RequestParam("id") String productId,
			HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();
		boolean getSuccessful = false;
		res.setContentType("application/json");

		try {
			Map<String, Object> product = productService.getProductById(productId);
			
			getSuccessful = true;
			response.put("getSuccessful", getSuccessful);
			response.put("product", product);
		} catch (Exception e) {
			System.out.println(e);
			response.put("getSuccessful", getSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/api/getLatestProducts")
	public ResponseEntity<Map<String, Object>> getProduct(HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();
		boolean getSuccessful = false;
		res.setContentType("application/json");

		try {
			List<Product> latestProducts = productRepository.getLatestProducts();

			getSuccessful = true;
			response.put("getSuccessful", getSuccessful);
			response.put("latestProducts", latestProducts);
		} catch (Exception e) {
			System.out.println(e);
			response.put("getSuccessful", getSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/api/getAllProducts")
	public ResponseEntity<Map<String, Object>> getAllProducts(
			@RequestParam(value = "category", required = false) String category,
			@RequestParam(value = "search", required = false) String search, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();
		boolean getSuccessful = false;
		res.setContentType("application/json");
		
		
		try {
			List<Product> products = productRepository.getAllProductsByDate();
			
			if(category != null && search != null) {
				products = productRepository.searchProductsAndCategory(category, search);
			} else if(category != null) {
				products = productRepository.getProductsByCategory(category);
			} else if(search != null) {
				products = productRepository.searchProducts(search);
			}

			getSuccessful = true;
			response.put("getSuccessful", getSuccessful);
			response.put("products", products);
		} catch (Exception e) {
			System.out.println(e);
			response.put("getSuccessful", getSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/api/deleteProduct")
	public ResponseEntity<Map<String, Object>> deleteProduct(@RequestBody Map<String, String> reqBody,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean deleteSuccessful = false;
		String productId = reqBody.get("productId");

		if (authenticatedUser == null || !userService.getUserType(authenticatedUser.getUserId()).equals("seller")) {
			response.put("deleteSuccessful", deleteSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		try {
			productRepository.deleteById(productId);
			deleteSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("deleteSuccessful", deleteSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("deleteSuccessful", deleteSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/saveProduct")
	public ResponseEntity<Map<String, Object>> saveProduct(
			@RequestParam(value = "images", required = false) CommonsMultipartFile[] images,
			@RequestParam("product") String productJSON, @RequestParam("categories") List<Integer> categoryList,
			HttpServletRequest req, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;
		String productId = null;

		if (authenticatedUser == null || !userService.getUserType(authenticatedUser.getUserId()).equals("seller")) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		// Create product
		ObjectMapper objectMapper = new ObjectMapper();
		Product product = null;
		try {
			product = objectMapper.readValue(productJSON, Product.class);
			product.setUserId(authenticatedUser.getUserId());
		} catch (JsonMappingException e1) {
			e1.printStackTrace();
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}

		// Create productCategoies
		List<ProductCategories> productCategories = new ArrayList<ProductCategories>();

		for (Integer category : categoryList) {
			productCategories.add(new ProductCategories(product.getProductId(), category));
		}

		List<ProductImages> productImages = new ArrayList<ProductImages>();

		// Create productImages
		if (images != null) {
			String rootPath = session.getServletContext().getRealPath("/") + "/WEB-INF/res/";
			String folder = "/img/product_images/";
			Path productImageFolder = Paths.get(rootPath + folder + product.getProductId());

			try {
				Files.createDirectories(productImageFolder);
			} catch (IOException e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			for (CommonsMultipartFile image : images) {
				if (!image.isEmpty()) {
					try {
						ProductImages productImage = new ProductImages();
						productImage.setProductId(product.getProductId());
						byte[] bytes = image.getBytes();
						String path = rootPath + folder + product.getProductId();
						String fileName = image.getOriginalFilename();

						BufferedOutputStream bout = new BufferedOutputStream(
								new FileOutputStream(path + "/" + fileName));
						bout.write(bytes);
						bout.flush();
						bout.close();

						productImage.setImagePath(folder + product.getProductId() + "/" + fileName);
						productImages.add(productImage);
					} catch (Exception e) {
						System.out.println(e);
						response.put("updateSuccessful", updateSuccessful);
						return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
					}
				}
			}
		}

		// Save product, categories, and images
		try {
			productRepository.save(product);
			productId = product.getProductId();

			for (ProductCategories category : productCategories) {
				try {
					productCategoriesRepository.save(category);
				} catch (Exception e) {
					System.out.println(e);
					response.put("updateSuccessful", updateSuccessful);
					return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}

			for (ProductImages image : productImages) {
				try {
					productImagesRepository.save(image);
				} catch (Exception e) {
					System.out.println(e);
					response.put("updateSuccessful", updateSuccessful);
					return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}

			updateSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("productId", productId);
		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/editProduct")
	public ResponseEntity<Map<String, Object>> editProduct(@RequestParam("product") String productJSON,
			@RequestParam("categories") List<Integer> categoryList, HttpServletRequest req, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null || !userService.getUserType(authenticatedUser.getUserId()).equals("seller")) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		// Update product
		ObjectMapper objectMapper = new ObjectMapper();
		Product updatedProduct = null;
		Product origProduct = null;
		try {
			updatedProduct = objectMapper.readValue(productJSON, Product.class);
			origProduct = productRepository.findById(updatedProduct.getProductId()).get();
			origProduct.setProductName(updatedProduct.getProductName());
			origProduct.setDescription(updatedProduct.getDescription());
			origProduct.setPrice(updatedProduct.getPrice());
			origProduct.setQuantity(updatedProduct.getQuantity());
		} catch (JsonMappingException e1) {
			e1.printStackTrace();
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}

		// Update productCategoies
		List<ProductCategories> productCategories = new ArrayList<ProductCategories>();

		for (Integer category : categoryList) {
			productCategories.add(new ProductCategories(updatedProduct.getProductId(), category));
		}

		productCategoriesRepository.deleteAllByProductId(origProduct.getProductId());

		// Save product and categories
		try {
			productRepository.save(origProduct);

			for (ProductCategories category : productCategories) {
				try {
					productCategoriesRepository.save(category);
				} catch (Exception e) {
					System.out.println(e);
					response.put("updateSuccessful", updateSuccessful);
					return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}

			updateSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
