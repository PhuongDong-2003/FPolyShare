package com.example.api.Repository;

import com.example.api.Entity.Description;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DescriptionRepository extends JpaRepository<Description, UUID> {
}
