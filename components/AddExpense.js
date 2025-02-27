import React, { useState } from 'react';
import axios from 'axios';
import './add.css';

function AddExpense() {
  const [user, setUser] = useState({
    description: "",
    amount: "",
    category: "",
    expenseDate: ""
  });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!user.description || user.description.trim() === "") {
      setMessage("Description is required.");
      return;
    }
    if (user.amount <= 0) {
      setMessage("Amount must be greater than zero.");
      return;
    }
    if (!user.category || user.category.trim() === "") {
      setMessage("Category is required.");
      return;
    }
    if (!user.expenseDate) {
      setMessage("Expense Date is required.");
      return;
    }

    const trimmedCategory = user.category.trim().toUpperCase();
    const validCategories = ["FOOD", "TRANSPORT", "ENTERTAINMENT", "UTILITIES"];
    if (!validCategories.includes(trimmedCategory)) {
      setMessage("Category must be one of: FOOD, TRANSPORT, ENTERTAINMENT, UTILITIES.");
      return;
    }

    const formattedUser = {
      ...user,
      category: trimmedCategory,
      amount: parseFloat(user.amount),
      expenseDate: new Date(user.expenseDate).toISOString().split('T')[0],
    };

    try {
      const response = await axios.post("http://localhost:8089/api/v1/insert", formattedUser);
      setMessage("Expense added successfully.");
      setUser({ description: "", amount: "", category: "", expenseDate: "" });
    } catch (error) {
      setMessage("Failed to add expense. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-expense-container">
      <h2 className="title">Add Expense</h2>

      <form onSubmit={submit} className="form-container">
        <div className="input-field">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={user.amount}
            onChange={handleUser}
            id="amount"
            min="0"
            step="0.01"
          />
        </div>

        <div className="input-field">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={user.category}
            onChange={handleUser}
            id="category"
          >
            <option value="">Select Category</option>
            <option value="FOOD">Food</option>
            <option value="TRANSPORT">Transport</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="UTILITIES">Utilities</option>
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={user.description}
            onChange={handleUser}
            id="description"
          />
        </div>

        <div className="input-field">
          <label htmlFor="expenseDate">Expense Date</label>
          <input
            type="date"
            name="expenseDate"
            value={user.expenseDate}
            onChange={handleUser}
            id="expenseDate"
          />
        </div>

        <button type="submit" className="submit-button">Add Expense</button>
      </form>

      {message && <div className="message"><p>{message}</p></div>}
    </div>
  );
}

export default AddExpense;
