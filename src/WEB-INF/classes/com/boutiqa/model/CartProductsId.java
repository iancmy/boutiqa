package com.boutiqa.model;

import java.io.Serializable;

public class CartProductsId implements Serializable {
	private static final long serialVersionUID = -6614719095088332755L;
	private String cartId;
    private String productId;

    public CartProductsId() {}

    public CartProductsId(String cartId, String productId) {
        this.cartId = cartId;
        this.productId = productId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CartProductsId that = (CartProductsId) o;

        if (!cartId.equals(that.cartId)) return false;
        return productId.equals(that.productId);
    }

    @Override
    public int hashCode() {
        int result = cartId.hashCode();
        result = 31 * result + productId.hashCode();
        return result;
    }
}
