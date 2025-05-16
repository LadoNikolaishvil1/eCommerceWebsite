

const CartItem = ({ cart, setCart, summary }) => {
  return (
    <div className="cart-item">
      <img src={`/assets/cart/image-${cart.slug}.jpg`} alt="" />
      <div className="cart-item-text-box">
        <h1>{cart.shortName}</h1>
        <p>$ {cart.price.toLocaleString()}</p>
      </div>
      {summary ? (
        <div className="cart-item-quantity">
          <h1>x{cart.quantity}</h1>
        </div>
      ) : (
        <div className="increase-count">
          <span
            onClick={() => {
              if (cart.quantity <= 1) {
                setCart((prev) => prev.filter((item) => item.id !== cart.id));
                return;
              }
              setCart((prev) =>
                prev.map((item) =>
                  item.id === cart.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
              );
            }}
          >
            -
          </span>
          <h1>{cart.quantity}</h1>
          <span
            onClick={() => {
              setCart((prev) =>
                prev.map((item) =>
                  item.id === cart.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              );
            }}
          >
            +
          </span>
        </div>
      )}
    </div>
  );
};

export default CartItem;
