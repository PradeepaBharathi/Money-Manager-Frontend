import React from 'react'
import { keyframes, styled } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {

    const{width,height}= useWindowSize()
   


    const moveOrb = keyframes`
    0%{
        transform : translate(0,0);
    }
    50%{
        transform : translate(${width/1.2}px,${height/1.5}px);
    }
    100%{
        transform : translate(0,0);
    }
    
    `
    const OrbStyled = styled.div`
    width :70vh;
    height:70vh;
    position:absolute;
    border-radius:50%;
    margin-left :-37vh;
    margim-right : -37vh;
    background: red;
    filter: blur(400px);
    animation:  ${moveOrb} 15s alternate linear infinite;

    `;

  return (
    <OrbStyled></OrbStyled>
  )
}

export default Orb