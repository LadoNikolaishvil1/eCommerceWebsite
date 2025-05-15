import React from 'react'
import data from '../data.json'
import { useParams, Navigate } from "react-router-dom";
import Header from '../components/header';
import InfoBox from '../components/InfoBox';
import CardBox from '../components/CardBox';
import Footer from '../components/Footer';

const validCategories = ["headphones", "earphones", "speakers"];

const ShopCategorys = () => {
    const { category } = useParams();

    if (!validCategories.includes(category)) {
      return <Navigate to="/error" />; 
    }

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
                <img src={item.image.desktop} alt="" />
                <div className="container">
                  <div className="main-text-box">
                    {item.new && <h2>NEW PRODUCT</h2>}
                    <h1>{item.name.toUpperCase()}</h1>
                    <p>{item.description}</p>
                    <button className="see-product">SEE PRODUCT</button>
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
}

export default ShopCategorys
