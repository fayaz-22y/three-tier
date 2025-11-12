import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://54.242.149.49:5000/api/products") // use your backend public IP
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="row">
      {products.map((p) => (
        <div key={p.id} className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src={p.image}
              alt={p.name}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text text-muted">${p.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;

