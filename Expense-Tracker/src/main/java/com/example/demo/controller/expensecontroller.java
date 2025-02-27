package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.expense;
import com.example.demo.services.expenseservice;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3001")
public class expensecontroller {

	@Autowired
	expenseservice expenseService;
	
	
	  @GetMapping("/get")
	    public List<expense> getAllExpenses()
	    {
	    	return expenseService.getAllExpenses();
	    }

	    @PostMapping("/insert")
	    public expense createExpense(@RequestBody expense expense) {
	        return expenseService.addExpense(expense);
	    }
	    
	    
	    @PutMapping("/update/{id}")
	    public ResponseEntity<expense> updateExpense(@PathVariable Long id, @RequestBody expense expense) {
	        expense updatedExpense = expenseService.updateExpense(id, expense);
	        if (updatedExpense != null) {
	            return ResponseEntity.ok(updatedExpense); // Return updated expense
	        } else {
	            return ResponseEntity.notFound().build(); // Return 404 if not found
	        }
	    }

	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
	        boolean isDeleted = expenseService.deleteExpense(id);
	        if (isDeleted) {
	            return ResponseEntity.noContent().build(); 
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
