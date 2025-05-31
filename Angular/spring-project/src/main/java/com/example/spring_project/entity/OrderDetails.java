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
    private int product_id;

    @Column(name = "product_name", nullable = false)
    private String product_name;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "created_at", nullable = false, updatable = false) //updatable = falseで更新させない
    @CreationTimestamp //DBが保存される際に、現在日時を付与する
    private LocalDateTime created_at;

    @Column(name = "updated_at", nullable = false, updatable = true)//updatable = trueで更新させる
    @CreationTimestamp //DBが保存される際に、現在日時を付与する
    private LocalDateTime updated_at;

    //デフォルトコンストラクタ
    public OrderDetails(){

    }

    public OrderDetails(String orderNumber, int product_id, String product_name, int price) {
        this.orderNumber = orderNumber;
        this.product_id = product_id;
        this.product_name = product_name;
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

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
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
