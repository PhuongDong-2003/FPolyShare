package com.example.api.Service;

import com.example.api.DTO.ProjectDTO;
import com.example.api.Entity.*;
import com.example.api.Repository.*;
import com.example.api.Service.IService.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    Specialization_ProjectRepository specializationProjectRepository;
    @Autowired
    SpecializationRepository specializationRepository;
    @Autowired
    DescriptionRepository descriptionRepository;

    @Override
    public Specialization getSpecializationById(UUID id) {
        return specializationRepository.findById(id).orElse(null);
    }

    @Override
    public Project getSProjectById(UUID id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> findProjectsByUsercsId(String userId) {
        return projectRepository.findByUsercs_Id(UUID.fromString(userId));
    }
    @Override
    public Project getProjectDetailsById(UUID projectId) {


        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent() ) {
            Project project = projectOptional.get();
            return  project;
        } else {
            // Xử lý trường hợp không tìm thấy Project
            return null;
        }
    }


    @Override
    public Project CreateProject(ProjectDTO projectDTO)
    {
       
        Project project = mapProjectDTOtoProject(projectDTO);
        projectRepository.save(project);

        projectDTO.getSpecializations().forEach(specialization ->
        {
                specializationRepository.save(mapProjectDTOSpecialization(projectDTO));
        });

//        projectDTO.getSpecialization_project().forEach(specializationProject -> {
//            Specialization rsSpecialization = specializationRepository.findByIdQr(projectDTO.getSpecialization().getId());
//            Project rsProject = projectRepository.findByIdQr(projectDTO.getId());
//             specializationProjectRepository.save(
//                    Specialization_Project.builder()
//                            .id(specializationProject.getId())
//                            .specialization(rsSpecialization)
//
//            );
//
//        });

        return null;
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

    @Override
    public Specialization mapProjectDTOSpecialization(ProjectDTO projectDTO) {
        return Specialization.builder()
                .id(projectDTO.getSpecialization().getId())
                .name((projectDTO.getSpecialization().getName()))
                .build();
    }

    @Override
    public Project mapProjectDTOtoProject(ProjectDTO projectDTO) {
        return Project.builder()
                .id(projectDTO.getId())
                .title(projectDTO.getTitle())
                .status(projectDTO.getStatus())
                .isPublic(projectDTO.getIsPublic())
                .videoPath(projectDTO.getVideoPath())
                .sourcePath(projectDTO.getSourcePath())
                .thumnail(projectDTO.getThumnail())
                .build();
    }


}
