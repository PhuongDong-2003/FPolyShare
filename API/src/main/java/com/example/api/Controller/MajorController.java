package com.example.api.Controller;

import com.example.api.Entity.Major;
import com.example.api.Entity.Tech;
import com.example.api.Response.ApiResponse;
import com.example.api.Response.ResponseError;
import com.example.api.Service.MajorServiceImpl;
import com.example.api.Service.TechSeviceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/majors")
public class MajorController {

    @Autowired
    MajorServiceImpl majorServiceImpl;
    @GetMapping
    public ResponseEntity<ApiResponse<?>> GetTech() {
        List<Major> majors = majorServiceImpl.getAll();
        if(majors !=null)
        {
            return ResponseEntity.ok(new ApiResponse<List<Major>>("Load dữ liệu thành công", majors));
        }
        else
        {

            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Lỗi", new ResponseError("Không có dữ liệu ")));
        }
    }
}
