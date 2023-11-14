package com.example.api.Controller;

import com.example.api.DTO.ProjectDetailsDTO;
import com.example.api.Entity.Project;
import com.example.api.Entity.Specialization_Project;
import com.example.api.Entity.Tech_Project;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.IService.ProjectService;
import com.example.api.Service.ProjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    ProjectServiceImpl projectServiceImpl;
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllProjects() {
        List<Project> projects = projectServiceImpl.getAllProjects();
        List<Specialization_Project> specializationProjects = projectServiceImpl.getAllSpecializationProjects();
        List<Tech_Project> techProjects = projectServiceImpl.getAllTechProjects();

        ApiResponse apiResponse = new ApiResponse("success", new ProjectDetailsDTO(projects, specializationProjects, techProjects), null);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable UUID projectId) {
        ProjectDetailsDTO projectDetailsDTO = projectServiceImpl.getProjectDetailsById(projectId);

        if (projectDetailsDTO != null) {
            ApiResponse apiResponse = new ApiResponse("success", projectDetailsDTO, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
}
