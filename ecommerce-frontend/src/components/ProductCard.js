import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./../style.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // 🔒 Build image URL safely
  // Backend sends: image_url = "cat.jpg"  OR  "/uploads/cat.jpg"
  const imageSrc = product.image_url
    ? product.image_url.startsWith("/uploads")
      ? `${process.env.REACT_APP_API_URL}${product.image_url}`
      : `${process.env.REACT_APP_API_URL}/uploads/${product.image_url}`
    : "/no-image.png";

  return (
    <div className="modern-card fade-in">
      <img
        src={imageSrc}
        alt={product.name}
        className="modern-card-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/no-image.png";
        }}
      />

      <h4 className="modern-card-title">{product.name}</h4>
      <p className="modern-card-price">₹{product.price}</p>

      <Link to={`/product/${product.id}`} className="btn modern-view-btn">
        View Product
      </Link>

      <button
        className="btn modern-add-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

