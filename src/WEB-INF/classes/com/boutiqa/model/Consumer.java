package com.boutiqa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Consumer")
public class Consumer {
	
	@Id
	@Column(name = "UserId", length = 36)
    private String userId;
	
	@Column(name = "BillingAddress", length = 36)
	private String billingAddress;
	
	@Column(name = "ShippingAddress", length = 36)
	private String shippingAddress;
	
	public Consumer() {}

	public Consumer(String userId, String billingAddress, String shippingAddress) {
		super();
		this.userId = userId;
		this.billingAddress = billingAddress;
		this.shippingAddress = shippingAddress;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	@Override
	public String toString() {
		return "Consumer [userId=" + userId + ", billingAddress=" + billingAddress + ", shippingAddress="
				+ shippingAddress + "]";
	}
}

