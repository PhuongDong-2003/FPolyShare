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
    Optional<User> findUserByEmail(String email);
    @Query("SELECT u FROM User u inner join Major m on u.major.id = m.id where  m.name LIKE %:major%")
    List<User> findByMajor(@Param("major") String major);

    @Query("select  distinct major from User")
    List<String> getAllMarjor();

    @Query("SELECT u FROM User u " +
            "JOIN u.roles r " +
            "WHERE u.major = :major AND r.name = 'Censor'")
    List<User> findByMajorWithRole(@Param("major") String major);
}
