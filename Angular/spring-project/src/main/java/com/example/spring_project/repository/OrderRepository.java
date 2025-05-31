package com.example.spring_project.repository;

import java.util.Optional;

import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_project.entity.OrderHistory;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderHistory, String>{

    //注文履歴一覧を取得(Optional型は値が存在しないことを考慮する型)
    Optional<OrderHistory> findByOrderNumber(String orderNumber);

    Page<OrderHistory> findByUserId(UUID user_id, Pageable pageable);
}