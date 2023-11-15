package com.example.api.Service.IService;

import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;

import java.util.List;
import java.util.UUID;

public interface ProjectService {

    public Specialization getSpecializationById(UUID id);
    public Project getSProjectById(UUID id);
    List<Project> getAllProjects();
    public Project getProjectDetailsById(UUID projectId);
    public List<Project> findProjectsByUsercsId(String userId);
    public Project mapProjectDTOtoProject(ProjectDTO projectDTO);
    public  Description mapProjectDTOtoDescription(ProjectDTO projectDTO);

    public Specialization mapProjectDTOSpecialization(ProjectDTO projectDTO);
    public Project CreateProject (ProjectDTO projectDTO);

}
