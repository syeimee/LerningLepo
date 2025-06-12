package com.example.spring_project.dto;

import java.util.UUID;

/**
 * バックエンドからフロントエンドに会員ステータスを返却するクラス
 */
public class MemberStatusResponse {

    private UUID userId;
    private int points;
    private String rank;
    public MemberStatusResponse() {
    }
    public MemberStatusResponse(UUID userId, int points, String rank) {
        this.userId = userId;
        this.points = points;
        this.rank = rank;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public int getPoints() {
        return points;
    }
    public void setPoints(int points) {
        this.points = points;
    }
    public String getRank() {
        return rank;
    }
    public void setRank(String rank) {
        this.rank = rank;
    }

    
}
