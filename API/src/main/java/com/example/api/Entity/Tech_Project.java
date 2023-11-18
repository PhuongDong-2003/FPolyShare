package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Tech_Project")
@Builder(toBuilder = true)
public class Tech_Project  {

//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(name = "id")
//    private UUID id;
    @Id
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @Id
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tech_id")
    private Tech tech;
}
