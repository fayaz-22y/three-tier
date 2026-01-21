import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./../style.css";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const checkout = async () => {
    if (cart.length === 0) return;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Checkout failed");
        return;
      }

      clearCart();
      alert("Order placed successfully!");
    } catch {
      alert("Server unreachable");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 && (
        <p className="text-muted">Your cart is empty</p>
      )}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          {/* IMAGE FIX — WRAPPED */}
          <div className="cart-img-wrapper">
            <img src={item.image_url} alt={item.name} />
          </div>

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
        <div className="cart-summary">
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

