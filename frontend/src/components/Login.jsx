import { useState } from "react";

function Login({ onLogin, onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {

    setError("");

    try {

      const response = await fetch(
       `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      localStorage.setItem(
        "token",
        data.token
      );

      onLogin();

    } catch (error) {

      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Smart Task Manager</h1>

        <p>Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login
        </button>

        <button
  onClick={onRegister}
  style={styles.registerButton}
>
  Don't have an account? Register
</button>

      </div>

    </div>
  );
}


const styles = {

  

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  card: {
    width: "380px",
    padding: "35px",
    borderRadius: "18px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px"
  },

  

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },

  registerButton: {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  border: "none",
  background: "transparent",
  color: "#7c3aed",
  cursor: "pointer"
},

  error: {
    color: "#dc2626",
    marginTop: "15px"
  }
};

export default Login;