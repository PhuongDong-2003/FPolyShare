package com.example.api.Repository;

import com.example.api.Entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, UUID> {
    @Query("Select f from FeedBack  f where f.projectfb.id = :projectID")
    FeedBack  FindByFeedBackProjectID(@Param("projectID") UUID projectID);
}
