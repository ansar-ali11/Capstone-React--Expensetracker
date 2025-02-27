# **Expense Tracker Application**

## **Overview**
The **Expense Tracker Application** is a full-stack web application designed to help users manage their expenses. This app allows users to easily add, categorize, view, update, and delete their expenses. It is built with a modern tech stack, including **React** for the front-end, **Spring Boot** for the back-end, and **SQL** (MySQL or PostgreSQL) for database management.

### **Key Features**:
- **Add Expenses**: Users can input details about their expenses such as description, amount, category, and date.
- **Categorize Expenses**: Expenses are organized into categories like Food, Transport, Entertainment, and Utilities.
- **Update Expenses**: Users can update details of their expenses.
- **Delete Expenses**: Users can delete expenses they no longer wish to track.
- **Responsive Design**: The front-end is mobile-friendly, ensuring a great user experience on all devices.
- **Graphical Insights**: Visualize expenses through charts and graphs to analyze spending habits (to be implemented).

### **Tech Stack**:
- **Frontend**: React.js (for building the user interface)
- **Backend**: Spring Boot (Java) (for REST API development)
- **Database**: SQL (MySQL or PostgreSQL)
- **API**: RESTful API for communication between the frontend and backend
- **Styling**: Custom CSS for responsive and clean UI design

## **Project Structure**
1. **Frontend (React)**:
   - Handles the UI components and communicates with the backend via RESTful API.
2. **Backend (Spring Boot)**:
   - Provides the server-side logic, connects to the database, and exposes RESTful APIs for managing expenses.
3. **Database**:
   - Stores the expenses data in a MySQL or PostgreSQL database.

---

## **Code Provided**

### 1. **`Expense` Model (Backend - Spring Boot)**:
```java
package com.example.demo.models;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String description;
    private double amount;
    private LocalDate expenseDate;
    
    @Enumerated(EnumType.STRING)
    private Category category;  
    
    public enum Category {
        FOOD, TRANSPORT, ENTERTAINMENT, UTILITIES;
    }
}
```

### 2. **`ExpenseRepository` (Backend - Spring Boot)**:
```java
package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.models.Expense;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {
    // Custom query methods can be added here if needed
}
```

### 3. **`ExpenseService` (Backend - Spring Boot)**:
```java
package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Expense;
import com.example.demo.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Fetch all expenses
    public List<Expense> getAllExpenses() {
        return (List<Expense>) expenseRepository.findAll();
    }

    // Add a new expense
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Update an existing expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> existingExpense = expenseRepository.findById(id);
        if (existingExpense.isPresent()) {
            Expense expense = existingExpense.get();
            expense.setDescription(expenseDetails.getDescription());
            expense.setAmount(expenseDetails.getAmount());
            expense.setCategory(expenseDetails.getCategory());
            expense.setExpenseDate(expenseDetails.getExpenseDate());
            return expenseRepository.save(expense);
        }
        return null;  // Return null if not found (can be improved with exception handling)
    }

    // Delete an expense
    public boolean deleteExpense(Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            expenseRepository.deleteById(id);
            return true;
        }
        return false; // Expense not found
    }
}
```

### 4. **`ExpenseController` (Backend - Spring Boot)**:
```java
package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Expense;
import com.example.demo.services.ExpenseService;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3001")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Fetch all expenses
    @GetMapping("/get")
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // Add a new expense
    @PostMapping("/insert")
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    // Update an existing expense
    @PutMapping("/update/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        Expense updatedExpense = expenseService.updateExpense(id, expense);
        if (updatedExpense != null) {
            return ResponseEntity.ok(updatedExpense);  // Return updated expense
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // Delete an expense
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        boolean isDeleted = expenseService.deleteExpense(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();  // Return 204 No Content if deleted successfully
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }
}
```

---

## **Setting Up the Project**

To get this project up and running on your local machine:

### **Frontend Setup (React)**:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React application:
   ```bash
   npm start
   ```
   The front-end will be accessible at `http://localhost:3001`.

### **Backend Setup (Spring Boot)**:
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Configure your database connection in `application.properties` or `application.yml`.
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend API will be available at `http://localhost:8089`.

---
