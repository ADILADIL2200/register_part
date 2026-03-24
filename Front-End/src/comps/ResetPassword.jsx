import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!tokenParam || !emailParam) {
      setError("Lien de reinitialisation invalide.");
    } else {
      setToken(tokenParam);
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/resetPassword", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Une erreur s'est produite. Veuillez reessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-bg">
      <div className="reset-card">
        <h2 className="reset-title">Reinitialiser le mot de passe</h2>

        <form onSubmit={handleSubmit} className="reset-form">
          <label>
            Nouveau mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre nouveau mot de passe"
              required
            />
          </label>

          <label>
            Confirmer le mot de passe
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Reinitialisation..." : "Reinitialiser le mot de passe"}
          </button>
        </form>

        {message && <p className="reset-success">{message}</p>}
        {error && <p className="reset-error">{error}</p>}
      </div>
    </div>
  );
}