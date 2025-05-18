import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem.jsx";

const SummaryPopUp = ({ cart, grandTotal, setCart }) => {
  const navigate = useNavigate();
  const [showAllItems, setShowAllItems] = useState(false);
  const itemBoxRef = useRef(null);
  const [showViewLess, setShowViewLess] = useState(false);

  useEffect(() => {
    if (!itemBoxRef.current) return;

    const itemBoxEl = itemBoxRef.current;
    const children = itemBoxEl.children;

    const singleItemHeight = children[0]?.scrollHeight || 0;
    const fullHeight = itemBoxEl.scrollHeight;

    for (let i = 1; i < children.length; i++) {
      children[i].style.opacity = "0";
    }

    if (showAllItems) {
      itemBoxEl.style.height = `${fullHeight}px`;
      if (fullHeight > singleItemHeight * 4) {
        console.log("more then", singleItemHeight * 3);
        itemBoxEl.style.maxHeight = `${singleItemHeight * 4}px`;
        setTimeout(() => {
          itemBoxEl.style.overflowY = "scroll";
          setShowViewLess(true);
          for (let i = 1; i < 3; i++) {
            children[i].style.opacity = "1";
          }
        }, 300);
      }
      setTimeout(() => {
        setShowViewLess(true);
        for (let i = 1; i < children.length; i++) {
          children[i].style.opacity = "1";
        }
      }, 300);
    } else {
      if (fullHeight > singleItemHeight * 3) {
        itemBoxEl.style.maxHeight = `auto`;
        itemBoxEl.style.overflow = "hidden";
      }
      itemBoxEl.style.height = `${singleItemHeight}px`;
      setShowViewLess(false);
    }
  }, [showAllItems]);
  return (
    <div className="summary-popUp">
      <div className="bg"></div>
      <div className="popUp-container">
        <img
          src="/assets/checkout/icon-order-confirmation.svg"
          alt=""
          className="popUp-icon"
        />
        <h1 className="popUp-thx">
          THANK YOU <br /> FOR YOUR ORDER
        </h1>
        <h5>You will receive an email confirmation shortly.</h5>
        <div className="popUp-summery-box">
          <div className="wrapper">
            <div
              className="cart-item-box"
              style={{
                minHeight: "auto",
                marginBottom: "12px",
                overflow: "hidden",
              }}
              ref={itemBoxRef}
            >
              {cart.map((item) => (
                <CartItem cart={item} summary={true} key={item.id} />
              ))}
            </div>
            {cart.length > 1 && (
              <h2
                onClick={() => {
                  const children = itemBoxRef.current.children;
                  const singleItemHeight = children[0]?.scrollHeight || 0;
                  const fullHeight = itemBoxRef.current.scrollHeight;
                  if (fullHeight > singleItemHeight * 4 && showAllItems) {
                    for (let i = 0; i < children.length; i++) {
                      children[i].style.opacity = "0";
                    }
                    setTimeout(() => {
                      itemBoxRef.current.scrollTo(0, 0);
                      children[0].style.opacity = "1";
                    }, 500);
                  }
                  setShowAllItems(!showAllItems);
                }}
              >
                <span style={{ opacity: showAllItems && "0" }}>
                  and {cart.length - 1} other item{cart.length > 2 && "(s)"}
                </span>
                <span style={{ opacity: showViewLess ? "1" : "0" }}>
                  View less
                </span>
              </h2>
            )}
          </div>
          <div className="grandTotal-box">
            <span>GRAND TOTAL</span>
            <h3>$ {grandTotal.toLocaleString()}</h3>
          </div>
        </div>
        <div
          className="see-product"
          onClick={() => {
            navigate("/");
            setCart([]);
            window.scrollTo(0, 0);
          }}
        >
          BACK TO HOME
        </div>
      </div>
    </div>
  );
};

export default SummaryPopUp;
