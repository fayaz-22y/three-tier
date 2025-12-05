import "../style.css";

function RetailerLogin() {
  return (
    <div className="login-page">
      <h2>Retailer Login</h2>

      <form className="login-form">
        <input type="email" placeholder="Retailer Email" required />
        <input type="password" placeholder="Password" required />
        <button>Login</button>
      </form>
    </div>
  );
}

export default RetailerLogin;

