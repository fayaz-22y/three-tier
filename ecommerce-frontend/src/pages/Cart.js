import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async () => {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ cart }),
    });

    if (!res.ok) {
      alert("Checkout failed");
      return;
    }

    clearCart();
    alert("Order placed successfully!");
  } catch (err) {
    console.error("JS error:", err);
    alert("Something went wrong in UI");
  }
};




  return (
    <div className="cart-container fade-in">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item slide-in">
          <img
            src={item.image_url}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          <div className="cart-details">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹{total}</h3>
          <button className="checkout-btn" onClick={checkout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;

