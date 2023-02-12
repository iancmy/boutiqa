package com.boutiqa.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ProductImages")
public class ProductImages {
	
	@Id
	@Column(name = "ImageId", length = 36)
    private String imageId;
	
	@Column(name = "ProductId", length = 36)
    private String productId;
	
	@Column(name = "ImagePath")
    private String imagePath;
	
	public ProductImages() {
		this.imageId = UUID.randomUUID().toString();
	}
	
	public ProductImages(String productId, String imagePath) {
		super();
		this.imageId = UUID.randomUUID().toString();
		this.productId = productId;
		this.imagePath = imagePath;
	}

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return "ProductImages [imageId=" + imageId + ", productId=" + productId + ", imagePath=" + imagePath + "]";
	}
}
