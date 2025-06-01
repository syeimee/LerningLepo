package com.example.spring_project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.spring_project.dto.OrderDTO;
import com.example.spring_project.dto.OrderHistoryResponse;
import com.example.spring_project.dto.OrderItem;
import com.example.spring_project.dto.OrderRequest;
import com.example.spring_project.dto.OrderResponse;
import com.example.spring_project.dto.PageableDTO;
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
    };

    @Transactional //メソッド内の処理に対してトランザクションが行われる
    public OrderResponse createOrder(OrderRequest orderRequest){
        String orderNumber = generateOrderNumber();
        LocalDateTime orderDate = LocalDateTime.now();
        
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrderNumber(orderNumber);
        orderHistory.setOrderDate(orderDate);
        orderHistory.setUserId(orderRequest.getUserId());
        orderHistory.setUserName(orderRequest.getUserName());
        orderHistory.setTotalPrice(orderRequest.getTotalPrice());
        orderHistory.setTotalQuantity(orderRequest.getTotalQuantity());
        orderHistory.setEarnedPoints(calculatePoints(orderRequest.getTotalPrice()));
        orderRepository.save(orderHistory);

        for(OrderItem item: orderRequest.getOrderItems()){
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrderNumber(orderNumber);
            orderDetails.setProductId(item.getProfuctId());
            orderDetails.setProductName(item.getProductName());
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

    /**
     * 
     * ページネーションで注文履歴情報を取得するメソッド
     * 
     * @param userId ユーザーのID
     * @param page 現在のページ
     * @param size １ページあたりの表示件数
     * @return OrderHistoryResponse
     */
    public OrderHistoryResponse getOrderHistory(UUID userId, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "orderDate"));
        Page<OrderHistory> orderHistoryPage = orderRepository.findByUserId(userId, pageRequest);

        //クライエント表示用にデータ変換
        List<OrderDTO> orderDTOs = orderHistoryPage.getContent().stream().map(this::convertToOrderDTO).collect(Collectors.toList());
        PageableDTO pageableDTO = new PageableDTO(
            orderHistoryPage.getNumber(),
            orderHistoryPage.getSize(),
            orderHistoryPage.getTotalElements(),
            orderHistoryPage.getTotalPages()
        );
        return new OrderHistoryResponse(orderDTOs, pageableDTO);
    }

    private OrderDTO convertToOrderDTO(OrderHistory orderHistory){
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderNumber(orderHistory.getOrderNumber());
        List<OrderItem> orderItems = orderDetails.stream().map(this::convertToOrderItem).collect(Collectors.toList());
        return new OrderDTO(
            orderHistory.getOrderDate().toString(),
            orderHistory.getOrderNumber(),
            orderHistory.getTotalPrice(),
            orderHistory.getTotalQuantity(),
            orderItems
        );
    }
    
    private OrderItem convertToOrderItem(OrderDetails orderDetails){
        return new OrderItem(
            orderDetails.getProductId(),
            orderDetails.getProductName(),
            orderDetails.getPrice()
        );
    }

}
