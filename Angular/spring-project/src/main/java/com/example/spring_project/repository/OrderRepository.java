package com.example.spring_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_project.entity.OrderHistory;

@Repository
public interface OrderRepository extends JpaRepository<OrderHistory, String>{

    //注文履歴一覧を取得(Optional型は値が存在しないことを考慮する型)
    Optional<OrderHistory> findByOrderNumber(String orderNumber);
}
