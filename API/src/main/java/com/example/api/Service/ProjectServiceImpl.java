package com.example.api.Service;

import com.example.api.DTO.ProjectDetailsDTO;
import com.example.api.Entity.Project;
import com.example.api.Entity.Specialization_Project;
import com.example.api.Entity.Tech_Project;
import com.example.api.Repository.ProjectRepository;
import com.example.api.Repository.Specialization_ProjectRepository;
import com.example.api.Repository.Tech_ProjectRepository;
import com.example.api.Service.IService.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired ProjectRepository projectRepository;
    @Autowired Specialization_ProjectRepository specializationProjectRepository;
    @Autowired Tech_ProjectRepository techProjectRepository;



    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }


    @Override
    public List<Specialization_Project> getAllSpecializationProjects() {
        return specializationProjectRepository.findAll();
    }
    @Override
    public List<Tech_Project> getAllTechProjects() {
        return techProjectRepository.findAll();
    }


    @Override
    public ProjectDetailsDTO getProjectDetailsById(UUID projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            List<Specialization_Project> specializationProjects = project.getSpecialization_project();
            List<Tech_Project> techProjects = project.getTech_projects();
            return new ProjectDetailsDTO(project, specializationProjects, techProjects);
        } else {
            // Xử lý trường hợp không tìm thấy Project
            return null;
        }
    }
}
