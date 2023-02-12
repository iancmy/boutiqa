package com.boutiqa.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.boutiqa.model.Address;
import com.boutiqa.model.Product;
import com.boutiqa.model.Seller;
import com.boutiqa.model.User;
import com.boutiqa.repository.AddressRepository;
import com.boutiqa.repository.ProductRepository;
import com.boutiqa.repository.SellerRepository;
import com.boutiqa.service.UserService;

@Controller
public class SellerAPI {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private SellerRepository sellerRepository;

	@Autowired
	private AddressRepository addressRepository;

	@GetMapping("/api/sellerDetails")
	public ResponseEntity<Map<String, Object>> sellerDetails(HttpServletRequest req, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();

		User authenticatedUser = userService.postAuthenticate(req);

		res.setContentType("application/json");

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("seller")) {
			// Join the User and Seller
			String userId = authenticatedUser.getUserId();
			Seller seller = sellerRepository.findById(userId).get();

			Map<String, Address> addresses = new HashMap<>();
			Map<String, Object> userAccount = new HashMap<>();

			userAccount.put("firstName", authenticatedUser.getFirstName());
			userAccount.put("lastName", authenticatedUser.getLastName());
			userAccount.put("emailAddress", authenticatedUser.getEmailAddress());
			userAccount.put("contactNumber", authenticatedUser.getContactNumber());
			userAccount.put("userType", authenticatedUser.getUserType());

			if (seller.getStoreAddress() != null) {
				addresses.put("storeAddress", addressRepository.findById(seller.getStoreAddress()).get());
			} else {
				addresses.put("storeAddress", null);
			}

			if (seller.getPickUpAddress() != null) {
				addresses.put("pickUpAddress", addressRepository.findById(seller.getPickUpAddress()).get());
			} else {
				addresses.put("pickUpAddress", null);
			}

			// Put the desired fields from each table in the response
			response.put("userAccount", userAccount);
			response.put("userDetails", seller);
			response.put("userAddress", addresses);

			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@PostMapping("/api/updateStoreAddress")
	public ResponseEntity<Map<String, Object>> updateStoreAddress(@RequestBody Address address,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Seller userDetails = sellerRepository.findById(authenticatedUser.getUserId()).get();
		Address storeAddress = null;

		if (userDetails.getStoreAddress() != null) {
			storeAddress = addressRepository.findById(userDetails.getStoreAddress()).get();

			storeAddress.setAddressLine1(address.getAddressLine1());
			storeAddress.setAddressLine2(address.getAddressLine2());
			storeAddress.setCity(address.getCity());
			storeAddress.setCountry(address.getCountry());
			storeAddress.setState(address.getState());
			storeAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(storeAddress);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		if (storeAddress == null) {
			// Create new address object and save it
			Address newStoreAddress = new Address();
			newStoreAddress.setAddressLine1(address.getAddressLine1());
			newStoreAddress.setAddressLine2(address.getAddressLine1());
			newStoreAddress.setCity(address.getCity());
			newStoreAddress.setCountry(address.getCountry());
			newStoreAddress.setState(address.getState());
			newStoreAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(newStoreAddress);
				userDetails.setStoreAddress(newStoreAddress.getAddressId());
				sellerRepository.save(userDetails);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/updatePickupAddress")
	public ResponseEntity<Map<String, Object>> updatePickupAddress(@RequestBody Address address,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Seller userDetails = sellerRepository.findById(authenticatedUser.getUserId()).get();
		Address pickUpAddress = null;

		if (userDetails.getPickUpAddress() != null
				&& !userDetails.getPickUpAddress().equals(userDetails.getStoreAddress())) {
			pickUpAddress = addressRepository.findById(userDetails.getPickUpAddress()).get();

			pickUpAddress.setAddressLine1(address.getAddressLine1());
			pickUpAddress.setAddressLine2(address.getAddressLine2());
			pickUpAddress.setCity(address.getCity());
			pickUpAddress.setCountry(address.getCountry());
			pickUpAddress.setState(address.getState());
			pickUpAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(pickUpAddress);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		if (pickUpAddress == null || userDetails.getPickUpAddress().equals(userDetails.getStoreAddress())) {
			// Create new address object and save it
			Address newPickUpAddress = new Address();
			newPickUpAddress.setAddressLine1(address.getAddressLine1());
			newPickUpAddress.setAddressLine2(address.getAddressLine2());
			newPickUpAddress.setCity(address.getCity());
			newPickUpAddress.setCountry(address.getCountry());
			newPickUpAddress.setState(address.getState());
			newPickUpAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(newPickUpAddress);
				userDetails.setPickUpAddress(newPickUpAddress.getAddressId());
				sellerRepository.save(userDetails);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/copyStoreAddress")
	public ResponseEntity<Map<String, Object>> copyStoreAddress(HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Seller userDetails = sellerRepository.findById(authenticatedUser.getUserId()).get();

		if (userDetails.getStoreAddress() == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		try {
			String oldAddressId = userDetails.getPickUpAddress();
			userDetails.setPickUpAddress(userDetails.getStoreAddress());
			sellerRepository.save(userDetails);
			addressRepository.deleteById(oldAddressId);
			updateSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("updateSuccessful", updateSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/api/getProductListing")
	public ResponseEntity<Map<String, Object>> getProductListing(HttpServletRequest req, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean isSuccessful = false;
		
		res.setContentType("application/json");

		if (authenticatedUser == null) {
			response.put("getSuccessful", isSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}
		
		try {
			Map<String, Map<String, Object>> sellerProducts = new HashMap<>();
			List<Product> products = productRepository.getSellerProducts(authenticatedUser.getUserId());
			
			for(Product product: products) {
				Map<String, Object> productDetails = new HashMap<>();
				productDetails.put("productDetails", product);
				
				List<String> productCategories = productRepository.getProductCategories(product.getProductId());
				productDetails.put("productCategories", productCategories);
				
				sellerProducts.put(product.getProductId(), productDetails);
			}
			
			response.put("productListing", sellerProducts);
			isSuccessful = true;
		} catch (Exception e) {
			System.out.println(e);
			response.put("isSuccessful", isSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("isSuccessful", isSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
