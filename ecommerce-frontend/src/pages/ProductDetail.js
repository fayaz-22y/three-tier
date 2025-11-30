import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../style.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("Error loading product:", err));
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-left">
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${product.image_url || product.image?.trim()}`}
          alt={product.name}
          className="product-detail-img"
        />
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="pd-price">₹{product.price}</p>
        <p className="pd-desc">{product.description}</p>

        <button className="add-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;

