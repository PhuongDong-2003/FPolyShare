package com.example.api.DTO;

import com.example.api.Entity.Project;
import com.example.api.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectDTO {

    UUID id;
    String title;
    String status;
    boolean isPublic;
    String video;
    String source;
    String thumbnail;
    String major;
    UserDTO student;
    DescriptionDTO description;


    public static ProjectDTO MapProjectToProjectDTO(Project project) {
        UserDTO userDTO = UserDTO.builder()
                .id(project.getStudent().getId())
                .email(project.getStudent().getEmail())
                .avatar(project.getStudent().getAvatar())
                .fullname(project.getStudent().getFullname())
                .build();

        DescriptionDTO descriptionDTO = DescriptionDTO.builder()
                .create_at(project.getDescription().getCreateDate())
                .approve_at(project.getDescription().getApprovalDate())
                .censor(project.getCensor().getUsername())
                .techs(project.getTechs())
                .github(project.getDescription().getGithub())
                .like((project.getDescription().getLikeCount()))
                .view(project.getDescription().getViewCount())
                .build();


        ProjectDTO projectDTO = ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .status(project.getStatus())
                .isPublic(project.getIsPublic())
                .video(project.getVideoPath())
                .source(project.getThumnail())
                .thumbnail(project.getThumnail())
                .major(project.getStudent().getMajor().getName())
                .student(userDTO)
                .description(descriptionDTO)
                .build();
        return projectDTO;


    }



}
