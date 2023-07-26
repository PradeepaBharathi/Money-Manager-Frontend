// import logo from './logo.svg';
import { styled } from 'styled-components';
import './App.css';
import bg from './img/bg.png'
import {MainLayout} from './styles/layouts'
import Orb from './components/Orb/Orb.js'
import Navigation from './components/Navigation/Navigation.js';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Incomes';
import Expenses from './components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
function App() {

  const [active,setActive] = useState(1)

   const global = useGlobalContext();
   console.log(global)


  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard />
        case 2:
          return <Dashboard />
          case 3:
            return <Income />
            case 4:
              return <Expenses />
              default :
              return <Dashboard />
    }
  }
  
  return (
    <AppStyled bg = {bg} className = 'App'>
      <Orb />
            <MainLayout>
        <Navigation active ={active}setActive={setActive}/>
        <main>
           {displayData()}
        </main>
      
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
height : 100vh
background-image:url(${props=>props.bg});
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
 `
;

export default App;
