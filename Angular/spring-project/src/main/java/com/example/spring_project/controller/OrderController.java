package com.example.spring_project.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_project.dto.OrderHistoryResponse;
import com.example.spring_project.dto.OrderRequest;
import com.example.spring_project.dto.OrderResponse;
import com.example.spring_project.service.OrderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController //REST APIであることを明記
@RequestMapping("api/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest){
        try{
            OrderResponse response = orderService.createOrder(orderRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch(Exception e){
            logger.error("ERROR OCCURRED WHILE CREATING ORDER", e);
            OrderResponse errorResponse = new OrderResponse(null, "ERROR", "An unexpected error occerred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<OrderHistoryResponse> getOrderHisotry(
        @RequestParam UUID userId, 
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ){
        try{
            OrderHistoryResponse orderHistoryResponse = orderService.getOrderHistory(userId, page, size);
            return ResponseEntity.ok(orderHistoryResponse);
        }catch(Exception e){
            logger.error("ERROR OCCURRED FETCHING ORDER HISTORY", e);
            OrderHistoryResponse errorResponse = new OrderHistoryResponse(null,null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    

}
