import React from "react";
import { Link } from "react-router-dom";
import "./../style.css";

function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">Step Into Style</h1>
          <p className="hero-subtitle">
            Explore premium footwear designed for comfort, quality, and attitude.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now →
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f"
            alt="Shoes"
          />
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="featured-section">
        <h2>Featured Collections</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1606813907291-26e5f3c5f31f" alt="" />
            <h4>Sport Shoes</h4>
          </div>

          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1528701800489-20be3c2c6422" alt="" />
            <h4>Casual Wear</h4>
          </div>

          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1517170650633-7dff61218a00" alt="" />
            <h4>Premium Collection</h4>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

