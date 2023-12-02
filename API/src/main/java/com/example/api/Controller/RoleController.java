package com.example.api.Controller;

import com.example.api.Entity.Role;
import com.example.api.Entity.User;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.IService.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping()
    public ResponseEntity<ApiResponse<?>> getAllRole(){
        return ResponseEntity.ok(new ApiResponse<List<Role>>("Tìm thành công!", roleService.getAllRole()));
    }
//
//    @PostMapping()
//    public ResponseEntity<Role> createRole(@RequestBody Role role){
//        return new ResponseEntity<>(roleService.createRole(role), CREATED);
//    }

    @PostMapping()
    public ResponseEntity<ApiResponse<Role>> createRole(@RequestBody Role role){
//        return new ResponseEntity<>(roleService.createRole(role), CREATED);
        return ResponseEntity.ok(new ApiResponse<>("Tạo thành công", roleService.createRole(role)));
    }


    @DeleteMapping("{id}")
    public void deleteRole(@PathVariable("id") UUID roleId ){
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-user-from-role/{id}")
    public Role removeAllUserFromRole(@PathVariable("id") UUID roleId){
        return roleService.removeAllUserFromRole(roleId);
    }

    @PostMapping(value = "/remove-user-from-role" ,consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public User removeUserFromRole(@RequestParam("userId") UUID userId, @RequestParam("roleId") UUID roleId){
        return roleService.removeUserFromRole(userId, roleId);
    }


    @PostMapping(value = "/assign-user-from-role",consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public User assignUserFromRole(@RequestParam("userId") UUID userId, @RequestParam("roleId") UUID roleId){
        return roleService.assignUserToRole(userId, roleId);
    }
}

