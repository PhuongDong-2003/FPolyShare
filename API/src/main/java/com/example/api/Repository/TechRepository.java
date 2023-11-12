package com.example.api.Repository;

import com.example.api.Entity.Tech;
import org.springframework.data.jpa.repository.JpaRepository;

import java.rmi.server.UID;
import java.util.UUID;

public interface TechRepository extends JpaRepository<Tech, UUID> {
}
