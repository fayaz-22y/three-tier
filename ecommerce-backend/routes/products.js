import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = express.Router();

/* ========== AUTH MIDDLEWARE (Retailer only) ========== */
function authRetailer(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "retailer") {
      return res.status(403).json({ message: "Only retailers allowed" });
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* ========== FILE UPLOAD ========== */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ========== GET ALL PRODUCTS (Customer Shop) ========== */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name AS retailer_name
      FROM products p
      JOIN users u ON p.retailer_id = u.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ========== ADD PRODUCT (Retailer) ========== */
router.post("/", authRetailer, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image_url = `/uploads/${req.file.filename}`;

    await pool.query(
      "INSERT INTO products (name, price, description, image_url, retailer_id) VALUES ($1,$2,$3,$4,$5)",
      [name, price, description, image_url, req.user.id]
    );

    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});
// GET ONE PRODUCT BY ID
router.get("/:id", async (req, res) => {
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
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

export default router;

