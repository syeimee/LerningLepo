package com.example.ec_backend.dto;

import java.time.LocalDateTime;

public class ViewHistoryUpdateResultDto {
    private LocalDateTime updatedAt;

    public ViewHistoryUpdateResultDto(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
