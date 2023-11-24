package com.example.api.Service;

import com.example.api.DTO.Request;
import com.example.api.Entity.*;
import com.example.api.Exception.AppException;
import com.example.api.Repository.*;
import com.example.api.Service.IService.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    TechRepository techRepository;
    @Autowired
    DescriptionRepository descriptionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FeedBackRepository feedBackRepository;


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
        return projectRepository.findByProject_UserId(userId);
    }

    @Override
    public List<Project> findByKeyWord(String keyWord) {
        return projectRepository.findByKeyWord(keyWord);
    }

    @Override
    public List<Project> FindByProjectWait(UUID id) {
        return projectRepository.findByProjectWait(id);
    }

    @Override
    public List<Project> FindByProjectProcessed(UUID id) {
        return projectRepository.findByProjectProcessed(id);
    }

    @Override
    public FeedBack FindByFeedBackProjectID(UUID projectID) {
        return feedBackRepository.FindByFeedBackProjectID(projectID);
    }





    @Override
    public Project getProjectDetailsById(UUID projectId) {


        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            return project;
        } else {
            return null;
        }
    }

    @Override
    public Project CreateProject(Project project) {

        // Danh sách techs để lưu
        List<Tech> techsToSave = new ArrayList<>();

        // Kiểm tra và lưu trữ techs trong bảng tech_project
        for (Tech tech : project.getTechs()) {
            Tech existingTech = techRepository.findTechByName(tech.getName()).orElse(null);
            if (existingTech != null) {
                // Tech đã tồn tại, thêm vào danh sách để lưu
                techsToSave.add(existingTech);
            } else {
                // Tech chưa tồn tại, lưu mới và thêm vào danh sách để lưu
                techRepository.save(tech);
                techsToSave.add(tech);
            }
        }

        project.setTechs(techsToSave);
        Project savedProject = projectRepository.save(project);

        // Lưu project ID vào description nếu có
        Description description = savedProject.getDescription();
        if (description != null) {
            description.setProjectds(savedProject);
            descriptionRepository.save(description);
        }

        return savedProject;
    }

    @Override
    public Project UpdateProjectAccess(Project updatedProject) {
        // Lấy project cần cập nhật từ cơ sở dữ liệu
        User user = null;
        Project existingProject = projectRepository.findById(updatedProject.getId()).orElse(null);
        Optional<User> usercs = userRepository.findById(updatedProject.getUsercs().getId());
        if (usercs.isPresent()) {
            user = usercs.get();
        } else {
            user = null;
        }
        if (existingProject != null && user != null) {
            existingProject.setTitle(updatedProject.getTitle());
            existingProject.setStatus(updatedProject.getStatus());
            existingProject.setIsPublic(updatedProject.getIsPublic());
            existingProject.setVideoPath(updatedProject.getVideoPath());
            existingProject.setSourcePath(updatedProject.getSourcePath());
            existingProject.setThumnail(updatedProject.getThumnail());
            existingProject.setMajor(updatedProject.getMajor());


            existingProject.getDescription().setApproval_Date(updatedProject.getDescription().getApproval_Date());


            existingProject.setUsercs(user);


            return projectRepository.save(existingProject);
        } else {

            return null;
        }
    }

    @Override
    public Project UpdateProjectNotAccess(Project updatedProject) {
        Project existingProject = projectRepository.findById(updatedProject.getId()).orElse(null);
        User user = null;
        Optional<User> usercs = userRepository.findById(updatedProject.getUsercs().getId());
        if (usercs.isPresent()) {
            user = usercs.get();
        } else {
            user = null;
        }
        if (existingProject != null && user != null) {
            // Cập nhật thông tin từ updatedProject vào existingProject
            existingProject.setTitle(updatedProject.getTitle());
            existingProject.setStatus(updatedProject.getStatus());
            existingProject.setIsPublic(updatedProject.getIsPublic());
            existingProject.setVideoPath(updatedProject.getVideoPath());
            existingProject.setSourcePath(updatedProject.getSourcePath());
            existingProject.setThumnail(updatedProject.getThumnail());
            existingProject.setMajor(updatedProject.getMajor());
            existingProject.setUsercs(user);

            Project projectResult = projectRepository.save(existingProject);

            // Cập nhật feedback
            FeedBack existingFeedback = existingProject.getFeedback();
            FeedBack updatedFeedback = updatedProject.getFeedback();

            if (existingFeedback != null && updatedFeedback != null) {
                existingFeedback.setContent(updatedFeedback.getContent());
                existingFeedback.setProjectfb(projectResult);
                feedBackRepository.save(existingFeedback);
            } else if (updatedFeedback != null) {
                // Nếu feedback chưa tồn tại, lưu mới
                FeedBack newFeedback = new FeedBack();
                newFeedback.setContent(updatedFeedback.getContent());
                newFeedback.setProjectfb(projectResult);
                existingProject.setFeedback(newFeedback);
                feedBackRepository.save(newFeedback);
            }

            return projectResult;
        } else {

            return null;
        }
    }
    @Override
    public Project updateIsPublic(Request request) {
        Project project = projectRepository.findById(request.getId())
                .orElseThrow(() -> new AppException("Project not found with ID: " + request.getId()));
        project.setIsPublic(request.isPublic());


        return projectRepository.save(project);
    }

//    private void saveTechs(Project project, Collection<Tech> techs) {
//        if (techs != null && !techs.isEmpty()) {
//            project.getTechs().clear(); // Xóa techs cũ để tránh duplicate
//
//            for (Tech tech : techs) {
//                Tech attachedTech = entityManager.merge(tech); // Gắn kết đối tượng Tech
//                project.getTechs().add(attachedTech);
//            }
//
//            projectRepository.save(project);
//        }
//    }
//
//
//


//    @Override
//    public Description mapProjectDTOtoDescription(ProjectDTO projectDTO) {
//       var resultProject =  getProjectDetailsById(projectDTO.getId());
//      return  Description.builder()
//                .id(projectDTO.getDescription().getId())
//                .github(projectDTO.getDescription().getGithub())
//                .create_Date(projectDTO.getDescription().getCreate_Date())
//                .approval_Date(projectDTO.getDescription().getApproval_Date())
//                .likeCount((projectDTO.getDescription().getLikeCount()))
//                .projectds(resultProject)
//                .build();
//    }


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

//    @Override
//    public Project CreateProject(ProjectDTO projectDTO) {
//        User userst = null;
//        User usercs = null;
//        Optional<User> optionalst = userRepository.findById(projectDTO.getUserst().getId());
//        Optional<User> optionalcs = userRepository.findById(projectDTO.getUsercs().getId());
//
//        if (optionalst.isPresent() && optionalcs.isPresent()) {
//            userst = optionalst.get();
//            usercs = optionalcs.get();
//        } else {
//            throw new AppException("User not exist");
//        }
//        Project project = Project.builder()
//                .id(projectDTO.getId())
//                .title(projectDTO.getTitle())
//                .status(projectDTO.getStatus())
//                .isPublic(projectDTO.getIsPublic())
//                .sourcePath(projectDTO.getSourcePath())
//                .videoPath(projectDTO.getVideoPath())
//                .thumnail(projectDTO.getThumnail())
//                .userst(userst)
//                .usercs(usercs)
//                .description(null)
//                .feedback(null)
//                .tech_projects(new ArrayList<>())
//                .build();
//        projectRepository.save(project);
//
//                projectDTO.getTechDTOList().forEach(detail -> {
//                    if (detail.getTech() != null) {
//                        Tech tech = Tech.builder()
//                                .id(detail.getTech().getId())
//                                .name(detail.getTech().getName())
//                                .build();
//                        techRepository.save(tech);
//
//                        Tech_Project tech_project = Tech_Project.builder()
//                                .id(detail.getTech().getId())
//                                .tech(tech)
//                                .project(project)
//                                .build();
//                        techProjectRepository.save(tech_project);
//                    } else {
//
//                        throw new AppException("Tech cannot be null");
//                    }
//                });
//
//   return null;
//    }
//    public void DeleteProjectId(UUID projectID) {
//        projectRepository.deleteById(projectID);
//    }
//    @Override
//    public FeedBack CreateFeedback(FeedBackDTO feedBackDTO) {
//        FeedBack feedBack = FeedBack.builder()
//                .id(feedBackDTO.getId())
//                .content(feedBackDTO.getContent())
//                .projectfb(feedBackDTO.getProjectfb())
//                .build();
//        return feedBackRepository.save(feedBack)  ;
//    }


}
