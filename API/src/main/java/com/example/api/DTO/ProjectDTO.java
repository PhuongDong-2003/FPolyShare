package com.example.api.DTO;

import com.example.api.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    FeedBack feedBack;

    User userst;

    User usercs;

 
    List<Tech_Project> techDTOList;




}
