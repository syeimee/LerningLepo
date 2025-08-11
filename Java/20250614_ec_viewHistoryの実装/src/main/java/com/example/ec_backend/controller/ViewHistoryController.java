package com.example.ec_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ec_backend.dto.ApiResponseDto;
import com.example.ec_backend.dto.ViewHistoryRequestDto;
import com.example.ec_backend.dto.ViewHistoryResponseDto;
import com.example.ec_backend.dto.ViewHistoryUpdateResultDto;
import com.example.ec_backend.exception.UserNotFoundException;
import com.example.ec_backend.service.ViewHistoryService;
import com.example.ec_backend.util.ErrorCode;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



/**
 * ユーザーの閲覧履歴を取得・更新するための REST API コントローラー。
 */
@RestController
@RequestMapping("/api/view/history")
public class ViewHistoryController {

    private final Logger logger = LoggerFactory.getLogger(ViewHistoryController.class);
    private final ViewHistoryService viewHistoryService;

    public ViewHistoryController(ViewHistoryService viewHistoryService) {
        this.viewHistoryService = viewHistoryService;
    }

    /**
     * ユーザーの閲覧履歴を取得する
     * @param userId 閲覧履歴を取得する対象ユーザーID
     * @return
     */
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<ViewHistoryResponseDto>>> getViewHistory(@RequestParam int userId) {

        //主処理
        try{
            List<ViewHistoryResponseDto> viewHistoryResponse = viewHistoryService.findUserViewHisotry(userId);
            ApiResponseDto<List<ViewHistoryResponseDto>> response = new ApiResponseDto<>(
                ErrorCode.SUCCESS.getCode(),
                ErrorCode.SUCCESS.getMessage(),
                viewHistoryResponse
            );
            return ResponseEntity.ok(response);
        }catch (UserNotFoundException e) {
            logger.error("User not found with id: {}", userId, e);
            return createErrorResponse(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }catch(Exception e){
            logger.error(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), e);
            return createErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * 商品閲覧時の閲覧日時の更新を行う
     * @param request
     * @return
     */
    @PostMapping("/update")
    public ResponseEntity<ApiResponseDto<ViewHistoryUpdateResultDto>> updateViewHistory(@RequestBody ViewHistoryRequestDto request) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Tokyo"));
        try{
            viewHistoryService.updateUserViewHistory(request.getUserId(),request.getProductId(),now);
            ViewHistoryUpdateResultDto result = new ViewHistoryUpdateResultDto(now);
            ApiResponseDto<ViewHistoryUpdateResultDto> response = new ApiResponseDto<>(
                ErrorCode.SUCCESS.getCode(),
                ErrorCode.SUCCESS.getMessage(),
                result
            );
            return ResponseEntity.ok(response);
        }catch(Exception e){
            logger.error("閲覧履歴の更新に失敗しました", e);
            return createErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * エラーレスポンスを作成。
     *
     * @param code エラーコード
     * @param status HTTP ステータスコード
     * @return エラーレスポンスを格納した ResponseEntity オブジェクトを返します。
     */
    private <T> ResponseEntity<ApiResponseDto<T>> createErrorResponse(ErrorCode code, HttpStatus status) {
        ApiResponseDto<T> errorResponse = new ApiResponseDto<>(code.getCode(), code.getMessage());
        return ResponseEntity.status(status).body(errorResponse);
    }
}