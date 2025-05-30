import Header from "../components/header.jsx";
import CardBox from "../components/CardBox.jsx";
import Footer from "../components/Footer.jsx";
import InfoBox from "../components/InfoBox.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [device, setDevice] = useState()

  const navToItem = (id) => {
    navigate(`/shop/item/${id}`);
    window.scrollTo(0, 0);
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

    return () => window.removeEventListener("resize", detectDevice);
  }, []);
  return (
    <main>
      <div className="header-box">
        <Header />
        <div className="content-wrapper">
          <div className="main-text-box">
            <h2>NEW PRODUCT</h2>
            <h1>
              XX99 MARK II <br /> HEADPHONES
            </h1>
            <p>
              Experience natural, lifelike audio and exceptional <br /> build
              quality made for the passionate music <br /> enthusiast.
            </p>
            <button className="see-product" onClick={() => navToItem(4)}>
              SEE PRODUCT
            </button>
          </div>
        </div>
      </div>
      <section>
        <CardBox />
        <div className="products">
          <div className="Zx9-speaker">
            <img
              className="circle"
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
            />
            <img
              className="speaker-img"
              src={`/assets/home/${device}/image-speaker-zx9.png`}
              alt=""
            />
            <div className="main-text-box">
              <h1>
                ZX9 <br /> SPEAKER
              </h1>
              <p>
                Upgrade to premium speakers that are <br /> phenomenally built
                to deliver truly remarkable <br /> sound.
              </p>
              <button className="see-product" onClick={() => navToItem(6)}>
                SEE PRODUCT
              </button>
            </div>
          </div>
          <div className="Zx7-speaker">
            <h1>ZX7 SPEAKER</h1>
            <button className="see-product" onClick={() => navToItem(5)}>
              SEE PRODUCT
            </button>
          </div>
          <div className="Yx1-earphones">
            <div className="img-box"></div>
            <div className="text-box">
              <h1>YX1 EARPHONES</h1>
              <button className="see-product" onClick={() => navToItem(1)}>
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>
        <InfoBox />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
