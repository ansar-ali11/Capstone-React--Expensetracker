import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import necessary components for Chart.js

import './dash.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8089/api/v1/get')
      .then(response => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load expenses. Please try again later.");
        setLoading(false);
        console.error("Error fetching expenses:", err);
      });
  }, []);

  const groupExpensesByCategory = () => {
    return expenses.reduce((categories, expense) => {
      const { category } = expense;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(expense);
      return categories;
    }, {});
  };

  const groupedExpenses = groupExpensesByCategory();

  // Calculate the total expenses by category for the chart
  const chartData = {
    labels: Object.keys(groupedExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.keys(groupedExpenses).map(category =>
          groupedExpenses[category].reduce((total, expense) => total + expense.amount, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate the total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);

  return (
    <div className="dashboard">
      <h2>Expense Dashboard</h2>
      {loading && <div className="loading">Loading expenses...</div>}
      {error && <div className="error">{error}</div>}

      {/* Total Expenses Summary */}
      <div className="total-expenses">
        <h3>Total Expenses: &#8377;{totalExpenses}</h3>
      </div>

      {/* Display the Chart */}
      <div className="chart-container">
        <h3>Expenses Breakdown by Category</h3>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      <div className="expense-list">
        {Object.keys(groupedExpenses).length === 0 ? (
          <p>No expenses available.</p>
        ) : (
          Object.keys(groupedExpenses).map((category) => (
            <div key={category} className="category">
              <h3>{category}</h3>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedExpenses[category].map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.expenseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
