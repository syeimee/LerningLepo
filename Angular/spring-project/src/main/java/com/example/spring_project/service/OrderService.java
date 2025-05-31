package com.example.spring_project.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_project.dto.OrderItem;
import com.example.spring_project.dto.OrderRequest;
import com.example.spring_project.dto.OrderResponse;
import com.example.spring_project.entity.OrderDetails;
import com.example.spring_project.entity.OrderHistory;
import com.example.spring_project.repository.OrderDetailsRepository;
import com.example.spring_project.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository; //private 他クラスからアクセス不可　final 変更不可
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Transactional //メソッド内の処理に対してトランザクションが行われる
    public OrderResponse createOrder(OrderRequest orderRequest){
        String orderNumber = generateOrderNumber();
        LocalDateTime orderDate = LocalDateTime.now();
        
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrderNumber(orderNumber);
        orderHistory.setOrder_date(orderDate);
        orderHistory.setUser_id(orderRequest.getUserId());
        orderHistory.setUser_name(orderRequest.getUserName());
        orderHistory.setTotal_price(orderRequest.getTotalPrice());
        orderHistory.setTotal_quantity(orderRequest.getTotalQuantity());
        orderHistory.setEarned_points(calculatePoints(orderRequest.getTotalPrice()));
        orderRepository.save(orderHistory);

        for(OrderItem item: orderRequest.getOrderItems()){
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrderNumber(orderNumber);
            orderDetails.setProduct_id(item.getProfuctId());
            orderDetails.setProduct_name(item.getProductName());
            orderDetails.setPrice(item.getPrice());
            orderDetailsRepository.save(orderDetails);
        }

        return new OrderResponse(orderNumber, "SUCCESS","Order has been sucessfully registerd");
    }



    private String generateOrderNumber(){
        return "ORD-" + UUID.randomUUID().toString();//接頭語にORD-をつけUUIDをくっつけてStringに変更
    }

    private int calculatePoints(int totalPrice){
        //1%のポイントを付与する
        return totalPrice/100;
    }
}
