import data from "../data.json";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/header";
import InfoBox from "../components/InfoBox";
import CardBox from "../components/CardBox";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const validCategories = ["headphones", "earphones", "speakers"];

const ShopCategorys = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState();

  if (!validCategories.includes(category)) {
    return <Navigate to="/error" />;
  }

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
      <div className="categorys-header-box">
        <Header />
        <div className="content-wrapper">
          <h1>{category.toUpperCase()}</h1>
        </div>
      </div>
      <section>
        <div className="items-box">
          {data
            .filter((item) => item.category === category)
            .reverse()
            .map((item, index) => (
              <div
                className={`item ${index % 2 !== 0 ? "item-reverse" : ""}`}
                key={item.id}
              >
                <img src={item.categoryImage[device]} alt="" />
                <div className="container">
                  <div className="main-text-box">
                    {item.new && <h2>NEW PRODUCT</h2>}
                    <h1>{item.name.toUpperCase()}</h1>
                    <p>{item.description}</p>
                    <button
                      className="see-product"
                      onClick={() => {
                        navigate(`/shop/item/${item.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      SEE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <CardBox />
        <InfoBox />
      </section>
      <Footer />
    </main>
  );
};

export default ShopCategorys;
