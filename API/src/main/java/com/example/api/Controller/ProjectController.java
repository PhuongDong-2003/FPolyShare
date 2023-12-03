package com.example.api.Controller;

import com.example.api.DTO.Request;
import com.example.api.Entity.*;
import com.example.api.Response.ApiResponse;
import com.example.api.Response.ResponseError;
import com.example.api.Service.ProjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    ProjectServiceImpl projectServiceImpl;
    @GetMapping( consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> getAllProjects() {
        List<Project> projects = projectServiceImpl.getAllProjects();

        if(!projects.isEmpty())
        {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tải project thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải  project không thành công", new ResponseError("Không có project nào")));
        }
    }
    @GetMapping("/getById")
    public ResponseEntity<ApiResponse<?>> getProjectById(@RequestParam String projectId) {
        Project project = projectServiceImpl.getProjectById(projectId);
        if(project !=null)
        {
            return ResponseEntity.ok(new ApiResponse<Project>("Tải project thành công", project));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải  project không thành công", new ResponseError("Không có project nào có id "+projectId)));
        }

    }

    @GetMapping(value ={"/projectUser"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> GetProjectsAcByUsercsId(@RequestParam String userId, @RequestParam String status) {
        List<Project> projects = projectServiceImpl.findByProject_UserId(userId, status);
        if(!projects.isEmpty())
        {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tải project thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải không project thành công", new ResponseError("Không có project nào")));
        }
    }


    @GetMapping(value ={"/bykeyword"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByKeyWord(@RequestParam String keyWord) {
        List<Project> projects = projectServiceImpl.findByKeyWord(keyWord);
        if (keyWord != null  && !keyWord.isEmpty() ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+keyWord)));
        }

    }

    @GetMapping(value ={"/ProjectWait"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByProjectWait(@RequestParam String userId) {
        List<Project > projects = projectServiceImpl.FindByProjectWait(userId);
        if (userId !=null ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+userId)));
        }

    }

    @GetMapping(value ={"/ProjectProcessed"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByProjectProcessed(@RequestParam String userId) {
        List<Project > projects = projectServiceImpl.FindByProjectProcessed(userId);
        if (userId !=null ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+userId)));
        }

    }

    @GetMapping("/byfeedBackProjectId")
    public ResponseEntity<ApiResponse<?>> GetByFeeback(@RequestParam String projectId) {
        FeedBack feedBack = projectServiceImpl.FindByFeedBackProjectID(projectId);
        if(feedBack !=null)
        {
            return ResponseEntity.ok(new ApiResponse<FeedBack>("Tìm kiếm thành công", feedBack));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có project nào có id "+projectId)));
        }

    }

    @GetMapping("/getTechName")
    public ResponseEntity<ApiResponse<?>> GetTechName() {
        List<Tech> tech = projectServiceImpl.getAlTechName();
        if(tech !=null)
        {
            return ResponseEntity.ok(new ApiResponse<List<Tech>>("Load dữ liệu thành công", tech));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Load dữ liệu thành công", new ResponseError("Không có dữ liệu ")));
        }

    }
    @PostMapping(value ={"/createproject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> CreateProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.CreateProject(project);

        if (project != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Thêm sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Thêm sản phẩm không thành công", new ResponseError("Sản phẩm chưa được thêm vào")));
        }

    }

    @PutMapping(value ={"/replyProject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateAccessProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.UpdateProject(project);

        if (project != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Cập nhật sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Cập nhật phẩm không thành công", new ResponseError("Sản phẩm chưa được cập nhật")));
        }

    }


    @PutMapping(value ={"/updateisPulic"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateisPublicProject(@RequestBody Request request) {

        Project projectresult = projectServiceImpl.updateIsPublic(request);

        if (projectresult != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Cập nhật sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Cập nhật phẩm không thành công", new ResponseError("Sản phẩm chưa được cập nhật")));
        }

    }
    @DeleteMapping(value ={"/deletedporject"},consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> DeleteProject(@RequestParam String projectId) {
       projectServiceImpl.getProjectDetailsById(projectId);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
