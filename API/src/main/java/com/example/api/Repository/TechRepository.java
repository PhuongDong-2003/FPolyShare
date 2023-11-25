package com.example.api.Repository;

import com.example.api.Entity.Tech;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface TechRepository extends JpaRepository<Tech, UUID> {

    @Query("Select t.name from Tech t")
    List<String> getAlTechName();
    Optional<Tech> findTechByName(String name);
}
