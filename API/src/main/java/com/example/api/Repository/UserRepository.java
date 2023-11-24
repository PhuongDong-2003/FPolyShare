package com.example.api.Repository;

import com.example.api.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);
    Optional<User> findById(UUID id);
    @Query("SELECT u FROM User u WHERE u.major LIKE %:major%")
    List<User> findByMajor(@Param("major") String major);
}
