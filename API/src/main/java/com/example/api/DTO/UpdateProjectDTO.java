package com.example.api.DTO;

import com.example.api.Entity.Tech;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateProjectDTO {
    UUID id;
    String title;
    List<Tech> techs;
}
