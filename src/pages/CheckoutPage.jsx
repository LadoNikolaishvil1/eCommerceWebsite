import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../validations/Checkout.validations.js";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import SummaryPopUp from "../components/SummaryPopUp.jsx";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const eMoneyRef = useRef(null);
  const CashRef = useRef(null);
  const checkoutRef = useRef(null);
  const paymentDetailsRef = useRef(null);
  const [baseHeight, setBaseheight] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState([]);
  const [finnishedCheckout, setFinnishedCheckout] = useState(false);

  useEffect(() => {
    const height = checkoutRef.current?.scrollHeight || 0;
    setBaseheight(height);
  }, []);

  useEffect(() => {
    if (cart.length <= 0) {
      setFinnishedCheckout(false);
    }
  }, [cart]);

  useEffect(() => {
    if (finnishedCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [finnishedCheckout]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const watchedPaymentMethod = watch("paymentMethod");

  const TotalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const VAT = Math.round(TotalPrice * 0.2);
  const Shipping = 50;
  const GrandToatal = TotalPrice + VAT + Shipping;

  useEffect(() => {
    const checkoutEl = checkoutRef.current;
    const eMoneyEl = eMoneyRef.current;
    const cashEl = CashRef.current;

    if (!checkoutEl || !eMoneyEl || !cashEl) return;

    eMoneyEl.style.opacity = "0";
    cashEl.style.opacity = "0";
    eMoneyEl.style.display = "none";
    cashEl.style.display = "none";

    checkoutEl.style.height = `${baseHeight}px`;

    requestAnimationFrame(() => {
      if (watchedPaymentMethod === "e-Money") {
        eMoneyEl.style.display = "flex";
      } else if (watchedPaymentMethod === "Cash on Delivery") {
        cashEl.style.display = "flex";
      }

      requestAnimationFrame(() => {
        if (watchedPaymentMethod === "Cash on Delivery") {
          const cashHeight = cashEl.scrollHeight;
          checkoutEl.style.height = `${baseHeight + cashHeight + 24}px`;
          cashEl.style.opacity = "1";
        } else if (watchedPaymentMethod === "e-Money") {
          const eMoneyHeight = eMoneyEl.scrollHeight;
          checkoutEl.style.height = `${baseHeight + eMoneyHeight + 24}px`;
          eMoneyEl.style.opacity = "1";
        }
      });
    });
  }, [watchedPaymentMethod]);

  const onSubmit = (data) => {
    setCheckoutInfo([...checkoutInfo, data]);
    setFinnishedCheckout(true);
    reset();
  };

  return (
    <main style={{ background: "#F1F1F1" }}>
      <div className="item-header-box">
        <Header ableToAccessCart={true} />
      </div>
      <section className="checkout-section">
        <h3 onClick={() => navigate(-1)}>Go Back</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout" ref={checkoutRef}>
            <h1>CHECKOUT</h1>
            <div className="input-container">
              <span>Billing Details</span>
              <div className="double-input-box">
                <div className={`input-box ${errors.name && "error"}`}>
                  <label>Name</label>
                  <input type="text" {...register("name")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.name && "1" }}
                  >
                    {errors.name?.message}
                  </p>
                </div>
                <div className={`input-box ${errors.email && "error"}`}>
                  <label>Email Address</label>
                  <input type="text" {...register("email")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.email && "1" }}
                  >
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className={`input-box ${errors.phone && "error"}`}>
                <label>Phone Number</label>
                <input type="text" {...register("phone")} />
                <p
                  className="error-text"
                  style={{ opacity: errors.phone && "1" }}
                >
                  {errors.phone?.message}
                </p>
              </div>
            </div>
            <div className="input-container">
              <span>SHIPPING INFO</span>
              <div
                className={`input-box ${errors.address && "error"}`}
                style={{ width: "100%" }}
              >
                <label>Address</label>
                <input type="text" {...register("address")} />
                <p
                  className="error-text"
                  style={{ opacity: errors.address && "1" }}
                >
                  {errors.address?.message}
                </p>
              </div>
              <div className="double-input-box">
                <div className={`input-box ${errors.zip && "error"}`}>
                  <label>ZIP Code</label>
                  <input type="text" {...register("zip")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.zip && "1" }}
                  >
                    {errors.zip?.message}
                  </p>
                </div>
                <div className={`input-box ${errors.city && "error"}`}>
                  <label>City</label>
                  <input type="text" {...register("city")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.city && "1" }}
                  >
                    {errors.city?.message}
                  </p>
                </div>
              </div>
              <div className={`input-box ${errors.country && "error"}`}>
                <label>Country</label>
                <input type="text" {...register("country")} />
                <p
                  className="error-text"
                  style={{ opacity: errors.country && "1" }}
                >
                  {errors.country?.message}
                </p>
              </div>
            </div>
            <div className="input-container" ref={paymentDetailsRef}>
              <span>PAYMENT DETAILS</span>
              <div className="double-input-box payment-method">
                <div className="text">
                  <h4>Payment Method</h4>
                  <p
                    className="error-text"
                    style={{ opacity: errors.paymentMethod && "1" }}
                  >
                    {errors.paymentMethod?.message}
                  </p>
                </div>
                <div className="double-input-box">
                  <div
                    className={`input-box ${errors.paymentMethod && "error"}`}
                  >
                    <label
                      className={`radio-label ${
                        watchedPaymentMethod === "e-Money" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        value="e-Money"
                        {...register("paymentMethod")}
                      />
                      <h1>e-Money</h1>
                    </label>
                  </div>
                  <div
                    className={`input-box ${errors.paymentMethod && "error"}`}
                  >
                    <label
                      className={`radio-label ${
                        watchedPaymentMethod === "Cash on Delivery"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        value="Cash on Delivery"
                        {...register("paymentMethod")}
                      />
                      <h1>Cash on Delivery</h1>
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="double-input-box"
                ref={eMoneyRef}
                style={{ opacity: "0" }}
              >
                <div className={`input-box ${errors.eMoneyNumber && "error"}`}>
                  <label>e-Money Number</label>
                  <input type="text" {...register("eMoneyNumber")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.eMoneyNumber && "1" }}
                  >
                    {errors.eMoneyNumber?.message}
                  </p>
                </div>
                <div className={`input-box ${errors.eMoneyPin && "error"}`}>
                  <label>e-Money PIN</label>
                  <input type="text" {...register("eMoneyPin")} />
                  <p
                    className="error-text"
                    style={{ opacity: errors.eMoneyPin && "1" }}
                  >
                    {errors.eMoneyPin?.message}
                  </p>
                </div>
              </div>
              <div
                className="cash-popUp"
                ref={CashRef}
                style={{ opacity: "0" }}
              >
                <img src="/assets/checkout/icon-cash-on-delivery.svg" alt="" />
                <p>
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="summary">
              <h1>SUMMARY</h1>
              <div className="cart-item-box">
                {cart.map((item) => (
                  <CartItem
                    cart={item}
                    setCart={setCart}
                    summary={true}
                    key={item.id}
                  />
                ))}
              </div>
              <div className="cart-text-box-container">
                <div className="cart-text-box">
                  <p>TOTAL</p>
                  <h1>$ {TotalPrice.toLocaleString()}</h1>
                </div>
                <div className="cart-text-box">
                  <p>SHIPPING</p>
                  <h1>$ {Shipping.toLocaleString()}</h1>
                </div>
                <div className="cart-text-box">
                  <p>VAT (INCLUDED)</p>
                  <h1>$ {VAT.toLocaleString()}</h1>
                </div>
              </div>
              <div className="cart-text-box">
                <p>GRAND TOTAL</p>
                <h1 style={{ color: "#d87d4a" }}>
                  ${GrandToatal.toLocaleString()}
                </h1>
              </div>
              <button type="submit" className="see-product">
                CONTINUE & PAY
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
      {finnishedCheckout && (
        <SummaryPopUp cart={cart} grandTotal={GrandToatal} setCart={setCart} />
      )}
    </main>
  );
};

export default CheckoutPage;
