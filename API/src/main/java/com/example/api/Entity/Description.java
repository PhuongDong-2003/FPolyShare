package com.example.api.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Description")
public class Description {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "creatDate")
    private Date create_Date;

    @Column(name = "approvalDate")
    private Date approval_Date;

    @Column(name = "github")
    private String github;

    @Column(name = "viewCount")
    private Integer viewCount;

    @Column(name = "likeCount")
    private Integer likeCount;
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project projectds;
    ///edit
}
