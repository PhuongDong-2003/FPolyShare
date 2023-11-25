package com.example.api.Service;

import com.example.api.Entity.User;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(UUID userId);
    User createUser(User user);
    User updateUser(UUID userId, User user);
    void deleteUser(UUID userId);
    public List<User> findByMajor(String major);

    List<String> getAllMarjor();

    List<User> findByMajorWithRole(@Param("major") String major);

}
