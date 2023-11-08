// import logo from './logo.svg';
import { styled } from "styled-components";
import "./App.css";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/layouts";
import Orb from "./components/Orb/Orb.js";
import Navigation from "./components/Navigation/Navigation.js";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Incomes";
import Expenses from "./components/Expenses/Expenses";
import { GlobalProvider, useGlobalContext } from "./context/globalContext";
import Account from "./components/Account/Account.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
 


  return (
    <GlobalProvider>
      <Router>
        <AppStyled bg={bg} className="App">
          <Orb />
          <MainLayout>
            <Routes>
              <Route exact path="/" element={<Account />} />
              <Route path="/dashboard" element={<DashboardWithNavigation />} />
              <Route path="/incomes" element={<IncomeWithNavigation />} />
              <Route path="/expenses" element={<ExpenseWithNavigation />} />
            </Routes>
          </MainLayout>
        </AppStyled>
      </Router>
    </GlobalProvider>
  );
}
const DashboardWithNavigation = () => {
    const [active, setActive] = useState(1);
  return (
    <>
      <Navigation setActive={setActive} />
      <Dashboard />
      
    </>
  );
};
const IncomeWithNavigation = () => {
  const [active, setActive] = useState(3);
  return (
    <>
      <Navigation setActive={setActive} />
      <Income />
    </>
  );
};
const ExpenseWithNavigation = () => {
  const [active, setActive] = useState(4);
  return (
    <>
      <Navigation setActive={setActive} />
      <Expenses />
    </>
  );
};
const AppStyled = styled.div`
height : 100vh
background-image:url(${(props) => props.bg});
position:relative;
 

 main{
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow : auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }

 }
 `;
export default App;
