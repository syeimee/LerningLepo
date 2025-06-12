package com.example.spring_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.spring_project.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>{

    //注文番号の取得
    List<OrderDetails> findByOrderNumber(String orderNumber);
}
