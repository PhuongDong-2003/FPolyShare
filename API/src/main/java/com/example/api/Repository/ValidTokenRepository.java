package com.example.api.Repository;

import com.example.api.Entity.ValidToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ValidTokenRepository extends JpaRepository<ValidToken, UUID> {

    Optional<ValidToken> findValidTokenByToken(String token);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM valid_tokens WHERE user_id like ?1", nativeQuery = true)
    void deleteTokenByUserId(UUID user_id);
}

