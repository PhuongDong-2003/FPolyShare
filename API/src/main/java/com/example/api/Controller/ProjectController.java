package com.example.api.Controller;

import com.example.api.DTO.FeedBackDTO;
import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.ProjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK, projects));
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable UUID projectId) {
        Project project = projectServiceImpl.getProjectDetailsById(projectId);
        if (project != null ) {
            return new ResponseEntity<>();
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Create project failed");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value ={"/projectAcbyUsercs/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> GetProjectsAcByUsercsId(@PathVariable UUID userId) {
        List<Project> projects = projectServiceImpl.findProjectsAC_UserId(userId);
        if (userId != null ) {
            ApiResponse apiResponse = new ApiResponse("success", projects, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value ={"/projectbyUsercs/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> GetProjectsbyUsercs(@PathVariable UUID userId) {
        List<Project> projects = projectServiceImpl.findByProject_UserId(userId);
        if (userId != null ) {
            ApiResponse apiResponse = new ApiResponse("success", projects, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(value ={"/bykeyword/{keyWord}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> FindByKeyWord(@PathVariable String keyWord) {
        List<Project> projects = projectServiceImpl.findByKeyWord(keyWord);
        if (keyWord != null  && !keyWord.isEmpty() ) {
            ApiResponse apiResponse = new ApiResponse("success", projects, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else
        {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(value ={"/createproject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> CreateProject(@RequestBody ProjectDTO projectDTO) {

        Project project = projectServiceImpl.CreateProject(projectDTO);

        if (project != null ) {
            ApiResponse apiResponse = new ApiResponse("success", project, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else
        {
            ApiResponse apiResponse = new ApiResponse("error", null, "Project not found");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }

    }
    @PostMapping(value ={"/createfeedback"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> CreateFeedBack(@RequestBody FeedBackDTO feedbackDTO) {

        FeedBack feedBack= projectServiceImpl.CreateFeedback(feedbackDTO);

        if (feedBack != null ) {
            ApiResponse apiResponse = new ApiResponse("success", feedBack, null);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else
        {
            ApiResponse apiResponse = new ApiResponse("error", null, "Create FeeBack Failed");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping(value ={"/deletedporject/{projectId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> DeleteProject(@PathVariable UUID projectId) {

       projectServiceImpl.DeleteProjectId(projectId);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);



    }
}
