package com.example.api.Repository;

import com.example.api.Entity.Tech;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import java.util.UUID;
@Repository
public interface TechRepository extends JpaRepository<Tech, UUID> {
    Optional<Tech> findTechByName(String name);
}
