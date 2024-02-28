package com.projectStore.bookstorebackend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class WebOrder {

    @Id
    private String id;

    private String customerId;

    private List<Book> orders= new ArrayList<>();

    public WebOrder(){
    }

    public WebOrder(String id, String customerId, List<Book> orders) {
        this.id = id;
        this.customerId = customerId;
        this.orders = orders;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public List<Book> getOrders() {
        return orders;
    }

    public void setOrders(List<Book> orders) {
        this.orders = orders;
    }


}
