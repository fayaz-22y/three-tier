import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import products from "./routes/products.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder (IMPORTANT)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", products);
app.use("/api/auth", authRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

