package com.smsvari.in.repository;

import com.smsvari.in.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUuid(String uuid);     // needed by refresh-token flow
    boolean existsByEmail(String email);
}