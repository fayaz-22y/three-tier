import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../style.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get("/api/orders/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* ===== STATS ===== */}
      {stats && (
        <div className="admin-stats">
          <div className="stat-box">Customers<br /><strong>{stats.customers}</strong></div>
          <div className="stat-box">Retailers<br /><strong>{stats.retailers}</strong></div>
          <div className="stat-box">Orders<br /><strong>{stats.orders}</strong></div>
          <div className="stat-box">Revenue<br /><strong>₹{stats.revenue}</strong></div>
        </div>
      )}

      {/* ===== USERS ===== */}
      <section className="dashboard-section">
        <h2>Users</h2>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn-danger" onClick={() => deleteUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="dashboard-section">
        <h2>Products</h2>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>
                  <button className="btn-danger" onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;

