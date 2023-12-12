package com.example.api.Service;

import com.example.api.Entity.Major;
import com.example.api.Repository.MajorRepository;
import com.example.api.Service.IService.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorServiceImpl implements MajorService {
    @Autowired
    MajorRepository majorRepository;
    @Override
    public List<Major> getAll() {
        return majorRepository.findAll();
    }
}
