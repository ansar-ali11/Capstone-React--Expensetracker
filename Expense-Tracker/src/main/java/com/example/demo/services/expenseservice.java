package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.expense;
import com.example.demo.repository.expenserepository;

@Service
public class expenseservice {

	 @Autowired
	    private expenserepository repo;

	 public List<expense> getAllExpenses() {
	        return (List<expense>) repo.findAll();  // Fetch all expenses from the database
	    }

	    // Add a new expense
	    public expense addExpense(expense expense) {
	        return repo.save(expense);
	    }
	    
	    
	    public expense updateExpense(Long id, expense expenseDetails) {
	        Optional<expense> existingExpense = repo.findById(id);
	        if (existingExpense.isPresent()) {
	            expense expense = existingExpense.get();
	            expense.setDescription(expenseDetails.getDescription());
	            expense.setAmount(expenseDetails.getAmount());
	            expense.setCategory(expenseDetails.getCategory());
	            expense.setExpenseDate(expenseDetails.getExpenseDate());
	            return repo.save(expense);
	        }
	        return null; 
	    }

	    public boolean deleteExpense(Long id) {
	        Optional<expense> expense = repo.findById(id);
	        if (expense.isPresent()) {
	            repo.deleteById(id); 
	            return true; 
	        }
	        return false; 
	    }


	
	 
	    
	    
}
