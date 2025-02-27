import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Components
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';

// Importing Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <NavBar />
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expenses" element={<ExpenseList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
