package com.example.api.Service.IService;

import com.example.api.DTO.AuthDTO;
import com.example.api.DTO.UserResponseDTO;
import com.example.api.Entity.Role;
import com.example.api.Entity.User;
import com.example.api.Exception.AuthException;
import com.example.api.Exception.NotFoundException;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(UUID userId);
    User createUser(User user);
    User updateUser(UUID userId, User user);
    void deleteUser(UUID userId);

    User findByName(String name);

    List<User> findByMajor(String major);

    Collection<Role> getUserRoles(UUID userId);


    List<String> getAllMarjor();

    List<User> findByMajorWithRole(@Param("major") String major);

    public UserResponseDTO login(AuthDTO authDTO) throws AuthException;

    public void logout(String email) throws NotFoundException;

}
