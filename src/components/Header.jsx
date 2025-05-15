import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img className="logo" src="/assets/shared/desktop/logo.svg" alt="" />
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/headphones">HEADPHONES</Link>
        </li>
        <li>
          <Link to="/speakers">SPEAKERS</Link>
        </li>
        <li>
          <Link to="/earphones">EARPHONES</Link>
        </li>
      </ul>
      <img className="cart" src="/assets/shared/desktop/icon-cart.svg" alt="" />
    </header>
  );
};

export default Header;
