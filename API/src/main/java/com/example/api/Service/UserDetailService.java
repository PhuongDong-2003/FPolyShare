package com.example.api.Service;


import com.example.api.DTO.UserDetailDTO;
import com.example.api.Entity.Role;
import com.example.api.Entity.User;
import com.example.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optional = userRepository.findUserByEmail(email);

        if (optional.isPresent()) {
            User user = optional.get();
            return UserDetailDTO.builder()
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .authorities(mapRolesToAuthorities(user.getRoles()))
                    .build();
        }

        return null;
    }

    public Collection<GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
    }
}
