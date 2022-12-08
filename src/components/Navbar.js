import styled from "styled-components";
import React from "react";
import useUser from "../functions/Store";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {

  const signOut = useUser(state => state.logoutUser)
  const reset = useUser(state => state.reset)
  const handlelogout = () => {
    signOut()
    reset()
  }
  return (
    <Nav>
      <Link to="/">
      <Logo src="/images/logo.svg" alt="disney+" /></Link>
      <NavMenu>
        <Link to="/">
          <img src="/images/home-icon.svg" alt="home" />
          <span>Home</span>
        </Link>
        <a href="/">
          <img src="/images/search-icon.svg" alt="search" />
          <span>Search</span>
        </a>
        <Link to="/watchlist">
          <img src="/images/watchlist-icon.svg" alt="watchlist" />
          <span>watchlist</span>
        </Link>
      {/* eslint-disable-next-line */}
        <a  href="#">
          <img src="/images/original-icon.svg" alt="originals" />
          <span>originals</span>
        </a>
        {/* eslint-disable-next-line */}
        <a  href="#">
          <img src="/images/movie-icon.svg" alt="movies" />
          <span>movies</span>
        </a>
        {/* eslint-disable-next-line */}
        <a  href="#">
          <img src="/images/series-icon.svg" alt="series" />
          <span>series</span>
        </a>
      </NavMenu>
      {!user && <Login href="/login">Login</Login>}
      {user && <Logout onClick={handlelogout}>Logout</Logout>}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.img`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0px;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      margin-left: 6px;
      font-size: 15px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    transition: all 0.2s ease-out;
  }

  &:active {
    background-color: rgb(0, 0, 0);
    color: #f9f9f9;
  }
`;

const Logout = styled.a`
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    transition: all 0.2s ease-out;
  }

  &:active {
    background-color: rgb(0, 0, 0);
    color: #f9f9f9;
  }
`;

export default Navbar;
