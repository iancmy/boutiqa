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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.boutiqa.model.Address;
import com.boutiqa.model.Cart;
import com.boutiqa.model.CartProducts;
import com.boutiqa.model.CartProductsId;
import com.boutiqa.model.Consumer;
import com.boutiqa.model.Product;
import com.boutiqa.model.User;
import com.boutiqa.repository.AddressRepository;
import com.boutiqa.repository.CartProductsRepository;
import com.boutiqa.repository.CartRepository;
import com.boutiqa.repository.ConsumerRepository;
import com.boutiqa.repository.ProductRepository;
import com.boutiqa.service.UserService;

@Controller
public class ConsumerAPI {
	@Autowired
	private UserService userService;

	@Autowired
	private ConsumerRepository consumerRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartProductsRepository cartProductsRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private AddressRepository addressRepository;

	@GetMapping("/api/buyerDetails")
	public ResponseEntity<Map<String, Object>> buyerDetails(HttpServletRequest req, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();

		User authenticatedUser = userService.postAuthenticate(req);

		res.setContentType("application/json");

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("buyer")) {
			// Join the User, Consumer, and Cart tables using the userId field
			String userId = authenticatedUser.getUserId();
			Consumer consumer = consumerRepository.findById(userId).get();
			Cart cart = cartRepository.findByUserId(userId);

			Map<String, Address> addresses = new HashMap<>();
			Map<String, Object> userAccount = new HashMap<>();

			userAccount.put("firstName", authenticatedUser.getFirstName());
			userAccount.put("lastName", authenticatedUser.getLastName());
			userAccount.put("emailAddress", authenticatedUser.getEmailAddress());
			userAccount.put("contactNumber", authenticatedUser.getContactNumber());
			userAccount.put("userType", authenticatedUser.getUserType());

			if (consumer.getShippingAddress() != null) {
				addresses.put("shippingAddress", addressRepository.findById(consumer.getShippingAddress()).get());
			} else {
				addresses.put("shippingAddress", null);
			}

			if (consumer.getBillingAddress() != null) {
				addresses.put("billingAddress", addressRepository.findById(consumer.getBillingAddress()).get());
			} else {
				addresses.put("billingAddress", null);
			}

			// Put the desired fields from each table in the response
			response.put("userAccount", userAccount);
			response.put("userDetails", consumer);
			response.put("userAddress", addresses);
			response.put("cartId", cart.getCartId());

			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@PostMapping("/api/updateShippingAddress")
	public ResponseEntity<Map<String, Object>> updateShippingAddress(@RequestBody Address address,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Consumer userDetails = consumerRepository.findById(authenticatedUser.getUserId()).get();
		Address shippingAddress = null;

		if (userDetails.getShippingAddress() != null) {
			shippingAddress = addressRepository.findById(userDetails.getShippingAddress()).get();

			shippingAddress.setAddressLine1(address.getAddressLine1());
			shippingAddress.setAddressLine2(address.getAddressLine2());
			shippingAddress.setCity(address.getCity());
			shippingAddress.setCountry(address.getCountry());
			shippingAddress.setState(address.getState());
			shippingAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(shippingAddress);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		if (shippingAddress == null) {
			// Create new address object and save it
			Address newShippingAddress = new Address();
			newShippingAddress.setAddressLine1(address.getAddressLine1());
			newShippingAddress.setAddressLine2(address.getAddressLine1());
			newShippingAddress.setCity(address.getCity());
			newShippingAddress.setCountry(address.getCountry());
			newShippingAddress.setState(address.getState());
			newShippingAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(newShippingAddress);
				userDetails.setShippingAddress(newShippingAddress.getAddressId());
				consumerRepository.save(userDetails);
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

	@PostMapping("/api/updateBillingAddress")
	public ResponseEntity<Map<String, Object>> updateBillingAddress(@RequestBody Address address,
			HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Consumer userDetails = consumerRepository.findById(authenticatedUser.getUserId()).get();
		Address billingAddress = null;

		if (userDetails.getBillingAddress() != null
				&& !userDetails.getBillingAddress().equals(userDetails.getShippingAddress())) {
			billingAddress = addressRepository.findById(userDetails.getBillingAddress()).get();

			billingAddress.setAddressLine1(address.getAddressLine1());
			billingAddress.setAddressLine2(address.getAddressLine2());
			billingAddress.setCity(address.getCity());
			billingAddress.setCountry(address.getCountry());
			billingAddress.setState(address.getState());
			billingAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(billingAddress);
				updateSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("updateSuccessful", updateSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		if (billingAddress == null || userDetails.getBillingAddress().equals(userDetails.getShippingAddress())) {
			// Create new address object and save it
			Address newBillingAddress = new Address();
			newBillingAddress.setAddressLine1(address.getAddressLine1());
			newBillingAddress.setAddressLine2(address.getAddressLine2());
			newBillingAddress.setCity(address.getCity());
			newBillingAddress.setCountry(address.getCountry());
			newBillingAddress.setState(address.getState());
			newBillingAddress.setZipCode(address.getZipCode());

			try {
				addressRepository.save(newBillingAddress);
				userDetails.setBillingAddress(newBillingAddress.getAddressId());
				consumerRepository.save(userDetails);
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

	@PostMapping("/api/copyShippingAddress")
	public ResponseEntity<Map<String, Object>> copyShippingAddress(HttpServletRequest req) {
		Map<String, Object> response = new HashMap<>();
		User authenticatedUser = userService.postAuthenticate(req);
		boolean updateSuccessful = false;

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		Consumer userDetails = consumerRepository.findById(authenticatedUser.getUserId()).get();

		if (userDetails.getShippingAddress() == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		try {
			String oldAddressId = userDetails.getBillingAddress();
			userDetails.setBillingAddress(userDetails.getShippingAddress());
			consumerRepository.save(userDetails);
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

	@GetMapping("/api/cartDetails")
	public ResponseEntity<Map<String, Object>> cartDetails(HttpServletRequest req, HttpServletResponse res) {
		Map<String, Object> response = new HashMap<>();

		User authenticatedUser = userService.postAuthenticate(req);

		res.setContentType("application/json");

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("buyer")) {
			String userId = authenticatedUser.getUserId();
			Cart cart = cartRepository.findByUserId(userId);
			List<Map<String, Object>> cartProducts = cartProductsRepository.findByCartId(cart.getCartId());
			Map<String, Object> cartSummary = new HashMap<>();
			int totalItems = 0;
			float subTotal = 0;

			for (Map<String, Object> cartProduct : cartProducts) {
				String productId = (String) cartProduct.get("productId");
				Product product = productRepository.findById(productId).get();

				totalItems += 1;
				subTotal += product.getPrice() * (int) cartProduct.get("quantity");
			}

			cartSummary.put("totalItems", totalItems);
			cartSummary.put("subTotal", subTotal);

			response.put("cartId", cart.getCartId());
			response.put("cartProducts", cartProducts);
			response.put("cartSummary", cartSummary);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/addToCart")
	public ResponseEntity<Map<String, Object>> addToCart(HttpServletRequest req,
			@RequestParam("productId") String productId, @RequestParam("quantity") int quantity) {
		Map<String, Object> response = new HashMap<>();
		boolean updateSuccessful = false;

		User authenticatedUser = userService.postAuthenticate(req);

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("buyer")) {
			String userId = authenticatedUser.getUserId();
			Cart cart = cartRepository.findByUserId(userId);

			try {
				CartProducts existingProduct = cartProductsRepository.findByCartAndProduct(cart.getCartId(), productId);

				if (existingProduct != null) {
					existingProduct.setQuantity(existingProduct.getQuantity() + quantity);
					cartProductsRepository.save(existingProduct);
				} else {
					CartProducts newProduct = new CartProducts();
					newProduct.setCartId(cart.getCartId());
					newProduct.setProductId(productId);
					newProduct.setQuantity(quantity);

					cartProductsRepository.save(newProduct);
				}
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

	@DeleteMapping("/api/deleteCartItem")
	public ResponseEntity<Map<String, Object>> deleteCartItem(HttpServletRequest req,
			@RequestParam("productId") String productId) {
		Map<String, Object> response = new HashMap<>();
		boolean deleteSuccessful = false;

		User authenticatedUser = userService.postAuthenticate(req);

		if (authenticatedUser == null) {
			response.put("deleteSuccessful", deleteSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("buyer")) {
			String userId = authenticatedUser.getUserId();
			Cart cart = cartRepository.findByUserId(userId);

			try {
				CartProductsId id = new CartProductsId(cart.getCartId(), productId);
				cartProductsRepository.deleteById(id);

				deleteSuccessful = true;
			} catch (Exception e) {
				System.out.println(e);
				response.put("deleteSuccessful", deleteSuccessful);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}

		response.put("deleteSuccessful", deleteSuccessful);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/api/updateCartItem")
	public ResponseEntity<Map<String, Object>> updateCartItem(HttpServletRequest req,
			@RequestParam("productId") String productId, @RequestParam("quantity") int quantity) {
		Map<String, Object> response = new HashMap<>();
		boolean updateSuccessful = false;

		User authenticatedUser = userService.postAuthenticate(req);

		if (authenticatedUser == null) {
			response.put("updateSuccessful", updateSuccessful);
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		if (authenticatedUser != null && authenticatedUser.getUserType().equals("buyer")) {
			String userId = authenticatedUser.getUserId();
			Cart cart = cartRepository.findByUserId(userId);

			try {
				CartProducts existingProduct = cartProductsRepository.findByCartAndProduct(cart.getCartId(), productId);

				existingProduct.setQuantity(quantity);
				cartProductsRepository.save(existingProduct);
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
}
