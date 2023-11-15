package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "fullname", columnDefinition = "nvarchar(255)")
    private String fullname;



    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "mssv")
    private String mssv;

    @Column(name = "major",  columnDefinition = "nvarchar(255)")
    private String major;

    @Column(name = "avatar")
    private String avatar;

    @OneToMany(mappedBy = "userst")
    @JsonIgnore
    private List<Project> projectst;

    @OneToMany(mappedBy = "usercs")
    @JsonIgnore
    private List<Project> projectcs;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<User_Role> user_roles;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Notification> notification;



}
