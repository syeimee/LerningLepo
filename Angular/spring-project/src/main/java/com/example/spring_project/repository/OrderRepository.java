package com.example.spring_project.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.spring_project.entity.OrderHistory;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderHistory, String>{

    //注文履歴一覧を取得(Optional型は値が存在しないことを考慮する型)
    Optional<OrderHistory> findByOrderNumber(String orderNumber);

    Page<OrderHistory> findByUserId(UUID userId, Pageable pageable);

    //過去3ヶ月分の合計取得ポイントに基づいて会員ランクを決定する
    @Query("SELECT SUM(o.totalPrice) / 100 FROM orderHistory o where o.userId = :userId AND o.orderDate >= :since")
    int sumPointsForUserSince(@Param("userId") UUID userId, @Param("since") LocalDateTime since);
}