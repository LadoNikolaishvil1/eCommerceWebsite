import React from "react";
import { Link } from "react-router-dom";

const CardBox = () => {
  return (
    <div className="card-box">
      <div className="card">
        <div className="card-img-box">
          <img
            src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
            alt=""
            className="card-img"
          />
        </div>
        <h1>HEADPHONES</h1>
        <a href="/headphones">
          <h2>SHOP</h2>
          <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="" />
        </a>
        <div className="card-bg"></div>
      </div>
      <div className="card">
        <div className="card-img-box">
          <img
            src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
            alt=""
            className="card-img"
          />
        </div>
        <h1>SPEAKERS</h1>
        <a href="/speakers">
          <h2>SHOP</h2>
          <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="" />
        </a>
        <div className="card-bg"></div>
      </div>
      <div className="card">
        <div className="card-img-box">
          <img
            src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
            alt=""
            className="card-img"
          />
        </div>
        <h1>EARPHONES</h1>
        <a href="/earphones">
          <h2>SHOP</h2>
          <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="" />
        </a>
        <div className="card-bg"></div>
      </div>
    </div>
  );
};

export default CardBox;
