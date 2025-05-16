import { useRef, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, showCart, setShowCart, toggleCart }) => {
  const navigate = useNavigate();
  const cartRef = useRef(null);

  useEffect(() => {
    if (showCart) {
      cartRef.current.classList.add("active");
    } else {
      cartRef.current.classList.remove("active");
    }
  }, [showCart]);

  useEffect(() => {
    let timeoutId;
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        showCart
      ) {
        console.log("Clicked outside of cart");
        toggleCart();
      }
    };

    if (showCart) {
      timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCart, toggleCart]);

  return (
    <div className="cart-dropdow-box" ref={cartRef}>
      <div className="cart-text-box">
        <h1>CART ({cart.length})</h1>
        <span onClick={() => setCart([])}>Remove all</span>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your cart is empty</h1>
        </div>
      ) : (
        <div className="cart-item-box">
          {cart.map((item) => (
            <CartItem cart={item} setCart={setCart} key={item.id} />
          ))}
        </div>
      )}
      <div className="cart-text-box">
        <p>TOTAL</p>
        <h1>
          $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString()}
        </h1>
      </div>
      <div
        className="see-product"
        onClick={() => {
          if(cart.length <= 0) return
          navigate("/checkout");
          window.scrollTo(0, 0);
          setShowCart(false)
        }}
      >
        CHECKOUT
      </div>
    </div>
  );
};

export default Cart;
