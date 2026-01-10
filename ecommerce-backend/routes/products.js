import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");

    // 🔒 Sanitize image_url (production-safe)
    const cleanedProducts = result.rows.map(product => ({
      ...product,
      image_url: product.image_url
        ? product.image_url.trim()
        : null,
    }));

    res.json(cleanedProducts);
  } catch (err) {
    console.error("ERROR FETCHING PRODUCTS:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = result.rows[0];

    // 🔒 Sanitize image_url
    product.image_url = product.image_url
      ? product.image_url.trim()
      : null;

    res.json(product);
  } catch (err) {
    console.error("ERROR FETCHING PRODUCT:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;

