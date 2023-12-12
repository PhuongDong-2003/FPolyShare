package com.example.api.Repository;

import com.example.api.Entity.Major;
import com.example.api.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MajorRepository  extends JpaRepository<Major, UUID> {

}
