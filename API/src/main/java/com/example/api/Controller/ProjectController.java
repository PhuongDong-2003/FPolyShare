package com.example.api.Controller;

import com.example.api.DTO.ProjectDTO;
import com.example.api.DTO.RequestDTO;
import com.example.api.DTO.UpdateProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Response.ApiResponse;
import com.example.api.Response.ResponseError;
import com.example.api.Service.ProjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    ProjectServiceImpl projectServiceImpl;
    @GetMapping( consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> getAllProjects() {
        List<ProjectDTO> projects = projectServiceImpl.getAllProjects();

        if(!projects.isEmpty())
        {
            return ResponseEntity.ok(new ApiResponse<List<ProjectDTO>>("Tải project thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải  project không thành công", new ResponseError("Không có project nào")));
        }
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<?>> getProjectById(@PathVariable String projectId) {
        ProjectDTO projectDTO = projectServiceImpl.getProjectById(projectId);
        if(projectDTO !=null)
        {
            return ResponseEntity.ok(new ApiResponse<ProjectDTO>("Tải project thành công", projectDTO));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tải  project không thành công", new ResponseError("Không có project nào có id "+projectId)));
        }
    }

    @GetMapping(value ={"/auth"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> GetProjectsAcByUsercsId(@RequestParam(required = false) String status) {
        if(status !=null)
        {
            List<ProjectDTO> projects = projectServiceImpl.findByProject_UserId(status);
            if(!projects.isEmpty())
            {
                return ResponseEntity.ok(new ApiResponse<List<ProjectDTO>>("Tải project thành công", projects));
            }
            else
            {

                return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Lỗi", new ResponseError("Không có project nào")));
            }
        }
        else
        {
            List<ProjectDTO> projects = projectServiceImpl.findByProject();
            if(!projects.isEmpty())
            {
                return ResponseEntity.ok(new ApiResponse<List<ProjectDTO>>("Tải project thành công", projects));
            }
            else
            {

                return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Lỗi", new ResponseError("Không có project nào")));
            }
        }

    }


    @GetMapping(value ={"/keyword"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByKeyWord(@RequestParam String keyWord) {
        List<ProjectDTO> projects = projectServiceImpl.findByKeyWord(keyWord);
        if (keyWord != null  && !keyWord.isEmpty() ) {
            return ResponseEntity.ok(new ApiResponse<List<ProjectDTO>>("Tìm kiếm thành công", projects));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc "+keyWord)));
        }

    }

    @GetMapping(value ={"/censor"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> FindByProjectCensor() {
        List<ProjectDTO > projects = projectServiceImpl.FindByProjectCensor();
        if (projects !=null ) {
            return ResponseEntity.ok(new ApiResponse<List<ProjectDTO>>("Tìm kiếm thành công", projects));
        }
        else
        {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có nội dung thuộc ")));
        }

    }



    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> CreateProject(@RequestBody Project project) {

        Project projectresult = projectServiceImpl.CreateProject(project);

        if (project != null) {
            return ResponseEntity.ok(new ApiResponse<Project>("Thêm sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Thêm sản phẩm không thành công", new ResponseError("Sản phẩm chưa được thêm vào")));
        }

    }

    @PutMapping( consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateAccessProject(@RequestBody UpdateProjectDTO updateProjectDTO) {
        ProjectDTO projectresult = projectServiceImpl.UpdateProject(updateProjectDTO);

        if (updateProjectDTO != null) {
            return ResponseEntity.ok(new ApiResponse<ProjectDTO>("Cập nhật sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Cập nhật phẩm không thành công", new ResponseError("Sản phẩm chưa được cập nhật")));
        }

    }


    @PutMapping(value ={"/isPulic"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<?>> UpdateisPublicProject(@RequestBody RequestDTO requestDTO) {

        ProjectDTO projectresult = projectServiceImpl.updateIsPublic(requestDTO);

        if (projectresult != null) {
            return ResponseEntity.ok(new ApiResponse<ProjectDTO>("Cập nhật sản phẩm thành công", projectresult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Cập nhật phẩm không thành công", new ResponseError("Sản phẩm chưa được cập nhật")));
        }

    }
    @DeleteMapping(consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> DeleteProject(@RequestParam String projectId) {
       projectServiceImpl.getProjectDetailsById(projectId);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @GetMapping(value ={"/report"}, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity FindByKeyWord(@RequestParam Date date) {
        Integer count = projectServiceImpl.CountProject(date);
        if (date != null   ) {
            return ResponseEntity.ok("Tải thàn công");
        }
        else
        {
            return ResponseEntity.badRequest().body("Tham số không hợp lệ");
        }

    }

}
