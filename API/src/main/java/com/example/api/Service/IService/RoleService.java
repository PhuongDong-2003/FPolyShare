package com.example.api.Service.IService;

import com.example.api.Entity.Role;
import com.example.api.Entity.User;

import java.util.List;
import java.util.UUID;

public interface RoleService {
    List<Role> getAllRole();

    Role createRole(Role role);

    void deleteRole(UUID roleId);

    Role findByName(String name);

    Role findById(UUID roleId);

    User removeUserFromRole(UUID userId, UUID roleId);

    User assignUserToRole(UUID userId, UUID roleId);

    Role removeAllUserFromRole(UUID roleId);

}
