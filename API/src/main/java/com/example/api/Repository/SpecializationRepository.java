package com.example.api.Repository;

import com.example.api.Entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, UUID> {
}
