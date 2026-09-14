import { useState } from "react";

function Register({ onRegister }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
       `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      onRegister();

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>TaskFlow</h1>

        <p style={styles.subtitle}>
          Create your account
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <button
          onClick={onRegister}
          style={styles.loginButton}
        >
          Already have an account? Login
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

  subtitle: {
    color: "#6b7280"
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

  loginButton: {
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

export default Register;