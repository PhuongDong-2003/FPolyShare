package com.example.api.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "status")
    private String status;

    @Column(name = "isPublic")
    private Boolean isPublic;

    @Column(name = "videoPath")
    private String videoPath;

    @Column(name = "sourcePath")
    private String sourcePath;

    @Column(name = "thumnail")
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

    @OneToMany(mappedBy = "project")
    private List<Specialization_Project> specialization_project;


    @OneToMany(mappedBy = "project")
    private List<Tech_Project> tech_projects;
}
