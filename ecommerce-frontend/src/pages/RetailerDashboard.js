import { useState } from "react";
import axios from "axios";


export default function RetailerDashboard() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("image", form.image);

    try {
      await axios.post("/api/products", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      alert("Product added");
    } catch {
      alert("Failed to add product");
    }
  };

  return (
    <div className="container">
      <h2>Retailer Dashboard</h2>

      <form onSubmit={submit}>
        <input placeholder="Product Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button>Add Product</button>
      </form>
    </div>
  );
}

