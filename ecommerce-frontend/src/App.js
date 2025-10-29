import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use backend container name inside Docker, or public IP when deployed
    const backendURL =
      process.env.REACT_APP_API_URL || "http://localhost:5000/api/products";

    axios
      .get(backendURL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ My E-commerce Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              margin: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img src={p.image} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

