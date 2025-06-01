package com.example.spring_project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;;

@Entity //springがentityと認識する
@Table(name="order_details")//対応するテーブル名を指定する
public class OrderDetails {

    @Id //主キー
    @GeneratedValue(strategy = GenerationType.IDENTITY) //一意の値を自動生成する
    private Long id;

    @Column(name = "order_number", nullable = false) //カラム名を指定。null制約
    private String orderNumber;

    @Column(name = "product_id", nullable = false)
    private int productId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "created_at", nullable = false, updatable = false) //updatable = falseで更新させない
    @CreationTimestamp //DBが保存される際に、現在日時を付与する
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, updatable = true)//updatable = trueで更新させる
    @CreationTimestamp //DBが保存される際に、現在日時を付与する
    private LocalDateTime updatedAt;

    //デフォルトコンストラクタ
    public OrderDetails(){

    }

    public OrderDetails(String orderNumber, int product_id, String product_name, int price) {
        this.orderNumber = orderNumber;
        this.productId = product_id;
        this.productName = product_name;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    

}
