import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatr.png'
import { signout } from '../../utils/icons'
import { menuItems } from '../../utils/menuItems'
import Button from '../Button/Button'
import { Link, useNavigate } from "react-router-dom";
function Navigation({active, setActive}) {
  const navigate = useNavigate()
  function handleSignout() {
    navigate('/')
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
    return (
      <NavStyled>
        <div className="user-con">
          <img src={avatar} alt="" />
          <div className="text">
            <h2>Pradee</h2>
            <p>Your Money</p>
          </div>
        </div>
        <ul className="menu-items">
          {menuItems.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? "active" : ""}
              >
                <Link to={item.link}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="bottom-nav">
          <li>
            <Button
              name="Sign Out"
              icon={signout}
              onClick={handleSignout}
              bg="#ffffff"
              bPad="0.5rem 1rem"
              color="#222260"
              bRad="10px"
            />
          </li>
        </div>
      </NavStyled>
    );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 300px;
  height: 600px;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
        margin-right: 1rem;
      }
      span {
        display: inline-block; 
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation