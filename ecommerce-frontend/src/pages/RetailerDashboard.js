import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../style.css";

function RetailerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyProducts();
    fetchMyOrders();
  }, []);

  /* ================= FETCH DATA ================= */
  const fetchMyProducts = async () => {
    try {
      const res = await axios.get("/api/products/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    }
  };

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get("/api/orders/retailer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
      setOrders([]);
    }
  };

  /* ================= ADD PRODUCT ================= */
  const addProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("image", form.image);

    try {
      await axios.post("/api/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ name: "", price: "", description: "", image: null });
      fetchMyProducts();
      alert("Product added successfully");
    } catch {
      alert("Failed to add product");
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total),
    0
  );

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Retailer Dashboard</h1>

      {/* ================= ADD PRODUCT ================= */}
      <section className="dashboard-section">
        <h2>Add New Product</h2>

        <form className="add-product-form" onSubmit={addProduct}>
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
            required
          />

          <button className="btn-primary">Add Product</button>
        </form>
      </section>

      {/* ================= MY PRODUCTS ================= */}
      <section className="dashboard-section">
        <h2>My Products</h2>

        {products.length === 0 ? (
          <p className="text-muted">No products added yet</p>
        ) : (
          <div className="retailer-products-grid">
            {products.map((product) => (
              <div key={product.id} className="retailer-product-card">
                <img src={product.image_url} alt={product.name} />
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
                <button
                  className="btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SALES ================= */}
      <section className="dashboard-section">
        <h2>Sales Overview</h2>

        <div className="sales-cards">
          <div className="sales-card">
            <h4>Total Orders</h4>
            <p>{orders.length}</p>
          </div>
          <div className="sales-card">
            <h4>Total Revenue</h4>
            <p>₹{totalRevenue}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="text-muted">No orders yet</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>₹{o.total}</td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default RetailerDashboard;

