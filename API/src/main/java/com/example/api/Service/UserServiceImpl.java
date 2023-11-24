package com.example.api.Service;

import com.example.api.Entity.Role;
import com.example.api.Entity.User;

//import com.example.api.Entity.User_Role;
import com.example.api.Exception.AppException;

import com.example.api.Repository.RoleRepository;
import com.example.api.Repository.UserRepository;
//import com.example.api.Repository.User_RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;



//    @Autowired
//    User_RoleRepository user_roleRepository;

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
//            throw new UserAlreadyExistException(user.getUsername() + "User already exist");
        }
        Role role =roleRepository.findByName("STUDENT").get();
        user.setRoles(Collections.singletonList(role));
        return userRepository.save(user);


    }

    @Override
    public User updateUser(UUID userId, User user) {
        // Check if the user exists
        if (userRepository.existsById(userId)) {
            user.setId(userId);
            return userRepository.save(user);
        }
        return null; // or throw an exception indicating that the user does not exist
    }

    @Override
    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public List<User> findByMajor(String major) {
//        List<User> users = userRepository.findByMajor(major);
//        if(users.isEmpty()){
////            throw new UserNotFoundException("No users found with major: " + major);
//        }
      return null;
    }


}
