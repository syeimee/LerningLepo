package com.example.spring_project.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_project.dto.MemberStatusRequest;
import com.example.spring_project.dto.MemberStatusResponse;
import com.example.spring_project.service.MemberStatusService;

@RestController
@RequestMapping("/api/member-status")
public class MemberStatusController {
    private final Logger logger = LoggerFactory.getLogger(MemberStatusController.class);
    private final MemberStatusService memberStatusService;

    @Autowired
    public MemberStatusController(MemberStatusService memberStatusService) {
        this.memberStatusService = memberStatusService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<MemberStatusResponse> caluculateMemberStatus(@RequestBody MemberStatusRequest request){
        try{
            MemberStatusResponse result = memberStatusService.calurateAndUpdateMemberStatus(request.getUserId(), request.getOrderNumber());
            return ResponseEntity.ok(result);
        }catch(Exception e){
            logger.error("Error occurred while calculate member status", e);
            MemberStatusResponse errorResponse = new MemberStatusResponse(request.getUserId(), 0, "error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<MemberStatusResponse> getMemberStatu(@PathVariable UUID userId){
        try{
            MemberStatusResponse status = memberStatusService.getMemberStatus(userId);
            return ResponseEntity.ok(status);
        }catch(Exception e){
            logger.error("Error occurred while fetching member status", e);
            MemberStatusResponse errorResponse = new MemberStatusResponse(userId, 0, "error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
