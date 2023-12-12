package com.example.api.Service;

import com.example.api.DTO.AuthDTO;
import com.example.api.DTO.UserResponseDTO;
import com.example.api.Entity.Role;
import com.example.api.Entity.User;

//import com.example.api.Entity.User_Role;
import com.example.api.Entity.ValidToken;
import com.example.api.Exception.*;

import com.example.api.Repository.RoleRepository;
import com.example.api.Repository.UserRepository;
//import com.example.api.Repository.User_RoleRepository;

import com.example.api.Repository.ValidTokenRepository;
import com.example.api.Security.JwtGenerator;
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

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    ValidTokenRepository validTokenRepository;


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
        Role role =roleRepository.findByName("STUDENT").get();
//        user.setRoles();
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

    public UserResponseDTO login(AuthDTO authDTO) throws AuthException {
        Optional<User> optional = userRepository.findUserByEmail(authDTO.getEmail());

        if (optional.isPresent()) {
            User user = optional.get();
            if (authDTO.getPassword().equals(user.getPassword())) {
                ValidToken validToken = ValidToken
                        .builder()
                        .user(user)
                        .token(jwtGenerator.generateToken(user.getEmail()))
                        .createAt(new Date())
                        .build();
                ValidToken savedToken = validTokenRepository.save(validToken);
                return UserResponseDTO
                        .builder()
                        .access_token("Bearer " + savedToken.getToken())
                        .user(user)
                        .build();
            } else {
                Map<String, String> mapError = new HashMap<>();
                mapError.put("password", "Password không chính xác");
                throw new AuthException(mapError);
            }
        } else {
            Map<String, String> mapError = new HashMap<>();
            mapError.put("email", "Email không chính xác");
            throw new AuthException(mapError);
        }
    }
    public void logout(String email) throws NotFoundException {
        Optional<User> userOptional = userRepository.findUserByEmail(email);

        if (userOptional.isEmpty()) {
            throw new NotFoundException("Người dùng chưa được xác thực");
        } else {
            User user = userOptional.get();
            validTokenRepository.deleteTokenByUserId(user.getId());
        }
    }

}
