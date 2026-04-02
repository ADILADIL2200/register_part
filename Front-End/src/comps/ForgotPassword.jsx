import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"; // we will create this CSS file

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/sendResetLink",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="forgot-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="forgot-success">{message}</p>}
        {error && <p className="forgot-error">{error}</p>}
      </div>
    </div>
  );
}