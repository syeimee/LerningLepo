package com.example.spring_project.dto;

public class OrderResponse {
    private String orderNumber;
    private String status;
    private String massage;
    public OrderResponse() {
    }
    public OrderResponse(String orderNumber, String status, String massage) {
        this.orderNumber = orderNumber;
        this.status = status;
        this.massage = massage;
    }
    public String getOrderNumber() {
        return orderNumber;
    }
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMassage() {
        return massage;
    }
    public void setMassage(String massage) {
        this.massage = massage;
    }

}
