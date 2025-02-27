import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './el.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    // Fetch all expenses on component mount
    axios.get('http://localhost:8089/api/v1/get')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(err => {
        setMessage("Failed to load expenses.");
        console.error("Error fetching expenses:", err);
      });
  }, []);

  const handleDelete = (id) => {
    // Delete the expense
    axios.delete(`http://localhost:8089/api/v1/delete/${id}`)
      .then(() => {
        setMessage("Expense deleted successfully.");
        setExpenses(expenses.filter(expense => expense.id !== id)); // Remove deleted expense from the list
      })
      .catch(err => {
        setMessage("Failed to delete expense.");
        console.error("Error deleting expense:", err);
      });
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense); // Set expense for editing
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedExpense = {
      ...editingExpense,
      amount: parseFloat(editingExpense.amount),
      expenseDate: new Date(editingExpense.expenseDate).toISOString().split('T')[0]
    };

    axios.put(`http://localhost:8089/api/v1/update/${editingExpense.id}`, updatedExpense)
      .then(response => {
        setMessage("Expense updated successfully.");
        setExpenses(expenses.map(exp => (exp.id === editingExpense.id ? response.data : exp)));
        setEditingExpense(null); // Clear the edit form
      })
      .catch(err => {
        setMessage("Failed to update expense.");
        console.error("Error updating expense:", err);
      });
  };

  const handleChange = (e) => {
    setEditingExpense({
      ...editingExpense,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>
      {message && <div className="message"><p>{message}</p></div>}
      
      {editingExpense ? (
        <form onSubmit={handleUpdate} className="update-expense-form">
          <h3>Edit Expense</h3>
          <div className="input-field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={editingExpense.description}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={editingExpense.amount}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Category</label>
            <select
              name="category"
              value={editingExpense.category}
              onChange={handleChange}
            >
              <option value="FOOD">Food</option>
              <option value="TRANSPORT">Transport</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="UTILITIES">Utilities</option>
            </select>
          </div>
          <div className="input-field">
            <label>Expense Date</label>
            <input
              type="date"
              name="expenseDate"
              value={editingExpense.expenseDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Expense</button>
        </form>
      ) : (
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Expense Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.expenseDate}</td>
                  <td>
                    <button onClick={() => handleEdit(expense)} className='edt'>Edit</button>
                    <button onClick={() => handleDelete(expense.id)} className='dlt'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
