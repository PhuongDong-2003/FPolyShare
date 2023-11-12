package com.example.api.Repository;

import com.example.api.Entity.User_Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface User_RoleRepository extends JpaRepository<User_Role, UUID> {
}
