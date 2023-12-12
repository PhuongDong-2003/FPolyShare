package com.example.api.Service.IService;

import com.example.api.DTO.FeedbackRequestDTO;
import com.example.api.Entity.FeedBack;

public interface FeedBackService {

    public FeedBack CreateFeedBack(FeedbackRequestDTO feedbackRequestDTO);

    public FeedBack FindByFeedBackProjectID(String projectID);
}
