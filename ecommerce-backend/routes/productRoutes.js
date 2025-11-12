import express from "express";
const router = express.Router();

const products = [
  {
    id: 1,
    name: "Flozz Classic White",
    price: 49.99,
    image: "/uploads/flozz1.jpg",
  },
  {
    id: 2,
    name: "Flozz Street Runner",
    price: 79.99,
    image: "/uploads/flozz2.jpg",
  },
  {
    id: 3,
    name: "Flozz Air Pro",
    price: 99.99,
    image: "/uploads/flozz3.jpg",
  },
  {
    id: 4,
    name: "Flozz Retro Sneaker",
    price: 59.99,
    image: "/uploads/flozz4.jpg",
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

export default router;

