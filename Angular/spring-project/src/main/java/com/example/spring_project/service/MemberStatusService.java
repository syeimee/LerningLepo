package com.example.spring_project.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_project.entity.MemberStatus;
import com.example.spring_project.dto.MemberStatusResponse;
import com.example.spring_project.entity.OrderHistory;
import com.example.spring_project.repository.MemberStatusRepository;
import com.example.spring_project.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class MemberStatusService {
    private final MemberStatusRepository memberStatusRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public MemberStatusService(MemberStatusRepository memberStatusRepository, OrderRepository orderRepository) {
        this.memberStatusRepository = memberStatusRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public MemberStatusResponse calurateAndUpdateMemberStatus(UUID userId, String orderNumber){
        OrderHistory order = orderRepository.findByOrderNumber(orderNumber)
                            .orElseThrow(()-> new RuntimeException("Order not found for order number:"+orderNumber ));
        int earndPoints = calcultatePoints(order.getTotalPrice()); //注文の合計金額を元に獲得ポイントを算出
        MemberStatus memberStatus = memberStatusRepository.findByUserId(userId).orElse(new MemberStatus(userId, 0, "BRONZE"));
        memberStatus.setTotalPoints(memberStatus.getTotalPoints() + earndPoints);
        int totalPointsLast3Months = caluculateTotalPointsLast3Months(userId);
        String newRank = detarmineRank(totalPointsLast3Months);
        memberStatus.setRank(newRank);
        memberStatusRepository.save(memberStatus);
        return new MemberStatusResponse(userId, memberStatus.getTotalPoints(), newRank);
    }

    private int calcultatePoints(int totalPrice){
        return totalPrice / 100; //totalPriceの1%
    }

    private int caluculateTotalPointsLast3Months(UUID userId){
        LocalDateTime threeMonthAgo = LocalDateTime.now().minusMonths(3); //現在の日付から３ヶ月前
        return orderRepository.sumPointsForUserSince(userId, threeMonthAgo);
    }

    private String detarmineRank(int points){
        if(points >= 50){
            return "GOLD";
        }else if(points >= 20){
            return "SILVER";
        }else{
            return "BLONZE";
        }
    }
}
