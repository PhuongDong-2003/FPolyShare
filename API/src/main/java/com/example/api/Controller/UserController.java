package com.example.api.Controller;

import com.example.api.Entity.Project;
import com.example.api.Entity.Role;
import com.example.api.Entity.User;

import com.example.api.Response.ApiResponse;
import com.example.api.Response.ResponseError;
import com.example.api.Service.UserService;
import com.example.api.Service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;
//
//    @Autowired
//    RoleService roleService;

//    @PostMapping (consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        User createdUser = userService.createUser(user);
//        return new ResponseEntity<>(createdUser, HttpStatus.OK);
//    }
//
//    @GetMapping (consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<User>> getAllUsers() {
//        List<User> users = userService.getAllUsers();
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }
//
//    @GetMapping(value = "/{userID}" ,consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<User> getUserById(@PathVariable("userID") UUID userID) {
//        User user = userService.getUserById(userID);
//        if (user != null) {
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//
//
//    @PostMapping("/find-by-major/{major}")
//    public List<User> findByMajor(@PathVariable("major") String major){
//        return userService.findByMajor(major);
//    }
        @GetMapping("/getAllMajor")
        public ResponseEntity<ApiResponse<?>> GetTechName() {
            List<String> marjor = userService.getAllMarjor();
            if(marjor !=null)
            {
                return ResponseEntity.ok(new ApiResponse<List<String>>("Load dữ liệu thành công", marjor));
            }
            else
            {

                return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Load dữ liệu thành công", new ResponseError("Không có dữ liệu ")));
            }

        }


    @GetMapping(value ={"/findByMarjor/{major}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByMajor(@PathVariable String major) {
        List<User> users = userService.findByMajorWithRole(major);
        if(!users.isEmpty())
        {
            return ResponseEntity.ok(new ApiResponse< List<User>>("Tìm kếm thành công", users));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm không thành công", new ResponseError("Không có user nào có"+ major)));
        }
    }
}
