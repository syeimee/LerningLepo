package com.example.ec_backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ec_backend.dto.ViewHistoryResponseDto;
import com.example.ec_backend.entity.ViewHistory;

import jakarta.transaction.Transactional;

@Repository
public interface ViewHistoryRepository extends JpaRepository<ViewHistory, Integer> {
    @Query("""
        SELECT new com.example.ec_backend.dto.ViewHistoryResponseDto(
            pr.location, pr.name, p.description, p.price
        )
        FROM ViewHistory vh
        INNER JOIN vh.product p
        INNER JOIN p.producer pr
        WHERE vh.user.id  = :userId
        ORDER BY vh.viewedAt DESC
    """)
    List<ViewHistoryResponseDto> findTop10ByUserIdOrderByViewedAtDesc(@Param("userId") int userId);


    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("""
        UPDATE ViewHistory vh
        SET vh.viewedAt = :viewedAt
        WHERE vh.user.id = :userId AND vh.product.id = :productId
    """)
    int updateViewHistory(@Param("userId") int userId, @Param("productId") int productId, @Param("viewedAt") LocalDateTime viewedAt);
}

