package com.example.api.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Project")
@Builder(toBuilder = true)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title", columnDefinition = "nvarchar(255)", nullable = false)
    private String title;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "isPublic", nullable = false)
    private Boolean isPublic;

    @Column(name = "videoPath", nullable = false)
    private String videoPath;

    @Column(name = "sourcePath", nullable = false)
    private String sourcePath;

    @Column(name = "thumnail", nullable = false)
    private String thumnail;

    @OneToOne(mappedBy = "projectds",cascade = CascadeType.ALL)
    private Description description;

    @OneToOne(mappedBy = "projectfb",cascade = CascadeType.ALL)
    private FeedBack feedback;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User userst;

    @ManyToOne
    @JoinColumn(name = "censor_id")
    private User usercs;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Specialization_Project> specialization_project;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<Tech_Project> tech_projects;
}
