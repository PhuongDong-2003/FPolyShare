package com.example.api.DTO;

import com.example.api.Entity.Project;
import com.example.api.Entity.Tech;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tech_ProjectDTO {

        UUID id;
        Project project;
        Tech tech;
}
