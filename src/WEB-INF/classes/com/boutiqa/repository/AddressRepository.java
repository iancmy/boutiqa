package com.boutiqa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

}
