package com.example.api.Service;

import com.example.api.Entity.Role;
import com.example.api.Entity.User;
import com.example.api.Exception.RoleAlreadyExistException;
import com.example.api.Exception.UserAlreadyExistException;
import com.example.api.Exception.UserNotFoundException;
import com.example.api.Repository.RoleRepository;
import com.example.api.Repository.UserRepository;
import com.example.api.Service.IService.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

        @Override
        public Role createRole(Role role) {
            Optional<Role> checkRole = roleRepository.findByName(role.getName());
            if(checkRole.isPresent()){
                throw new RoleAlreadyExistException("Role already exist!");
            }
            return roleRepository.save(role);
        }

    @Override
    public void deleteRole(UUID roleId) {
        this.removeAllUserFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public Role findById(UUID roleId) {
        return roleRepository.findById(roleId).get();
    }

    @Override
    public User removeUserFromRole(UUID userId, UUID roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
            throw new UserNotFoundException("User not found!");
    }

    @Override
    public User assignUserToRole(UUID userId, UUID roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if(user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistException(
                    user.get().getFullname()+ " is already assigned to the " + role.get().getName() + " role");
        }
        role.ifPresent(role1 -> role1.assignUserToRole(user.get()));
        roleRepository.save(role.get());
        return user.get();
    }

    @Override
    public Role removeAllUserFromRole(UUID roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUserFromRole);
        return roleRepository.save(role.get());
    }
}
