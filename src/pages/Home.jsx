import React from "react";
import Header from "../components/header.jsx";
import CardBox from "../components/CardBox.jsx";
import Footer from "../components/Footer.jsx";
import InfoBox from "../components/InfoBox.jsx";

const Home = () => {
  return (
    <div>
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
              <button className="see-product">SEE PRODUCT</button>
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
                src="/assets/home/desktop/image-speaker-zx9.png"
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
                <button className="see-product" style={{ background: "#000" }}>
                  SEE PRODUCT
                </button>
              </div>
            </div>
            <div className="Zx7-speaker">
              <h1>ZX7 SPEAKER</h1>
              <button className="see-product">SEE PRODUCT</button>
            </div>
            <div className="Yx1-earphones">
              <div className="img-box"></div>
              <div className="text-box">
                <h1>YX1 EARPHONES</h1>
                <button className="see-product">SEE PRODUCT</button>
              </div>
            </div>
          </div>
          <InfoBox />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
