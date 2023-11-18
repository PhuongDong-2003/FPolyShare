package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Feedback")
@Builder(toBuilder = true)
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "content",columnDefinition = "nvarchar(255)", nullable = false)
    private String content;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "project_id")
    private Project projectfb;
}
