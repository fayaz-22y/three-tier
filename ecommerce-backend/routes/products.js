import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;

