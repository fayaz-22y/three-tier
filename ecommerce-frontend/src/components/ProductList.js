import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://107.22.130.95:5000/api/products") // ✅ Backend API endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <div className="row">
      {products.length === 0 ? (
        <div className="text-center mt-5">
          <h4>🛍️ No products available</h4>
        </div>
      ) : (
        products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={p.image} // ✅ image URL directly from DB
                alt={p.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                onError={handleImageError} // ✅ No flickering now
              />
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">${p.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;

