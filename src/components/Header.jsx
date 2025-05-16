import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../hooks/useCart.jsx";
import { useState } from "react";

const Header = ({ ableToAccessCart }) => {
  const { cart, setCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
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
      <div
        className="cart-box"
        style={{ pointerEvents: `${ableToAccessCart ? "none" : "all"}` }}
      >
        <img
          className="cart"
          src="/assets/shared/desktop/icon-cart.svg"
          alt=""
          onClick={toggleCart}
        />
        {cart.length > 0 && (
          <span className="cart-count" onClick={toggleCart}>
            {cart.length}
          </span>
        )}
        <Cart
          cart={cart}
          setCart={setCart}
          showCart={showCart}
          setShowCart={setShowCart}
          toggleCart={toggleCart}
        />
      </div>
    </header>
  );
};

export default Header;
