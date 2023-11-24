package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.HashSet;
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

    @Column(name = "fullname", columnDefinition = "nvarchar(255)", nullable = false)
    private String fullname;



    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mssv", nullable = false)
    private String mssv;

    @Column(name = "major",  columnDefinition = "nvarchar(255)", nullable = false)
    private String major;

    @Column(name = "avatar")
    private String avatar;


    @OneToMany(mappedBy = "userst",cascade = CascadeType.ALL, orphanRemoval = true )
    @JsonIgnore
    private List<Project> projectst;

    @OneToMany(mappedBy = "usercs", cascade = CascadeType.ALL, orphanRemoval = true)
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
    private Collection<Role> roles = new HashSet<>();


//    @OneToMany(mappedBy = "user")
//    @JsonIgnore
//    private List<Notification> notification;




}
