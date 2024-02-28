package com.projectStore.bookstorebackend.repository;

import com.projectStore.bookstorebackend.entities.WebUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WebUserRepository extends MongoRepository<WebUser,String> {

    Optional<WebUser> findByUsername(String username);

    Optional<WebUser> findByEmail(String email);
}
