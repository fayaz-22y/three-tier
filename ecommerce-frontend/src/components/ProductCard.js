import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./../style.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const imageSrc = product.image_url || "/no-image.png";

  return (
    <div className="product-card">
      <div className="product-img-box">
        <img
          src={imageSrc}
          alt={product.name}
          onError={(e) => (e.target.src = "/no-image.png")}
        />
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="price">₹{product.price}</p>

        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn-outline">
            View
          </Link>
          <button className="btn-primary" onClick={() => addToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

