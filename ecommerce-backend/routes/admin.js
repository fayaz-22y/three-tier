import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

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

router.get("/dashboard", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await pool.query("SELECT id,name,email,role FROM users");
  const orders = await pool.query("SELECT * FROM orders");
  const products = await pool.query("SELECT * FROM products");

  res.json({
    users: users.rows,
    orders: orders.rows,
    products: products.rows,
  });
});

export default router;
