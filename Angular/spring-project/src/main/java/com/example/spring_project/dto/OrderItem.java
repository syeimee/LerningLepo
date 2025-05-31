package com.example.spring_project.dto;

//DTO（DataTransfarObject）はフロント側に無駄な項目を表示させないようにすることで、セキュリティ・通信の改善に役立つ
public class OrderItem {
    private int profuctId;
    private String productName;
    private int price;

    public OrderItem(){
    }

    public OrderItem(int profuctId, String productName, int price) {
        this.profuctId = profuctId;
        this.productName = productName;
        this.price = price;
    }

    public int getProfuctId() {
        return profuctId;
    }

    public void setProfuctId(int profuctId) {
        this.profuctId = profuctId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    
}
