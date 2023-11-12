package com.example.api.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "mssv")
    private String mssv;

    @Column(name = "major")
    private String major;

    @Column(name = "avatar")
    private String avatar;

    @OneToMany(mappedBy = "userst")
    private List<Project> projectst;

    @OneToMany(mappedBy = "usercs")
    private List<Project> projectcs;

    @OneToMany(mappedBy = "user")
    private List<User_Role> user_roles;

    @OneToMany(mappedBy = "user")
    private List<Notification> notification;



}