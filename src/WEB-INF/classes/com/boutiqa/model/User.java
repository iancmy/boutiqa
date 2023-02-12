package com.boutiqa.model;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {
	
	@Id
	@Column(name = "UserId", length = 36)
    private String userId;
	
	@Column(name = "EmailAddress")
	private String emailAddress;
	
	@Column(name = "Password")
	private String password;
	
	@Column(name = "FirstName")
	private String firstName;
	
	@Column(name = "LastName")
	private String lastName;
	
	@Column(name = "ContactNumber", length = 11)
	private String contactNumber;
	
	@Column(name = "UserType")
	private String userType;
	
	public User() {
	    this.userId = UUID.randomUUID().toString();
	}
	
	public User(String emailAddress, String password, String firstName, String lastName,
			String contactNumber, String userType) {
		super();
		this.userId = UUID.randomUUID().toString();
		this.emailAddress = emailAddress;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactNumber = contactNumber;
		this.userType = userType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", emailAddress=" + emailAddress + ", password=" + password + ", firstName="
				+ firstName + ", lastName=" + lastName + ", contactNumber=" + contactNumber + ", userType=" + userType
				+ "]";
	}
}
