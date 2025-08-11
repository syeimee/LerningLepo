package com.example.ec_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ec_backend.dto.ViewHistoryResponseDto;
import com.example.ec_backend.exception.UserNotFoundException;
import com.example.ec_backend.repository.ViewHistoryRepository;

@Service
public class ViewHistoryService {
    private final ViewHistoryRepository viewHistoryRepository;

    public ViewHistoryService(ViewHistoryRepository viewHistoryRepository) {
        this.viewHistoryRepository = viewHistoryRepository;
    }

    public List<ViewHistoryResponseDto> findUserViewHisotry(int id) {
        List<ViewHistoryResponseDto> viewHistory = viewHistoryRepository.findTop10ByUserIdOrderByViewedAtDesc(id);
        if (viewHistory == null || viewHistory.isEmpty()) {
            throw new UserNotFoundException("User not found with id:" + id);
        }
        return viewHistory;
    }

    public void updateUserViewHistory(int userId, int productId, LocalDateTime viewedAt){
        viewHistoryRepository.updateViewHistory(userId, productId, viewedAt);
}
}
