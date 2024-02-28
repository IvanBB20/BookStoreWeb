package com.projectStore.bookstorebackend.api.controllers;

import com.projectStore.bookstorebackend.entities.Book;
import com.projectStore.bookstorebackend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> findAll() {
        return bookService.findAll();
    }


    @PostMapping("/books")
    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    public ResponseEntity<Book> postBook(@RequestBody Book book) {
        bookService.save(book);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/book/{id}")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        Optional<Book> currentBook = bookService.findById(id);
        if (currentBook.isPresent()) return ResponseEntity.ok(currentBook.get());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
