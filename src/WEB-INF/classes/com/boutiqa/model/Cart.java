package com.boutiqa.model;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Cart")
public class Cart {
	
	@Id
	@Column(name = "CartId", length = 36)
    private String cartId;
	
	@Column(name = "UserId", length = 36)
    private String userId;
	
	public Cart() {
	    this.cartId = UUID.randomUUID().toString();
	}
	
	public Cart(String userId) {
		super();
		this.cartId = UUID.randomUUID().toString();
		this.userId = userId;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", userId=" + userId + "]";
	}

}
