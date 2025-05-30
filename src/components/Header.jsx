import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../hooks/useCart.jsx";
import { useEffect, useRef, useState } from "react";
import CardBox from "./CardBox.jsx";

const Header = ({ ableToAccessCart }) => {
  const burgerMenue = useRef(null);
  const { cart, setCart } = useCart();
  const [showMenue, setShowMenue] = useState(false)
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const toggleBurgerMenue = () => {
    setShowMenue(!showMenue)
  }

  useEffect(() => {
    if (showMenue) {
      burgerMenue.current.classList.add("active");
    } else {
      burgerMenue.current.classList.remove("active");
    }
  }, [showMenue]);

  return (
    <header>
      <div className="logo">
        <div className="burger-menu">
          <img
            className="burger-menu-img"
            src="/assets/shared/tablet/icon-hamburger.svg"
            alt=""
            onClick={toggleBurgerMenue}
          />
          <div className="card-container" ref={burgerMenue}>
            <CardBox inHeader={true} />
          </div>
        </div>
        <Link to="/">
          <img src="/assets/shared/desktop/logo.svg" alt="" />
        </Link>
      </div>

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
