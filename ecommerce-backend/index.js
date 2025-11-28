import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import products from "./routes/products.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", products);

// Default route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

