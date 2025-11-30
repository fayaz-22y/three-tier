import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./../style.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error loading products:", err));
  }, []);

  return (
    <div className="products-container">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;

