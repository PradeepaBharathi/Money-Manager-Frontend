import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/layouts";
import Form from "../Form/Form";

import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

function Expenses() {
  const { addIncome, expenses, getExpense, deleteExpense, totalExpense } =
    useGlobalContext();

  useEffect(() => {
    getExpense();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpense()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses &&
              expenses instanceof Array &&
              expenses.map((income) => {
                const {
                  _id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                } = income;
                console.log(income);
                return (
                  <ExpenseItem
                    key={_id}
                    id={_id}
                    income={income}
                    type={type}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  
  margin:0 auto;
   h1 {
    margin-left: -5%; /* Adjust the value as needed */
  }
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 0.2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 0.2rem;
    margin: 0.3rem 0;
    font-size: 1rem;
    gap: 0.5rem;
    span {
      font-size: 1rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 1rem;
    height: 70vh;
    width: 80vw;
    .incomes {
        display:flex;
        flex-direction:column;
        align-items:center
      flex: 1;
    }
  }
`;

export default Expenses;
