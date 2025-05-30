import { useEffect, useState } from "react";
import data from "../data.json";
import Header from "../components/header";
import InfoBox from "../components/InfoBox";
import CardBox from "../components/CardBox";
import Footer from "../components/Footer";
import {
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useCart } from "../hooks/useCart.jsx";

const ItemPage = () => {
  const { cart, setCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [device, setDevice] = useState();

  if (!data.some((item) => item.id === parseInt(id))) {
    return <Navigate to="/error" />;
  }

  const item = data.find((item) => item.id === parseInt(id));

  const handleAddToCart = () => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + count }
          : cartItem
      );
      console.log("Updating existing item:", updatedCart);
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: count }]);
    }
  };

    useEffect(() => {
      const detectDevice = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setDevice("mobile");
        } else if (width >= 768 && width <= 1024) {
          setDevice("tablet");
        } else {
          setDevice("desktop");
        }
      };
  
      detectDevice();
      window.addEventListener("resize", detectDevice);
  
      console.log(device);
  
      return () => window.removeEventListener("resize", detectDevice);
    }, []);
  return (
    <main>
      <div className="item-header-box">
        <Header />
      </div>
      <section>
        <div className="item-container">
          <h3 onClick={() => navigate(-1)}>Go Back</h3>
          <div className="item">
            <img src={item.image[device]} alt="" />
            <div className="container">
              <div className="main-text-box">
                {item.new && <h2>NEW PRODUCT</h2>}
                <h1>{item.name.toUpperCase()}</h1>
                <p>{item.description}</p>
                <h3>$ {item.price.toLocaleString()}</h3>
                <div className="btn-box">
                  <div className="increase-count">
                    <span
                      onClick={() => {
                        if (count <= 1) return;
                        setCount(count - 1);
                      }}
                    >
                      -
                    </span>
                    <h1>{count}</h1>
                    <span
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      +
                    </span>
                  </div>
                  <button className="see-product" onClick={handleAddToCart}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="additional-info">
          <div className="features">
            <h1>FEATURES</h1>
            <p>
              {item.features.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="in-the-box">
            <ul>
              <h1>IN THE BOX</h1>
              <ul>
                {item.includes.map((item) => (
                  <li key={item.item}>
                    <span>{item.quantity}x</span>
                    <p>{item.item}</p>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
        <div className="item-img-box">
          <div>
            <img src={item.gallery.first[device]} alt="" />
            <img src={item.gallery.second[device]} alt="" />
          </div>
          <img src={item.gallery.third[device]} alt="" />
        </div>
        <div className="also-like">
          <h1>YOU MAY ALSO LIKE</h1>
          <div className="recommendations">
            {item.others.map((rec) => (
              <div className="recommendation-box" key={rec.slug}>
                <img src={rec.image[device]} alt="" />
                <h1>{rec.name}</h1>
                <button
                  className="see-product"
                  onClick={() => {
                    const recItem = data.find((item) => item.slug === rec.slug);
                    if (recItem) {
                      navigate(`/shop/item/${recItem.id}`);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  SEE PRODUCT
                </button>
              </div>
            ))}
          </div>
        </div>
        <CardBox />
        <InfoBox />
      </section>
      <Footer />
    </main>
  );
};

export default ItemPage;
