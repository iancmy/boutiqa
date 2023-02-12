package com.boutiqa.model;

import java.io.Serializable;

public class ProductCategoriesId implements Serializable {
	private static final long serialVersionUID = -6671032022778456246L;
	private String productId;
    private int categoryCode;

    public ProductCategoriesId() {}

    public ProductCategoriesId(String productId, int categoryCode) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductCategoriesId that = (ProductCategoriesId) o;

        if (categoryCode != that.categoryCode) return false;
        return productId.equals(that.productId);
    }

    @Override
    public int hashCode() {
        int result = productId.hashCode();
        result = 31 * result + categoryCode;
        return result;
    }
}

