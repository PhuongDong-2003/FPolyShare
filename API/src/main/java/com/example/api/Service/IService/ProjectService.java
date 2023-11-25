package com.example.api.Service.IService;

import com.example.api.DTO.Request;
import com.example.api.Entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface ProjectService {


    public Project getSProjectById(UUID id);

    List<Project> getAllProjects();

    List<String> getAlTechName();

    public Project getProjectDetailsById(UUID projectId);

    public List<Project> findProjectsAC_UserId(UUID userId);

    List<Project> findByProject_UserId( UUID userId);

    List<Project> findByKeyWord( String keyWord);

    public Project CreateProject(Project project);

    public Project UpdateProjectAccess(Project updatedProject);

    public Project UpdateProjectNotAccess(Project updatedProject);

    public List<Project> FindByProjectWait(UUID id);

    public List<Project> FindByProjectProcessed(UUID id);

    public FeedBack FindByFeedBackProjectID( UUID projectID);

    Project updateIsPublic(Request request);
//    public void DeleteProjectId(UUID projectID);
//
//    public FeedBack CreateFeedback( FeedBackDTO feedBackDTO);

}
