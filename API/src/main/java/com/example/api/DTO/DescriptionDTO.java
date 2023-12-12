package com.example.api.DTO;

import com.example.api.Entity.Tech;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DescriptionDTO {
    Date create_at;

    Date approve_at;

    String censor;

    Set<Tech> techs;

    String github;

    Integer like;

    Integer view;


}
