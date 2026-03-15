import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 
function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [message, setMessage] = useState(location.state?.message || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
 
  const handleVerify = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, code, password, password_confirmation: password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        navigate("/complete-profile", { state: { user: data.user, token: data.token } });
      } else {
        setMessage(data.message || "Vérification échouée.");
      }
    } catch {
      setMessage("Erreur serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .verify-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .verify-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 480px;
          overflow: hidden;
        }
        .verify-header {
          background: linear-gradient(135deg, #0a2463, #2176d4);
          padding: 40px;
          text-align: center;
        }
        .verify-icon-wrap {
          width: 72px; height: 72px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          border: 2px solid rgba(255,255,255,0.25);
        }
        .verify-icon-wrap svg { color: white; }
        .verify-header h2 {
          font-family: 'DM Serif Display', serif;
          color: white;
          font-size: 26px;
          margin-bottom: 8px;
        }
        .verify-header p {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          line-height: 1.5;
        }
        .verify-header .email-highlight {
          color: #93c5fd;
          font-weight: 600;
        }
        .verify-step-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .verify-body { padding: 36px 40px; }
        .error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 14px 16px;
          color: #dc2626;
          font-size: 14px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .success-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 14px 16px;
          color: #16a34a;
          font-size: 14px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .field-group { margin-bottom: 20px; }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }
        .field-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          background: #f8fafc;
          transition: all 0.2s;
          outline: none;
        }
        .field-input:focus {
          border-color: #2176d4;
          background: white;
          box-shadow: 0 0 0 4px rgba(33,118,212,0.08);
        }
        .code-input {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 12px;
          padding: 16px;
          color: #0a2463;
        }
        .password-wrapper { position: relative; }
        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          font-size: 18px;
          padding: 4px;
        }
        .divider-label {
          text-align: center;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 24px 0;
          position: relative;
        }
        .divider-label::before, .divider-label::after {
          content: ''; position: absolute;
          top: 50%; width: 38%; height: 1px;
          background: #e2e8f0;
        }
        .divider-label::before { left: 0; }
        .divider-label::after { right: 0; }
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #0a2463, #2176d4);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(33,118,212,0.35);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .resend-row {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #64748b;
        }
        .resend-btn {
          background: none;
          border: none;
          color: #2176d4;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 0;
        }
        .resend-btn:hover { text-decoration: underline; }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
 
      <div className="verify-root">
        <div className="verify-card">
          <div className="verify-header">
            <div className="verify-step-badge">● Étape 2 / 3</div>
            <div className="verify-icon-wrap">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Vérification Email</h2>
            <p>
              Code envoyé à <span className="email-highlight">{email || "votre email"}</span>.<br/>
              Définissez aussi votre mot de passe ci-dessous.
            </p>
          </div>
 
          <div className="verify-body">
            {message && (
              <div className={message.includes("succès") || message.includes("envoyé") ? "success-box" : "error-box"}>
                <span>{message.includes("succès") ? "Succès" : ""}</span> {message}
              </div>
            )}
 
            <form onSubmit={handleVerify}>
              <div className="field-group">
                <label className="field-label">Code de vérification</label>
                <input
                  className="field-input code-input"
                  type="text"
                  placeholder="••••••"
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  required
                />
              </div>
 
              <div className="divider-label">Définir le mot de passe</div>
 
              <div className="field-group">
                <label className="field-label">Mot de passe</label>
                <div className="password-wrapper">
                  <input
                    className="field-input"
                    type={showPwd ? "text" : "password"}
                    placeholder="Min. 8 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "✖️" : "👁️"}
                  </button>
                </div>
              </div>
 
              <div className="field-group">
                <label className="field-label">Confirmer le mot de passe</label>
                <div className="password-wrapper">
                  <input
                    className="field-input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Répétez votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "✖️" : "👁️"}
                  </button>
                </div>
              </div>
 
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><span className="spinner"></span> Vérification...</> : "Vérifier et continuer →"}
              </button>
            </form>
 
            <p className="resend-row">
              Pas reçu le code ?{" "}
              <button className="resend-btn">Renvoyer</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default VerifyEmail;