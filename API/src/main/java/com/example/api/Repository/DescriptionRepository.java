package com.example.api.Repository;

import com.example.api.Entity.Description;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DescriptionRepository extends JpaRepository<Description, UUID> {
}
