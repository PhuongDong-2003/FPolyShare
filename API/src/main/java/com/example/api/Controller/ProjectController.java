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

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải không project thành công", new ResponseError("Không có project nào")));
        }
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<?>> getProjectById(@PathVariable UUID projectId) {
        Project project = projectServiceImpl.getProjectDetailsById(projectId);
        if(project !=null)
        {
            return ResponseEntity.ok(new ApiResponse<Project>("Tìm kiếm thành công", project));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có project nào có id "+projectId)));
        }

    }



    @GetMapping(value ={"/projectAcbyUsercs/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> GetProjectsAcByUsercsId(@PathVariable UUID userId) {
        List<Project> projects = projectServiceImpl.findProjectsAC_UserId(userId);
        if(!projects.isEmpty())
        {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tải project thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải không project thành công", new ResponseError("Không có project nào")));
        }
    }

    @GetMapping(value ={"/projectbyUsercs/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> GetProjectsbyUsercs(@PathVariable UUID userId) {
        List<Project> projects = projectServiceImpl.findByProject_UserId(userId);
        if (userId != null ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm project thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm không project thành công", new ResponseError("Không có project nào có userId "+userId)));
        }

    }

    @GetMapping(value ={"/bykeyword/{keyWord}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByKeyWord(@PathVariable String keyWord) {
        List<Project> projects = projectServiceImpl.findByKeyWord(keyWord);
        if (keyWord != null  && !keyWord.isEmpty() ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+keyWord)));
        }

    }

    @GetMapping(value ={"/ProjectWait/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByProjectWait(@PathVariable UUID userId) {
        List<Project > projects = projectServiceImpl.FindByProjectWait(userId);
        if (userId !=null ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+userId)));
        }

    }

    @GetMapping(value ={"/ProjectProcessed/{userId}"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByProjectProcessed(@PathVariable UUID userId) {
        List<Project > projects = projectServiceImpl.FindByProjectProcessed(userId);
        if (userId !=null ) {
            return ResponseEntity.ok(new ApiResponse<List<Project>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+userId)));
        }

    }

    @GetMapping("/byfeedBackProjectId/{projectId}")
    public ResponseEntity<ApiResponse<?>> GetByFeeback(@PathVariable UUID projectId) {
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
    @PostMapping(value ={"/createproject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> CreateProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.CreateProject(project);

        if (project != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Thêm sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Thêm sản phẩm không thành công", new ResponseError("Sản phẩm chưa được thêm vào")));
        }

    }

    @PutMapping(value ={"/updateAccessproject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateAccessProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.UpdateProjectAccess(project);

        if (project != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Cập nhật sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Cập nhật phẩm không thành công", new ResponseError("Sản phẩm chưa được cập nhật")));
        }

    }

    @PutMapping(value ={"/updateNotAccessproject"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateNotAccessProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.UpdateProjectNotAccess(project);

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

    @DeleteMapping(value ={"/deletedporject/{projectId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> DeleteProject(@PathVariable UUID projectId) {
       projectServiceImpl.getProjectDetailsById(projectId);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);



    }


}
