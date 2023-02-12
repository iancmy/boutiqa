package com.boutiqa.model;

import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Product")
public class Product {

	@Id
	@Column(name = "ProductId", length = 36)
	private String productId;

	@Column(name = "UserId", length = 36)
	private String userId;

	@Column(name = "ProductName")
	private String productName;

	@Column(name = "Description")
	private String description;

	@Column(name = "Price")
	private float price;

	@Column(name = "Quantity")
	private int quantity;

	@Column(name = "DateCreated")
	private Date dateCreated;

	public Product() {
		this.productId = UUID.randomUUID().toString();
		this.dateCreated = new Date();
	}

	public Product(String userId, String productName, String description, float price, int quantity) {
		super();
		this.productId = UUID.randomUUID().toString();
		this.userId = userId;
		this.productName = productName;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.dateCreated = new Date();
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", userId=" + userId + ", productName=" + productName
				+ ", description=" + description + ", price=" + price + ", quantity=" + quantity + ", dateCreated="
				+ dateCreated + "]";
	}
}
