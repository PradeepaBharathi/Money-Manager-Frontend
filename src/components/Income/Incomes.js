import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

import Navigation from "../Navigation/Navigation";
function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <div>
      <IncomeStyled>
        <InnerLayout>
          <h2>Incomes</h2>
          <h4 className="total-income">
            {" "}
            Total Income: <span>${totalIncome()}</span>{" "}
          </h4>
          <div className="income-content">
            <div className="form-container">
              <Form />
            </div>
            <div className="incomes">
              {incomes &&
                incomes instanceof Array &&
                incomes.map((income) => {
                  const {
                    _id,
                    title,
                    amount,
                    date,
                    category,
                    description,
                    type,
                  } = income;

                  return (
                    <IncomeItem
                      key={_id}
                      id={_id}
                      income={{
                        ...income,
                        amount: parseInt(amount),
                      }}
                      indicatorColor="var(--color-green)"
                      deleteItem={deleteIncome}
                    />
                  );
                })}
            </div>
          </div>
        </InnerLayout>
      </IncomeStyled>
    </div>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
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
    width: 70vw;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;
