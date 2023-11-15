package com.example.api.Controller;

import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.ProjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    @GetMapping( consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> getAllProjects() {
        List<Project> projects = projectServiceImpl.getAllProjects();
        ApiResponse apiResponse = new ApiResponse("success",  projects, null);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable UUID projectId) {
        Project project = projectServiceImpl.getProjectDetailsById(projectId);

        if (project != null ) {
            ApiResponse apiResponse = new ApiResponse("success", project, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value ={"/byUsercs/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> getProjectsByUsercsId(@PathVariable String userId) {
        List<Project> projects = projectServiceImpl.findProjectsByUsercsId(userId);
        if (userId != null && !userId.isEmpty()) {
            ApiResponse apiResponse = new ApiResponse("success", projects, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }

    }
}
