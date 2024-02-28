package com.projectStore.bookstorebackend.api.controllers;

import com.projectStore.bookstorebackend.entities.Book;
import com.projectStore.bookstorebackend.entities.WebOrder;
import com.projectStore.bookstorebackend.service.WebOrderService;
import com.projectStore.bookstorebackend.service.WebUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class WebOrderController {

        private WebOrderService webOrderService;
        private WebUserService webUserService;

    public WebOrderController(WebOrderService webOrderService, WebUserService webUserService) {
        this.webOrderService = webOrderService;
        this.webUserService = webUserService;
    }

    @PostMapping("/addBook/{userId}/{bookId}")
    public ResponseEntity<WebOrder> addBook(@PathVariable String userId , @PathVariable String bookId) {

        if(!webUserService.doesUserExist(userId)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        WebOrder result = webOrderService.addBookToCart(userId,bookId);
        if(result==null){
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();
        }


        return  ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteBook/{userId}/{bookId}")
    public ResponseEntity<WebOrder> deleteCurrentBook(@PathVariable String userId , @PathVariable String bookId){
        Optional<WebOrder> curUserWebOrder = webOrderService.findUser(userId);
        if(curUserWebOrder.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        WebOrder webOrder = curUserWebOrder.get();
        webOrder  = webOrderService.deleteBook(userId,bookId,webOrder);

        return ResponseEntity.ok(webOrder);
    }

    @DeleteMapping("/deleteOrder/{userId}")
    public ResponseEntity<?> deleteOrder(@PathVariable String userId){
        webOrderService.deleteOrder(userId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/showOrders/{userId}")
    public ResponseEntity<List<Book>> showBooks(@PathVariable String userId){

        if(!webUserService.doesUserExist(userId)) {
            System.out.println("hhh");
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        List<Book> orders = webOrderService.showOrders(userId);
        if(orders == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(orders);
    }
}
