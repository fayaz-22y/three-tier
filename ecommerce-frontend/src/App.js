import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            🛍️ Flozz Store
          </a>
        </div>
      </nav>

      <header className="bg-light text-center py-4 shadow-sm">
        <h2>Welcome to Flozz — Step into Style 👟</h2>
        <p>Discover premium sneakers crafted for comfort and performance.</p>
      </header>

      <main className="container my-5">
        <ProductList />
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-auto">
        © 2025 Flozz Footwear | Designed with ❤️
      </footer>
    </div>
  );
}

export default App;

