package com.smsvari.in.repository;

import com.smsvari.in.entity.PasswordResetOtp;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, UUID> {

    Optional<PasswordResetOtp> findTopByEmailOrderByExpiryTimeDesc(
            String email);
}
