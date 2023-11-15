package com.example.api.DTO;

import com.example.api.Entity.*;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {

    UUID id;

    String title;

    String status;

    Boolean isPublic;

    String videoPath;

    String sourcePath;

    String thumnail;

    Description description;

    Specialization specialization;

    User userst;

    User usercs;

    List<Specialization> specializations;

    List<Specialization_Project> specialization_project;




}
