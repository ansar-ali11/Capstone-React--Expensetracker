package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.category;

public interface categoryrepository extends JpaRepository<category, Long>{

}
