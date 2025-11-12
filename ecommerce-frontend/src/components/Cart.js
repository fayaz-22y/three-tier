import React from "react";

const Cart = ({ cart }) => {
  const total = cart.reduce((sum, p) => sum + parseFloat(p.price), 0);

  return (
    <div>
      <h2>🛍️ Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;

