import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://money-manager-orxh.onrender.com";
// const BASE_URL = "http://localhost:9000";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [signupUser, setSignupUser] = useState(null);
  const [details, setDetails] = useState({ Email: "", Name: "" });

  ///////////login and register
  console.log(incomes);
  const addUser = async (Name, Email, Password) => {
    try {
      console.log("Name:", Name, "Email:", Email, "Password:", Password);
      const response = await axios.post(`${BASE_URL}/user/add-user`, {
        Name,
        Email,
        Password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loginUserid = async (id, Email, Password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        Email,
        Password,
      });
      console.log(response.data);
      if (response.status === 201) {
        return response;
      } else {
        throw new Error("An error occurred while logging in.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        throw new Error("Incorrect email or password.");
      } else {
        console.log(err);
        throw new Error("An error occurred while logging in.");
      }
    }
  };
  //calculate incomes
  const addIncome = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/moneytracker/add-income`,
        { income, type: "income" },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.income);
    } catch (err) {
      console.log(err);
    }
    getIncomes();
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/moneytracker/all`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
     
   const incomesData = response.data.data.map((item) => ({
     income: item.income,
     id: item._id,
   }));
      console.log(incomesData);
      setIncomes(incomesData);
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(incomes);
  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/moneytracker/delete/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + parseInt(income.income.amount);
    });
    return totalIncome;
  };

  //calculate expenses
  const addExpense = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/expensetracker/add-expense`,
        {
          ...income,
          type: "expense",
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    getExpense();
  };

  const getExpense = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expensetracker/all`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setExpenses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/expensetracker/delete/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    getExpense();
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + parseInt(expense.amount);
    });
    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };
  const transactionHistory = () => {
    const incomeObjects = incomes.map((item) => item.income);
    const history = [...incomeObjects, ...expenses];
    console.log(history);
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        signupUser,
        setSignupUser,
        addUser,
        loginUserid,
        details,
        setDetails,
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
