package com.example.api.DTO;

import com.example.api.Entity.Project;
import com.example.api.Entity.Specialization_Project;
import com.example.api.Entity.Tech_Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetailsDTO {

    private Object project;
    private List<Specialization_Project> specializationProjects;
    private List<Tech_Project> techProjects;
}
