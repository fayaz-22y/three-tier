import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Admin dashboard data
router.get("/dashboard", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await pool.query(
    "SELECT id, name, email, role FROM users"
  );
  const products = await pool.query("SELECT * FROM products");
  const orders = await pool.query("SELECT * FROM orders");

  res.json({
    users: users.rows,
    products: products.rows,
    orders: orders.rows,
  });
});

/* ================= ADMIN STATS ================= */
router.get("/admin/stats", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const usersCount = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE role='customer') AS customers,
        COUNT(*) FILTER (WHERE role='retailer') AS retailers
      FROM users
    `);

    const ordersCount = await pool.query(`
      SELECT COUNT(*) AS orders, COALESCE(SUM(total),0) AS revenue
      FROM orders
    `);

    res.json({
      customers: usersCount.rows[0].customers,
      retailers: usersCount.rows[0].retailers,
      orders: ordersCount.rows[0].orders,
      revenue: ordersCount.rows[0].revenue
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});


export default router;

