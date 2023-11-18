package com.example.api.DTO;

import com.example.api.Entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackDTO {


     UUID id;

     String content;

    Project projectfb;
}
