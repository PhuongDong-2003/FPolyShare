package com.example.api.Repository;

import com.example.api.Entity.Specialization_Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Specialization_ProjectRepository extends JpaRepository<Specialization_Project, UUID> {
}
