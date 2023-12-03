package com.example.api.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title", columnDefinition = "nvarchar(255)", nullable = false)
    private String title;

    @Column(name = "status")
    private String status;

    @Column(name = "isPublic", nullable = false)
    private Boolean isPublic;

    @Column(name = "videoPath", nullable = false)
    private String videoPath;

    @Column(name = "sourcePath", nullable = false)
    private String sourcePath;

    @Column(name = "thumnail", nullable = false)
    private String thumnail;

    @Column(name = "major", columnDefinition = "nvarchar(255)", nullable = false)
    private String major;

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

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "tech_project", joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id", referencedColumnName = "id"))
    private Collection<Tech> techs = new HashSet<>();


    public void addTech(Tech tech) {
        if (!techs.contains(tech)) {
            techs.add(tech);
        }
    }
}
