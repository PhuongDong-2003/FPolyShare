package com.example.api.Service;

import com.example.api.DTO.FeedBackDTO;
import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Exception.AppException;
import com.example.api.Repository.*;
import com.example.api.Service.IService.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService  {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    Tech_ProjectRepository techProjectRepository;
    @Autowired
    TechRepository techRepository;
    @Autowired
    DescriptionRepository descriptionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FeedBackRepository feedBackRepository;



//    @Override
//    public Specialization getSpecializationById(UUID id) {
//        return specializationRepository.findById(id).orElse(null);
//    }

    @Override
    public Project getSProjectById(UUID id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAllProject();
    }

    @Override
    public List<Project> findProjectsAC_UserId(UUID userId) {
        return projectRepository.findByProjectAC_UserId(userId);
    }

    @Override
    public List<Project> findByProject_UserId(UUID userId) {
      return  projectRepository.findByProject_UserId(userId);
    }

    @Override
    public List<Project> findByKeyWord(String keyWord) {
        return projectRepository.findByKeyWord(keyWord);
    }

    @Override
    public Project getProjectDetailsById(UUID projectId) {


        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent() ) {
            Project project = projectOptional.get();
            return  project;
        } else {
            return null;
        }
    }


   
    @Override
    public Description mapProjectDTOtoDescription(ProjectDTO projectDTO) {
       var resultProject =  getProjectDetailsById(projectDTO.getId());
      return  Description.builder()
                .id(projectDTO.getDescription().getId())
                .github(projectDTO.getDescription().getGithub())
                .create_Date(projectDTO.getDescription().getCreate_Date())
                .approval_Date(projectDTO.getDescription().getApproval_Date())
                .likeCount((projectDTO.getDescription().getLikeCount()))
                .projectds(resultProject)
                .build();
    }


    // @Override
    // public Project mapProjectDTOtoProject(ProjectDTO projectDTO) {
    //     return Project.builder()
    //             .id(projectDTO.getId())
    //             .title(projectDTO.getTitle())
    //             .status(projectDTO.getStatus())
    //             .isPublic(projectDTO.getIsPublic())
    //             .videoPath(projectDTO.getVideoPath())
    //             .sourcePath(projectDTO.getSourcePath())
    //             .thumnail(projectDTO.getThumnail())
    //             .build();
    // }

    @Override
    public Project CreateProject(ProjectDTO projectDTO) {
        User userst = null;
        User usercs = null;
        Optional<User> optionalst = userRepository.findById(projectDTO.getUserst().getId());
        Optional<User> optionalcs = userRepository.findById(projectDTO.getUsercs().getId());

        if (optionalst.isPresent() && optionalcs.isPresent()) {
            userst = optionalst.get();
            usercs = optionalcs.get();
        } else {
            throw new AppException("User not exist");
        }
        Project project = Project.builder()
                .id(projectDTO.getId())
                .title(projectDTO.getTitle())
                .status(projectDTO.getStatus())
                .isPublic(projectDTO.getIsPublic())
                .sourcePath(projectDTO.getSourcePath())
                .videoPath(projectDTO.getVideoPath())
                .thumnail(projectDTO.getThumnail())
                .userst(userst)
                .usercs(usercs)
                .description(null)
                .feedback(null)
                .tech_projects(new ArrayList<>())
                .build();
        projectRepository.save(project);

                projectDTO.getTechDTOList().forEach(detail -> {
                    if (detail.getTech() != null) {
                        Tech tech = Tech.builder()
                                .id(detail.getTech().getId())
                                .name(detail.getTech().getName())
                                .build();
                        techRepository.save(tech);

                        Tech_Project tech_project = Tech_Project.builder()
                                .id(detail.getTech().getId())
                                .tech(tech)
                                .project(project)
                                .build();
                        techProjectRepository.save(tech_project);
                    } else {

                        throw new AppException("Tech cannot be null");
                    }
                });

   return null;
    }
    public void DeleteProjectId(UUID projectID) {
        projectRepository.deleteById(projectID);
    }
    @Override
    public FeedBack CreateFeedback(FeedBackDTO feedBackDTO) {
        FeedBack feedBack = FeedBack.builder()
                .id(feedBackDTO.getId())
                .content(feedBackDTO.getContent())
                .projectfb(feedBackDTO.getProjectfb())
                .build();
        return feedBackRepository.save(feedBack)  ;
    }


}
