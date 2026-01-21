import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import "./../style.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [search, setSearch] = useState(query);

  // Fetch products once
  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Debounce search → URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSearchParams({ q: search });
      } else {
        setSearchParams({});
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="products-page">
      <h2>Products</h2>

      <input
        className="search-input"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-muted">No products found</p>
      )}
    </div>
  );
}

export default Products;

