package com.example.api.Repository;

import com.example.api.Entity.Project;
import com.example.api.Entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByUsercs_Id(UUID userId);

   Project findByIdQr(UUID id);
    @Query("SELECT s FROM Project s WHERE s.id = :id")
    Specialization findSpecializationById(@Param("id") UUID id);


}
