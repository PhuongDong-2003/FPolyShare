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
@Table(name = "Major")
public class Major {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", columnDefinition = "nvarchar(255)")
    private  String name;

    @OneToMany(mappedBy = "major",cascade = CascadeType.ALL, orphanRemoval = true )
    @JsonIgnore
    private List<User> users;
}
