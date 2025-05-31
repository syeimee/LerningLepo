package com.example.spring_project.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_history")
public class OrderHistory {

    @Id
    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime order_date;

    @Column(name = "user_id", nullable = false)
    private UUID user_id;

    @Column(name = "user_name", nullable = false)
    private String user_name;

    @Column(name = "total_price", nullable = false)
    private int total_price;

    @Column(name = "total_quantity", nullable = false)
    private int total_quantity;

    @Column(name = "earned_points", nullable = false)
    private int earned_points;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(name = "updated_at", nullable = false, updatable = true)
    @CreationTimestamp
    private LocalDateTime updated_at;

    //デフォルトコンストラクタ
    public OrderHistory() {
    }

    public OrderHistory(String orderNumber, LocalDateTime order_date, UUID user_id, String user_name, int total_price,int total_quantity, int earned_points) {
        this.orderNumber = orderNumber;
        this.order_date = order_date;
        this.user_id = user_id;
        this.user_name = user_name;
        this.total_price = total_price;
        this.total_quantity = total_quantity;
        this.earned_points = earned_points;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDateTime getOrder_date() {
        return order_date;
    }

    public void setOrder_date(LocalDateTime order_date) {
        this.order_date = order_date;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public void setUser_id(UUID user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public int getTotal_price() {
        return total_price;
    }

    public void setTotal_price(int total_price) {
        this.total_price = total_price;
    }

    public int getTotal_quantity() {
        return total_quantity;
    }

    public void setTotal_quantity(int total_quantity) {
        this.total_quantity = total_quantity;
    }

    public int getEarned_points() {
        return earned_points;
    }

    public void setEarned_points(int earned_points) {
        this.earned_points = earned_points;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

}
