package com.boutiqa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boutiqa.model.Consumer;

@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, String> {

}
