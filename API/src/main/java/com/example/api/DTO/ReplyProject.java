package com.example.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyProject {
    UUID id;
    String status;
    String content;
    Date approval_Date;
}
