package com.smsvari.in.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Persisted record of an issued refresh token, stored as a hash (never the
 * raw JWT — same principle as {@link PasswordResetOtp}). Lets us revoke a
 * specific session (logout) or all sessions for a user (logout-all /
 * security incident) without waiting for the token's natural expiry.
 */
@Entity
@Table(
        name = "refresh_tokens",
        indexes = {
                @Index(name = "idx_refresh_token_hash", columnList = "tokenHash"),
                @Index(name = "idx_refresh_token_user_uuid", columnList = "userUuid")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** UUID of the owning {@link User}. Not a FK object on purpose — keeps this lean. */
    @Column(nullable = false, length = 36)
    private String userUuid;

    /** SHA-256 hash of the raw refresh token JWT. The raw token is never stored. */
    @Column(nullable = false, length = 64, unique = true)
    private String tokenHash;

    @Column(nullable = false)
    private Boolean revoked;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime revokedAt;

    @PrePersist
    public void prePersist() {
        if (revoked == null) {
            revoked = false;
        }
        createdAt = LocalDateTime.now();
    }
}