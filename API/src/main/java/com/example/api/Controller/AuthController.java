package com.example.api.Controller;

import com.example.api.DTO.AuthDTO;
import com.example.api.DTO.UserResponseDTO;
import com.example.api.Exception.AuthException;
import com.example.api.Exception.NotFoundException;
import com.example.api.Exception.ResponseMessage;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.IService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> login(@RequestBody AuthDTO authDTO) {
        try {
            UserResponseDTO login = userService.login(authDTO);
            return ResponseEntity.ok(new ApiResponse<>("Đăng nhập thành công", login));
        } catch (AuthException ex) {
            return ResponseEntity.status(422).body(new ApiResponse<>("Lỗi", ex.getMapError()));
        }
    }


    @DeleteMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails) {
            String email = ((UserDetails) authentication.getPrincipal()).getUsername();
            System.out.println(email);
            try {
                userService.logout(email);
                return ResponseEntity.ok(new ApiResponse<>("Đăng xuất thành công", new ResponseMessage("Đăng xuất thành công")));
            } catch (NotFoundException ex) {
                return ResponseEntity.status(401).body(new ApiResponse<>("Lỗi", new ResponseMessage(ex.getMessage())));
            }
        } else {
            return ResponseEntity.status(401).body(new ApiResponse<>("Lỗi", new ResponseMessage("Người dùng chưa được xác thực")));
        }
    }
}
