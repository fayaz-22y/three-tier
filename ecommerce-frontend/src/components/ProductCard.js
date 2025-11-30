import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="modern-card">
      <img
        src={`${process.env.REACT_APP_API_URL}/uploads/${product.image?.trim()}`}
        alt={product.name}
        className="modern-card-img"
      />

      <h4 className="modern-card-title">{product.name}</h4>
      <p className="modern-card-price">₹{product.price}</p>

      <Link to={`/product/${product.id}`} className="btn modern-view-btn">
        View Product
      </Link>
    </div>
  );
}

export default ProductCard;

