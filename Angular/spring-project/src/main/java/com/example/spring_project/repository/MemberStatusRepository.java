package com.example.spring_project.repository;


import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_project.entity.MemberStatus;

@Repository
public interface MemberStatusRepository extends JpaRepository<MemberStatus, UUID>{

    //Add findByUserId method
    Optional<MemberStatus> findByUserId(UUID userId);

}
