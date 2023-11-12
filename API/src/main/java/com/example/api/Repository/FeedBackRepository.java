package com.example.api.Repository;

import com.example.api.Entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FeedBackRepository extends JpaRepository<FeedBack, UUID> {
}
