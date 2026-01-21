import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = express.Router();

/* ======================================================
   AUTH MIDDLEWARES
====================================================== */

// Generic auth (any logged-in user)
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Retailer-only auth
function authRetailer(req, res, next) {
  auth(req, res, () => {
    if (req.user.role !== "retailer") {
      return res.status(403).json({ message: "Only retailers allowed" });
    }
    next();
  });
}

/* ======================================================
   FILE UPLOAD CONFIG
====================================================== */

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ======================================================
   ROUTES
====================================================== */

/* ---------- GET ALL PRODUCTS (Customer Shop) ---------- */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name AS retailer_name
      FROM products p
      JOIN users u ON p.retailer_id = u.id
      ORDER BY p.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ---------- GET RETAILER'S OWN PRODUCTS ---------- */
/* IMPORTANT: must be BEFORE /:id */
router.get("/my", authRetailer, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE retailer_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows); // ALWAYS array
  } catch (err) {
    console.error("GET /products/my error:", err);
    res.status(500).json({ message: "Failed to fetch retailer products" });
  }
});

/* ---------- ADD PRODUCT (Retailer) ---------- */
router.post("/", authRetailer, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image_url = `/uploads/${req.file.filename}`;

    await pool.query(
      `
      INSERT INTO products (name, price, description, image_url, retailer_id)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, price, description, image_url, req.user.id]
    );

    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.error("POST /products error:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* ---------- DELETE PRODUCT (Retailer – own product only) ---------- */
router.delete("/:id(\\d+)", authRetailer, async (req, res) => {
  try {
    const product = await pool.query(
      "SELECT id FROM products WHERE id = $1 AND retailer_id = $2",
      [req.params.id, req.user.id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await pool.query(
      "DELETE FROM products WHERE id = $1 AND retailer_id = $2",
      [req.params.id, req.user.id]
    );

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("DELETE /products error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

/* ---------- GET ONE PRODUCT BY ID (NUMERIC ONLY) ---------- */
router.get("/:id(\\d+)", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT p.*, u.name AS retailer_name
      FROM products p
      JOIN users u ON p.retailer_id = u.id
      WHERE p.id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /products/:id error:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

export default router;


