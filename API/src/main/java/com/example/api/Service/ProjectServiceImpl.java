package com.example.api.Service;

import com.example.api.DTO.ProjectDTO;
import com.example.api.DTO.RequestDTO;
import com.example.api.DTO.UpdateProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Exception.AppException;
import com.example.api.Exception.ResponseMessage;
import com.example.api.Repository.*;
import com.example.api.Response.ApiResponse;
import com.example.api.Service.IService.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
    public ProjectDTO getProjectById(String id) {
        Project project = projectRepository.findById(UUID.fromString(id)).orElse(null);
        ProjectDTO projectDTO = ProjectDTO.MapProjectToProjectDTO(project);
        return  projectDTO;
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAllProject();
        return projects.stream()
                .map(ProjectDTO::MapProjectToProjectDTO)
                .collect(Collectors.toList());
    }



    @Override
    public List<ProjectDTO> findByProject_UserId( String status) {
        String email=null;
        List<Project> projects = new ArrayList<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails) {
             email = ((UserDetails) authentication.getPrincipal()).getUsername();
            System.out.println(email);

        } else {
            ResponseEntity.status(401).body(new ApiResponse<>("Lỗi", new ResponseMessage("Người dùng chưa được xác thực")));
        }
        if(email!=null)
        {
           User user= userRepository.findUserByEmail(email).orElse(null);
            projects= projectRepository.findByProject_UserId(user.getId(), status);


        }
        return projects.stream()
                .map(ProjectDTO::MapProjectToProjectDTO)
                .collect(Collectors.toList());

    }

    @Override
    public List<ProjectDTO> findByProject() {
        String email=null;
        List<Project> projects = new ArrayList<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
            System.out.println(email);

        } else {
            ResponseEntity.status(401).body(new ApiResponse<>("Lỗi", new ResponseMessage("Người dùng chưa được xác thực")));
        }
        if(email!=null)
        {
            User user= userRepository.findUserByEmail(email).orElse(null);
            projects= projectRepository.findProject(user.getId());


        }
        return projects.stream()
                .map(ProjectDTO::MapProjectToProjectDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDTO> findByKeyWord(String keyWord) {
        List<Project> projects = projectRepository.findByKeyWord(keyWord);
        return projects.stream()
                .map(ProjectDTO::MapProjectToProjectDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDTO> FindByProjectCensor() {

        String email=null;
        List<Project> projects = new ArrayList<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
            System.out.println(email);

        } else {
            ResponseEntity.status(401).body(new ApiResponse<>("Lỗi", new ResponseMessage("Người dùng chưa được xác thực")));
        }
        if(email!=null)
        {
            User user= userRepository.findUserByEmail(email).orElse(null);
           projects = projectRepository.findByProjectCensor(user.getId());
        }
        return projects.stream()
                .map(ProjectDTO::MapProjectToProjectDTO)
                .collect(Collectors.toList());
    }


    @Override
    public void getProjectDetailsById(String projectId) {

         projectRepository.deleteById(UUID.fromString(projectId));

    }



    @Override
    public Project CreateProject(Project project) {


        Set<Tech> techsToSave = new HashSet<>();

        // Kiểm tra và lưu trữ techs trong bảng tech_project
        for (Tech tech : project.getTechs()) {
            Tech existingTech = techRepository.findTechByName(tech.getName()).orElse(null);
            if (existingTech != null) {

                techsToSave.add(existingTech);
            } else {

                techRepository.save(tech);
                techsToSave.add(tech);
            }
        }
        User usercs = userRepository.findById(project.getStudent().getId()).orElse(null);

        User userst = userRepository.findById(project.getCensor().getId()).orElse(null);
        project.setTechs(techsToSave);
        project.setCensor(usercs);
        project.setStudent(userst);

        Project savedProject = projectRepository.save(project);

        // Lưu project ID vào description nếu có
        Description description = savedProject.getDescription();
        if (description != null) {
            description.setProjectds(savedProject);
            descriptionRepository.save(description);
        }
        return  savedProject;
    }


    @Override
    public ProjectDTO UpdateProject(UpdateProjectDTO updateProjectDTO)
    {
        Project projectResult =null;
        Project project = projectRepository.findById(updateProjectDTO.getId()).orElse(null);
        if(project!=null)
        {
            project.setTitle(updateProjectDTO.getTitle());
            Set<Tech> techsToSave = new HashSet<>();

            for (Tech tech : updateProjectDTO.getTechs()) {
                Tech existingTech = techRepository.findTechByName(tech.getName()).orElse(null);
                if (existingTech != null) {

                    techsToSave.add(existingTech);
                } else {

                    techRepository.save(tech);
                }
            }
            project.setTechs(techsToSave);
            projectResult = projectRepository.save(project);
        }
        ProjectDTO projectDTO = ProjectDTO.MapProjectToProjectDTO(project);
        return projectDTO;


    }

    @Override
    public ProjectDTO updateIsPublic(RequestDTO requestDTO) {
        Project projectResult =null;
        Project project = projectRepository.findById(requestDTO.getId())
                .orElseThrow(() -> new AppException("Project not found with ID: " + requestDTO.getId()));
        project.setIsPublic(requestDTO.isPublic());

       projectResult = projectRepository.save(project);
        ProjectDTO projectDTO = ProjectDTO.MapProjectToProjectDTO(projectResult);
        return projectDTO;
    }

    @Override
    public Integer CountProject(@Param("date") Date date)
    {
        return projectRepository.CountProject(date);
    }
    @Override
    public  List<Project> TopProjectWithView()
    {
        return projectRepository.TopProjectWithView();
    }

//    @Override
//    public Project UpdateProjectNotAccess(Project updatedProject) {
//        Project existingProject = projectRepository.findById(updatedProject.getId()).orElse(null);
//        User user = null;
//        Optional<User> usercs = userRepository.findById(updatedProject.getUsercs().getId());
//        if (usercs.isPresent()) {
//            user = usercs.get();
//        } else {
//            user = null;
//        }
//        if (existingProject != null && user != null) {
//            // Cập nhật thông tin từ updatedProject vào existingProject
//            existingProject.setTitle(updatedProject.getTitle());
//            existingProject.setStatus(updatedProject.getStatus());
//            existingProject.setIsPublic(updatedProject.getIsPublic());
//            existingProject.setVideoPath(updatedProject.getVideoPath());
//            existingProject.setSourcePath(updatedProject.getSourcePath());
//            existingProject.setThumnail(updatedProject.getThumnail());
//            existingProject.setMajor(updatedProject.getMajor());
//            existingProject.setUsercs(user);
//
//            Project projectResult = projectRepository.save(existingProject);
//
//            // Cập nhật feedback
//            FeedBack existingFeedback = existingProject.getFeedback();
//            FeedBack updatedFeedback = updatedProject.getFeedback();
//
//            if (existingFeedback != null && updatedFeedback != null) {
//                existingFeedback.setContent(updatedFeedback.getContent());
//                existingFeedback.setProjectfb(projectResult);
//                feedBackRepository.save(existingFeedback);
//            } else if (updatedFeedback != null) {
//                // Nếu feedback chưa tồn tại, lưu mới
//                FeedBack newFeedback = new FeedBack();
//                newFeedback.setContent(updatedFeedback.getContent());
//                newFeedback.setProjectfb(projectResult);
//                existingProject.setFeedback(newFeedback);
//                feedBackRepository.save(newFeedback);
//            }
//
//            return projectResult;
//        } else {
//
//            return null;
//        }
//    }


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
