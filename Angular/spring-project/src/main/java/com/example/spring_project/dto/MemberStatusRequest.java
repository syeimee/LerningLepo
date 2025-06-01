package com.example.spring_project.dto;

import java.util.UUID;

public class MemberStatusRequest {
    private UUID userId;
    private String orderNumber;
    public MemberStatusRequest() {
    }
    public MemberStatusRequest(UUID userId, String orderNumber) {
        this.userId = userId;
        this.orderNumber = orderNumber;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public String getOrderNumber() {
        return orderNumber;
    }
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    
}
