import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { InnerLayout } from '../../styles/layouts';

import { dollar } from '../../utils/icons';
import Hostory from '../History/Hostory';
import { useGlobalContext } from '../../context/globalContext';

function Dashboard() {
  const{totalIncome,totalExpense,totalBalance,getIncomes,getExpense,incomes,expenses}=useGlobalContext()
 
 useEffect(()=>{
  getIncomes()
  getExpense()
 },[])
 
  return (
    // <h1>hello</h1>
    <DashboardStyled>
        <InnerLayout>
          <h1>All Transaction</h1>
          <div className='amount-con'>
            <div className='income'>
              <h2>Total Income</h2>
              <p>{dollar} {totalIncome()}</p>
            </div>
            <div className='expense'>
              <h2>Total Expense</h2>
              <p>{dollar} {totalExpense()}</p>
            </div>
            <div className='balance'>
            <h2>Total balance</h2>
              <p>{dollar} {totalBalance()}</p>
            </div>
            <div className='history-con'>
                  <Hostory/>
                  
            </div>
          </div>
            </InnerLayout>
        </DashboardStyled>

  )
}


const DashboardStyled = styled.div`
.amount-con{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  .income, .expense{
      grid-column: span 1;
  }
  .income, .expense, .balance{
      background: #FCF6F9;
      border: 1px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      padding: 0.5rem;
      p{
          font-size: 1.5rem;
          font-weight: 600;
      }
      .balance{
        grid-column: 2 / 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
        }
        .history-con{
          grid-column: 3 / -1;
          h2{
              margin: 1rem 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
          }
          .salary-title{
              font-size: 1.2rem;
              justify-content: space-around;
              span{
                  font-size: 1.8rem;
              }
          }
          .salary-item{
              background: #FCF6F9;
              border: 2px solid #FFFFFF;
              box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
              padding: 1rem;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              p{
                  font-weight: 600;
                  font-size: 1.6rem;
              }
          }
`;
export default Dashboard