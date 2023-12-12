package com.example.api.Service.IService;

import com.example.api.DTO.ProjectDTO;
import com.example.api.DTO.RequestDTO;
import com.example.api.DTO.UpdateProjectDTO;
import com.example.api.Entity.*;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProjectService {


    public ProjectDTO getProjectById(String id);
    List<ProjectDTO> getAllProjects();

    public void getProjectDetailsById(String projectId);
    List<ProjectDTO> findByProject_UserId( String status);

    List<ProjectDTO> findByProject( );

    List<ProjectDTO> findByKeyWord( String keyWord);

    public Project CreateProject(Project project);

    public ProjectDTO UpdateProject(UpdateProjectDTO updateProjectDTO);
    public List<ProjectDTO> FindByProjectCensor();

    ProjectDTO updateIsPublic(RequestDTO requestDTO);

    public Integer CountProject(@Param("date") Date date);

    public  List<Project> TopProjectWithView();

//    public void DeleteProjectId(UUID projectID);
//
//    public FeedBack CreateFeedback( FeedBackDTO feedBackDTO);

}
