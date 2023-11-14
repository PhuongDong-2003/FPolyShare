package com.example.api.Service;

import com.example.api.Entity.User;
import com.example.api.Repository.UserRepository;
import com.example.api.Service.IService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

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
        // You can add validation logic here if needed
        if(user != null){
            return userRepository.save(user);
        }
        return null;
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
}
