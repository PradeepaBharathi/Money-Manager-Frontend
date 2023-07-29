import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://money-manager-orxh.onrender.com";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/moneytracker/add-income`,
        income
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    getIncomes();
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/moneytracker/all`);
      setIncomes(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/moneytracker/delete/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + parseInt(income.amount);
    });
    return totalIncome;
  };
  console.log(totalIncome());

  //calculate expenses
  const addExpense = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/expensetracker/add-expense`,
        { ...income, type: "expense" }
      );
    } catch (err) {
      console.log(err);
    }
    getExpense();
  };

  const getExpense = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expensetracker/all`);
      setExpenses(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/expensetracker/delete/${id}`);
    getExpense();
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + parseInt(expense.amount);
    });
    return totalExpense;
  };
  console.log(totalExpense());

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        expenses,
        addExpense,
        getExpense,
        deleteExpense,
        totalExpense,
        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
