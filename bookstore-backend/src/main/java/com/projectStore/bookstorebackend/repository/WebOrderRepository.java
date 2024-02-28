package com.projectStore.bookstorebackend.repository;

import com.projectStore.bookstorebackend.entities.WebOrder;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WebOrderRepository extends MongoRepository<WebOrder,String> {
    Optional<WebOrder> findByCustomerId(String customerId);
    void deleteByCustomerId(String customerId);
}
