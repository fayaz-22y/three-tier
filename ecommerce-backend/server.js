import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// ✔️ FIXED ROUTE
import products from "./routes/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✔️ USE THE CORRECT ROUTE
app.use("/api/products", products);

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => console.log("server running"));


