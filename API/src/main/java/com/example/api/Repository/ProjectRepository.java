package com.example.api.Repository;

import com.example.api.Entity.FeedBack;
import com.example.api.Entity.Project;
import com.example.api.Entity.Tech;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    @Query("select p  from Project p  where p.status = '1' and p.userst.id = :userId")
    List<Project> findByProjectAC_UserId(@Param("userId") UUID userId);

    @Query("select p  from Project p  where p.userst.id = :userId")
    List<Project> findByProject_UserId(@Param("userId") UUID userId);


    @Query("select p from Project p where p.status = '1' and p.isPublic = true ")
    List<Project> findAllProject();

    @Query("select p  from Project p inner join User u on p.usercs.id = u.id  where (p.status = '1' and p.title like %:keyWord%  or p.major like %:keyWord%)")
    List<Project> findByKeyWord(@Param("keyWord") String keyWord);
    @Query("select p from Project p inner join User u on p.usercs.id = u.id where p.usercs.id = :userId and p.status like '0'")
    List<Project> findByProjectWait(@Param("userId") UUID userId);

    @Query("select p from Project p inner join User u on p.usercs.id = u.id where p.usercs.id = :userId and p.status like '1'")
    List<Project> findByProjectProcessed(@Param("userId") UUID userId);


}
