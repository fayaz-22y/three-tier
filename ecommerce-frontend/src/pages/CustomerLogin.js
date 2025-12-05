import "../style.css";

function CustomerLogin() {
  return (
    <div className="login-page">
      <h2>Customer Login</h2>

      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button>Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;

