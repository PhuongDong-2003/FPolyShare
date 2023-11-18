package com.example.api.Service.IService;

import com.example.api.DTO.FeedBackDTO;
import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProjectService {

//    public Specialization getSpecializationById(UUID id);

    public Project getSProjectById(UUID id);

    List<Project> getAllProjects();

    public Project getProjectDetailsById(UUID projectId);

    public List<Project> findProjectsAC_UserId(UUID userId);

    List<Project> findByProject_UserId( UUID userId);

    List<Project> findByKeyWord( String keyWord);

    // public Project mapProjectDTOtoProject(ProjectDTO projectDTO);

    public  Description mapProjectDTOtoDescription(ProjectDTO projectDTO);

    public Project CreateProject (ProjectDTO projectDTO);

    public void DeleteProjectId(UUID projectID);

    public FeedBack CreateFeedback( FeedBackDTO feedBackDTO);

}
