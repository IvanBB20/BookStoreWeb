package com.projectStore.bookstorebackend.service;

import com.projectStore.bookstorebackend.entities.Book;
import com.projectStore.bookstorebackend.entities.WebOrder;
import com.projectStore.bookstorebackend.repository.WebOrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WebOrderService {

    private WebOrderRepository webOrderRepository;

    private BookService bookService;

    private WebUserService webUserService;

    public WebOrderService(WebOrderRepository webOrderRepository, BookService bookService, WebUserService webUserService) {
        this.webOrderRepository = webOrderRepository;
        this.bookService = bookService;
        this.webUserService = webUserService;
    }

    public Optional<WebOrder> findUser(String userId){
        return webOrderRepository.findByCustomerId(userId);
    }



    public WebOrder deleteBook(String userId , String bookId,WebOrder webOrder){

        List<Book> orders = webOrder.getOrders();
        System.out.println("Before: " + orders.size());
        Optional<Book> curBook = bookService.findById(bookId);
        boolean res = orders.remove(bookService.findById(bookId).get());
        webOrder.setOrders(orders);
        webOrderRepository.save(webOrder);
        return webOrder;

    }


    public List<Book> showOrders(String userId){

        Optional<WebOrder> webOrder = webOrderRepository.findByCustomerId(userId);
        if(webOrder.isEmpty()){
            return null;
        }
        return webOrder.get().getOrders();

    }

    public WebOrder addBookToCart(String userId , String bookId){
        if(!webUserService.doesUserExist(userId)){
            return null;
        }

        Optional<Book> currentBook = bookService.findById(bookId);
        if(currentBook.isEmpty()){
            return null;
        }

        Optional<WebOrder> currentWebOrder = webOrderRepository.findByCustomerId(userId);
        WebOrder constructOrder = new WebOrder();
        if(currentWebOrder.isEmpty()){

            constructOrder.setCustomerId(userId);

            List<Book> firstOrder = new ArrayList<>();
            firstOrder.add(currentBook.get());
            constructOrder.setOrders(firstOrder);
            return webOrderRepository.save(constructOrder);
        }

        WebOrder webOrder = currentWebOrder.get();


        String id = webOrder.getId();
        List<Book> currentOrders = webOrder.getOrders();
        String customerId = webOrder.getCustomerId();



        Book book = currentBook.get();
        currentOrders.add(book);
        webOrderRepository.deleteById(id);
        constructOrder.setOrders(currentOrders);
        constructOrder.setCustomerId(customerId);

        return webOrderRepository.save(constructOrder);
    }

    public void deleteOrder(String userId) {

        webOrderRepository.deleteByCustomerId(userId);
    }
}
