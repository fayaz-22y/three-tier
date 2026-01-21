import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./../style.css";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="centered">Loading...</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">

        <div className="product-detail-image">
          <img src={product.image_url} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="pd-price">₹{product.price}</p>
          <p className="pd-desc">{product.description}</p>

          <button
            className="btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;

