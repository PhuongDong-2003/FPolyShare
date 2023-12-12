package com.example.api.Service;

import com.example.api.DTO.FeedbackRequestDTO;
import com.example.api.DTO.ReplyProject;
import com.example.api.Entity.FeedBack;
import com.example.api.Entity.Project;
import com.example.api.Repository.FeedBackRepository;
import com.example.api.Repository.ProjectRepository;
import com.example.api.Service.IService.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;

@Service
public class FeedBackServiceImpl implements FeedBackService {

    @Autowired
    FeedBackRepository feedBackRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public FeedBack CreateFeedBack(FeedbackRequestDTO feedbackRequestDTO) {
        FeedBack feedbackResult =null;
        Project existingProject = projectRepository.findById(feedbackRequestDTO.getProject_id()).orElse(null);
        if (feedbackRequestDTO.getContent() != null)
        {

            if (existingProject != null) {
                FeedBack feedBack = new FeedBack();
                feedBack.setContent(feedbackRequestDTO.getContent());
                feedBack.setProject(existingProject);
                existingProject.setStatus("DENIED");
                existingProject.setFeedback(feedBack);
                projectRepository.save(existingProject);
                feedbackResult = feedBackRepository.save(feedBack);
            }
            else
            {

                return null;
            }
        }
        else
        {
            if (existingProject != null) {
                Date currentDate = new Date();
                existingProject.setStatus("DENIED");
                existingProject.setStatus("APPROVE");
                existingProject.getDescription().setApprovalDate(currentDate);
                projectRepository.save(existingProject);
            }
        }
        return feedbackResult;
    }

    @Override
    public FeedBack FindByFeedBackProjectID(String projectID) {
        return feedBackRepository.FindByFeedBackProjectID(UUID.fromString(projectID));
    }


}
