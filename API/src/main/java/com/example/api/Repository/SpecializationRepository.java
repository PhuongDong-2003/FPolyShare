package com.example.api.Repository;

import com.example.api.Entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, UUID> {

//    Specialization findByIdQr(UUID id);
    @Query("SELECT s FROM Specialization s WHERE s.id = :id")
    Specialization findSpecializationById(@Param("id") UUID id);
}
