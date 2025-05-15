import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="line"></div>
      <div className="links">
        <img src="/assets/shared/desktop/logo.svg" alt="" />
        <ul>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/headphones">HEADPHONES</a>
          </li>
          <li>
            <a href="/speakers">SPEAKERS</a>
          </li>
          <li>
            <a href="/earphones">EARPHONES</a>
          </li>
        </ul>
      </div>
      <div className="text">
        <p>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team <br /> of music lovers and sound specialists who are
          devoted to helping you get the <br /> most out of personal audio. Come
          and visit our demo facility - we’re open 7 <br /> days a week.
        </p>
      </div>
      <div className="footer-end">
        <p>Copyright 2021. All Rights Reserved</p>
        <div className="social-media">
          <img src="/assets/shared/desktop/icon-facebook.svg" alt="" />
          <img src="/assets/shared/desktop/icon-instagram.svg" alt="" />
          <img src="/assets/shared/desktop/icon-twitter.svg" alt="" />
        </div>
      </div>
    </footer>
  );
}

export default Footer
