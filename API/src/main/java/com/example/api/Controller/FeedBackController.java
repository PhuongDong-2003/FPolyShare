package com.example.api.Controller;


import com.example.api.DTO.FeedbackRequestDTO;
import com.example.api.Entity.FeedBack;
import com.example.api.Entity.Project;
import com.example.api.Response.ApiResponse;
import com.example.api.Response.ResponseError;
import com.example.api.Service.FeedBackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedBackController {
    @Autowired
    FeedBackServiceImpl feedBackServiceImpl;
    @PostMapping
    public ResponseEntity<ApiResponse<?>> CreateProject(@RequestBody FeedbackRequestDTO feedbackRequestDTO) {

        FeedBack feedBackResult = feedBackServiceImpl.CreateFeedBack(feedbackRequestDTO);

        if (feedBackResult != null) {
            return ResponseEntity.ok(new ApiResponse<FeedBack>("Thêm phảm hồi thành công", feedBackResult));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Lỗi", new ResponseError("Sản phẩm chưa được thêm vào")));
        }

    }

//    @GetMapping("/byfeedback")
//    public ResponseEntity<ApiResponse<?>> GetByFeeback(@RequestParam String projectId) {
//        FeedBack feedBack = feedBackServiceImpl.FindByFeedBackProjectID(projectId);
//        if(feedBack !=null)
//        {
//            return ResponseEntity.ok(new ApiResponse<FeedBack>("Tìm kiếm thành công", feedBack));
//        }
//        else
//        {
//
//            return ResponseEntity.badRequest().body(new ApiResponse<ResponseError>("Tìm kiếm thất bại", new ResponseError("Không có project nào có id "+projectId)));
//        }
//
//    }

}
