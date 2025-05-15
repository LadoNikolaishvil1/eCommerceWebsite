import CartItem from "./CartItem";

const Cart = ({ cart, setCart, ref }) => {
  return (
    <div className="cart-dropdow-box" ref={ref}>
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
      <div className="see-product">CHECKOUT</div>
    </div>
  );
};

export default Cart;
