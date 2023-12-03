package com.example.api.Service.IService;

import com.example.api.DTO.Request;
import com.example.api.Entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface ProjectService {


    public Project getProjectById(String id);

    List<Project> getAllProjects();

    List<Tech> getAlTechName();

    public void getProjectDetailsById(String projectId);
    List<Project> findByProject_UserId( String userId,String status);

    List<Project> findByKeyWord( String keyWord);

    public Project CreateProject(Project project);

    public Project UpdateProject(Project updatedProject);

//    public Project UpdateProjectNotAccess(Project updatedProject);

    public List<Project> FindByProjectWait(String id);

    public List<Project> FindByProjectProcessed(String id);

    public FeedBack FindByFeedBackProjectID( String projectID);

    Project updateIsPublic(Request request);
//    public void DeleteProjectId(UUID projectID);
//
//    public FeedBack CreateFeedback( FeedBackDTO feedBackDTO);

}
