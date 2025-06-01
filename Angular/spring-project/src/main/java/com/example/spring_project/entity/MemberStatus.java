package com.example.spring_project.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "member_status")
public class MemberStatus {

    @Id
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "total_points", nullable = false)
    private int totalPoints;

    @Column(name = "rank", nullable = false)
    private String rank;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createAt;

    @Column(name = "updated_at", updatable = true)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public MemberStatus() {
    }

    public MemberStatus(UUID userId, int totalPoints, String rank) {
        this.userId = userId;
        this.totalPoints = totalPoints;
        this.rank = rank;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    
}
