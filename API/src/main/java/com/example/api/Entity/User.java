package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "fullname", columnDefinition = "nvarchar(255)", nullable = false)
    private String fullname;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mssv", nullable = false)
    private String mssv;

    @Column(name = "avatar")
    private String avatar;

    @ManyToOne
    @JoinColumn(name = "major_id")
    private  Major major;

    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL, orphanRemoval = true )
    @JsonIgnore
    private List<Project> projectst;

    @OneToMany(mappedBy = "censor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Project> projectcs;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
//    private List<User_Role> user_roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Notification> notification;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();


//    @OneToMany(mappedBy = "user")
//    @JsonIgnore
//    private List<Notification> notification;




}
