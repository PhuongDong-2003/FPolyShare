package com.example.api.Service.IService;

import com.example.api.DTO.ProjectDetailsDTO;
import com.example.api.Entity.Project;
import com.example.api.Entity.Specialization_Project;
import com.example.api.Entity.Tech_Project;

import java.util.List;
import java.util.UUID;

public interface ProjectService {
    List<Project> getAllProjects();

    List<Specialization_Project> getAllSpecializationProjects();
    List<Tech_Project> getAllTechProjects();
    public ProjectDetailsDTO getProjectDetailsById(UUID projectId);
}
