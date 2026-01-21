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
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* ================= PLACE ORDER (CUSTOMER) ================= */
router.post("/", auth, async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price) * item.quantity;
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

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* ================= CUSTOMER ORDER HISTORY ================= */
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await pool.query(
      `
      SELECT
        o.id,
        o.total,
        o.created_at,
        json_agg(
          json_build_object(
            'name', p.name,
            'price', oi.price,
            'quantity', oi.quantity,
            'image_url', p.image_url
          )
        ) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.customer_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [req.user.id]
    );

    res.json(orders.rows);
  } catch (err) {
    console.error("CUSTOMER ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ================= RETAILER SALES SUMMARY ================= */
router.get("/retailer", auth, async (req, res) => {
  if (req.user.role !== "retailer") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        p.name,
        SUM(oi.quantity) AS sold,
        SUM(oi.price * oi.quantity) AS revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE p.retailer_id = $1
      GROUP BY p.name
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("RETAILER SALES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch sales data" });
  }
});

/* ================= RETAILER ORDERS (DETAILED) ================= */
router.get("/retailer/orders", auth, async (req, res) => {
  if (req.user.role !== "retailer") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        o.id,
        o.created_at,
        o.total
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE p.retailer_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows); // ALWAYS ARRAY
  } catch (err) {
    console.error("RETAILER ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch retailer orders" });
  }
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

