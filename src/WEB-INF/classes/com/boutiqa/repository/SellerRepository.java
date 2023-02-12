package com.boutiqa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, String> {

}
