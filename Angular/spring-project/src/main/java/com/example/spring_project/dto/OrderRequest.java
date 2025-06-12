package com.example.spring_project.dto;

import java.util.List;
import java.util.UUID;

//クライエントから受け取るリクエストを定義
public class OrderRequest {
    private UUID userId;
    private String userName;
    private int totalPrice;
    private int totalQuantity;
    private List<OrderItem> orderItems;
    

    public OrderRequest(){
    }


    public OrderRequest(UUID userId, String userName, int totalPrice, int totalQuantity, List<OrderItem> orderItems) {
        this.userId = userId;
        this.userName = userName;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.orderItems = orderItems;
    }


    public UUID getUserId() {
        return userId;
    }


    public void setUserId(UUID userId) {
        this.userId = userId;
    }


    public String getUserName() {
        return userName;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }


    public int getTotalPrice() {
        return totalPrice;
    }


    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }


    public int getTotalQuantity() {
        return totalQuantity;
    }


    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }


    public List<OrderItem> getOrderItems() {
        return orderItems;
    }


    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }


    
}
