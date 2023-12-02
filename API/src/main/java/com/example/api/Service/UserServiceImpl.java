package com.example.api.Service;

import com.example.api.Entity.Role;
import com.example.api.Entity.User;

//import com.example.api.Entity.User_Role;
import com.example.api.Exception.AppException;

import com.example.api.Exception.UserAlreadyExistException;
import com.example.api.Exception.UserNotFoundException;
import com.example.api.Repository.RoleRepository;
import com.example.api.Repository.UserRepository;
//import com.example.api.Repository.User_RoleRepository;

import com.example.api.Service.IService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public List<String> getAllMarjor() {
        return userRepository.getAllMarjor();
    }



    public List<User> findByMajorWithRole(@Param("major") String major)
    {
        return userRepository.findByMajorWithRole(major);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(UUID userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
    }

    @Override
    public User createUser(User user) {

        Optional<User> checkUser = userRepository.findByUsername(user.getUsername());
        if(checkUser.isPresent()){
            throw new UserAlreadyExistException(user.getUsername() + "User already exist");
        }
        Role role =roleRepository.findByName("Student").get();
        user.setRoles(Collections.singletonList(role));
        return userRepository.save(user);


    }

    @Override
    public User updateUser(UUID userId, User user) {
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser != null) {
            if(user.getUsername() != null){
                existingUser.setUsername(user.getUsername());
            }
            if(user.getPassword() != null){
                existingUser.setPassword(user.getPassword());
            }
            if(user.getEmail() != null){
                existingUser.setEmail(user.getEmail());
            }
            if(user.getFullname() != null){
                existingUser.setFullname(user.getFullname());
            }
            if(user.getMajor() != null){
                existingUser.setMajor(user.getMajor());
            }
            if(user.getAvatar() != null){
                existingUser.setAvatar(user.getAvatar());
            }
            if(user.getMssv() != null){
                existingUser.setMssv(user.getMssv());
            }

            return userRepository.save(existingUser);
        }
        throw new UserNotFoundException("Không tìm thấy người dùng với Id: " + userId);
    }

    @Override
    public void deleteUser(UUID userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            userRepository.deleteById(userId);
        }else {
            throw  new UserNotFoundException("Không tìm thấy người dùng với Id: " + userId);
        }
    }

    @Override
    public User findByName(String name) {
        return userRepository.findByUsername(name).get();
    }

    @Override
    public Collection<Role> getUserRoles(UUID userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getRoles(); // Assuming there's a method in User entity to get roles
        }
        return Collections.emptyList();
    }
    @Override
    public List<User> findByMajor(String major) {
        List<User> users = userRepository.findByMajor(major);
        if(users.isEmpty()){
            throw new UserNotFoundException("No users found with major: " + major);
        }
        return users;
    }

}
