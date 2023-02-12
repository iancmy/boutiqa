package com.boutiqa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ProductCategoriesId.class)
@Table(name = "ProductCategories")
public class ProductCategories {
	
	@Id
	@Column(name = "ProductId", length = 36)
    private String productId;
	
	@Id
	@Column(name = "CategoryCode")
	private int categoryCode;
	
	public ProductCategories() {}
	
	public ProductCategories(String productId, int categoryCode) {
		super();
		this.productId = productId;
		this.categoryCode = categoryCode;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public int getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(int categoryCode) {
		this.categoryCode = categoryCode;
	}

	@Override
	public String toString() {
		return "ProductCategories [productId=" + productId + ", categoryCode=" + categoryCode + "]";
	}	
}
