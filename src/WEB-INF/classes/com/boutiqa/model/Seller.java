package com.boutiqa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Seller")
public class Seller {
	
	@Id
	@Column(name = "UserId", length = 36)
    private String userId;
	
	@Column(name = "StoreName")
	private String storeName;
	
	@Column(name = "StoreAddress", length = 36)
	private String storeAddress;
	
	@Column(name = "PickUpAddress", length = 36)
	private String pickUpAddress;
	
	public Seller() {}

	public Seller(String userId, String storeName, String storeAddress, String pickUpAddress) {
		super();
		this.userId = userId;
		this.storeName = storeName;
		this.storeAddress = storeAddress;
		this.pickUpAddress = pickUpAddress;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreAddress() {
		return storeAddress;
	}

	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}

	public String getPickUpAddress() {
		return pickUpAddress;
	}

	public void setPickUpAddress(String pickUpAddress) {
		this.pickUpAddress = pickUpAddress;
	}

	@Override
	public String toString() {
		return "Seller [userId=" + userId + ", storeName=" + storeName + ", storeAddress=" + storeAddress
				+ ", pickUpAddress=" + pickUpAddress + "]";
	}
}

