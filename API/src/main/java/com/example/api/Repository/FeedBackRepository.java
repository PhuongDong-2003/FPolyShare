package com.example.api.Repository;

import com.example.api.Entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, UUID> {
}
