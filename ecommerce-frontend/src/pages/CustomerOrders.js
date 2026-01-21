import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../style.css";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container orders-page">
      <h2 className="page-title">My Orders</h2>

      {loading && <p className="text-muted">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="empty-state">
          <p>No orders yet</p>
          <span className="text-muted">
            Your placed orders will appear here
          </span>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card fade-in">
              <div className="order-row">
                <span className="order-label">Order ID</span>
                <span className="order-value">#{order.id}</span>
              </div>

              <div className="order-row">
                <span className="order-label">Total</span>
                <span className="order-price">₹{order.total}</span>
              </div>

              <div className="order-row">
                <span className="order-label">Date</span>
                <span className="order-value">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <span className="order-status">Placed</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;

