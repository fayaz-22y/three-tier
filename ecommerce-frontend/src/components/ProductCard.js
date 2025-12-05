import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./../style.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="modern-card fade-in">
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

      <button className="btn modern-add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

