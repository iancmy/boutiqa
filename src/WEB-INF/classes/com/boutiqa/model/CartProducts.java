package com.boutiqa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(CartProductsId.class)
@Table(name = "CartProducts")
public class CartProducts {
	
	@Id
	@Column(name = "CartId", length = 36)
    private String cartId;
	
	@Id
	@Column(name = "ProductId", length = 36)
    private String productId;
	
	@Column(name = "Quantity")
    private int quantity;
	
	public CartProducts() {}
	
	public CartProducts(String cartId, String productId, int quantity) {
		super();
		this.cartId = cartId;
		this.productId = productId;
		this.quantity = quantity;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "CartProducts [cartId=" + cartId + ", productId=" + productId + ", quantity=" + quantity + "]";
	}
}
