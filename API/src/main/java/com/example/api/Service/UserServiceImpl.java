package com.example.api.Service;

import com.example.api.Entity.User;
import com.example.api.Exception.AppException;
import com.example.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

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

        if (user != null && (!userRepository.existsByMssv(user.getMssv()) || !userRepository.existsByUsername(user.getUsername()))  ) {
            // Kiểm tra các ràng buộc khác nếu cần thiết
            if(user.getUsername().isEmpty() || user.getPassword().isEmpty() || user.getFullname().isEmpty()
            || user.getMajor().isEmpty() || user.getMssv().isEmpty() || user.getEmail().isEmpty()) {
                throw new AppException("Không thể tạo người dùng. Thông tin người dùng không được để trống.");
            }
                // Thêm người dùng mới vào repository
                return userRepository.save(user);
        } else {
            throw new AppException("Không thể tạo người dùng. Người dùng đã tồn tại.");
        }
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
