package com.projectStore.bookstorebackend.repository;

import com.projectStore.bookstorebackend.entities.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BookRepository extends MongoRepository<Book, String> {

    Optional<Book> findByTitle(String title);
}
