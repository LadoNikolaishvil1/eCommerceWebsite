import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../hooks/useCart.jsx";
import { useRef } from "react";

const Header = () => {
  const { cart, setCart } = useCart();
  const CartComponent = useRef(null);
  const toggleCart = () => {
    if (CartComponent.current) {
      CartComponent.current.classList.toggle("active");
      console.log("toggled");
    }
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
      <div className="cart-box">
        <img
          className="cart"
          src="/assets/shared/desktop/icon-cart.svg"
          alt=""
          onClick={toggleCart}
        />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        <Cart ref={CartComponent} cart={cart} setCart={setCart} />
      </div>
    </header>
  );
};

export default Header;
