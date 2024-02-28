package com.projectStore.bookstorebackend.service;

import com.projectStore.bookstorebackend.entities.Book;
import com.projectStore.bookstorebackend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }


    public Optional<Book> findByTitle(String title){
        return bookRepository.findByTitle(title);
    }

    public Optional<Book> save(Book book){
        return Optional.of(bookRepository.save(book));
    }

    public Optional<Book> findById(String id){
        return bookRepository.findById(id);
    }
}
