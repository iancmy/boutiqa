package com.boutiqa.model;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Address")
public class Address {
	
	@Id
	@Column(name = "AddressId", length = 36)
    private String AddressId;
	
	@Column(name = "AddressLine1")
	private String addressLine1;
	
	@Column(name = "AddressLine2")
	private String addressLine2;
	
	@Column(name = "City")
	private String city;
	
	@Column(name = "State")
	private String state;
	
	@Column(name = "Country")
	private String country;
	
	@Column(name = "ZipCode")
	private String zipCode;
	
	public Address() {
	    this.AddressId = UUID.randomUUID().toString();
	}
	
	public Address(String addressLine1, String addressLine2, String city, String state,
			String country, String zipCode) {
		super();
		this.AddressId = UUID.randomUUID().toString();
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
	}

	public String getAddressId() {
		return AddressId;
	}

	public void setAddressId(String addressId) {
		AddressId = addressId;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	@Override
	public String toString() {
		return "Address [AddressId=" + AddressId + ", addressLine1=" + addressLine1 + ", addressLine2=" + addressLine2
				+ ", city=" + city + ", state=" + state + ", country=" + country + ", zipCode=" + zipCode + "]";
	}
}
