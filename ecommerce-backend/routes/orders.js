import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* ================= PLACE ORDER ================= */
router.post("/", auth, async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    const orderResult = await pool.query(
      "INSERT INTO orders (customer_id, total) VALUES ($1,$2) RETURNING id",
      [req.user.id, total]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of cart) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
        [orderId, item.id, item.quantity, item.price]
      );
    }

    return res.status(201).json({
      message: "Order placed successfully",
      orderId
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    return res.status(500).json({ message: "Order failed" });
  }
});

/* ================= CUSTOMER ORDER HISTORY ================= */
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    return res.json(orders.rows);
  } catch (err) {
    console.error("FETCH ORDERS ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;

