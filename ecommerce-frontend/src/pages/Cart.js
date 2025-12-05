import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="cart-container fade-in">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item slide-in">
          <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} />

          <div className="cart-details">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;

