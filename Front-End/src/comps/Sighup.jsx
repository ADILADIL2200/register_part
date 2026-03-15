import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
// Logo Sanad Law en base64
const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAF0Af8DASIAAhEBAxEB/8QAHgABAAICAwEBAQAAAAAAAAAAAAgJAwcBBgoFBAL/xABgEAABAwMDAgMDBwQHEBAGAwABAAIDBAUGBwgREiEJEzEiQVEUFTRhcYGxIzJCYhgkM1JylbQWFxkpOENZc3aCkaGipcLUJTU3U1RVWHR1d4OSlKTR0mNlZpPB06O14v/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC1NERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAX5LhGDGJQO7TwfsX61grfoz/ALvxCDOiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLBW/Rn/d+IWdYK36M/7vxCDOiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLBW/Rn/AHfiFnWCt+jP+78QgzoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICwVv0Z/3fiFnWCt+jP+78QgzoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLVtq3NaM3nW+47eLfl8MubWyjFZNRhp8s+90TZPzTK1pDnM9QD9R40fv93pO0BsFNpZpZ13XVjL2imtdJSx+c+3xyeyKhzRzzISQI2cHk8k9h3jLevDU1S080AtGueGZHeH7hLHWOym4uhqnSyT9Ya91K3kkPmj4Lue/mOdI09QLeAtcRRr2Q7xsd3WafdVeYLZnthAgyGzfmOa8dvlEbT38p55+truWn3cyUQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAWCt+jP8Au/ELOsFb9Gf934hBnREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEX4rterNYKN1wvl2o7dSs/Omqp2xMH2ucQEFaW9Xb/nu2fXyi396XRTZfQUtx+W5Jarm4zvour2C6JxBLYCwlgI7wkN45b6SryffbopY9sMe52iuXy211sXk0Fs8xrKqa5Fp/aTh36XhwPUe4DQXdxxzh3JbtdCMe0YzqOx6waeXLIG2KsbQ2qe60tV8qnMZDYzB1nzOSeOnjv6KnGbbjupwzDbdrjfdDK6TAqSqN/ioqxvmW5gd0kyS0TZvOZEWtYCXNaC1oBJCCwPw6ttOa5rqJdt9OrZfY7lltRUVljstta6kikin566iZjeOqNwIDGHnq4L3cnhWQLRuk+7Hb9lWB4vUy6yafUt1q7RRSVVu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ePmI/KfX0583p9Pfx9yDSesHi87m9QKqelwFtowC0uJETKCH5VWdPu66iUEE/WxjFo6yat0Wc5PHkmukWe603dveks0t4lp6QSE9ut4Esrm//DjbHz++78K1rS/wi9qOCvjrcsor5nNZGef9la50NNz8RDT9HP2Oc4fUpV4Ro/pTprTsptP9Occx5kYAb83W2KB3b4ua3kn6yUFXePXjxEcywCRum+02z4jppb4jJFitGypsjqxnT7RIbVw1dS5wHc88P7AA88HrWnvitZloO12CO2oYTjkFDMW1tstoqbVP5gPDjJ5gkd5nryXgn4q5laf1y2k7ftxVN06p6eUNfXMHEV0pi6lrovsnjIc4fqu6m/UgpA3YbgtENxV+qc/xTQu5YPmNymE1xqochZU0VW4/nvfTmnafMP75r2/Egldg25eHHr1uPtNNllgq8YteMVD+n50mvEFUQRxy3yadz3teOe7X9BVneG+E9s2xG8MvFTiF6yIxO646a83eSSnafdyyIRh4+p/UPiCpVYlhWH4FaWWHCMXtVht0fdtLbqRlPED8elgA5+tBErbb4WW37Q80eQZjA/UHKqciT5XdIWtooZB6eTS929j75C8+/t6KZzWtY0MY0Na0cAAcAD4LlEBERAREQEREBERAREQEREBERAREQEREBERAREQFgrfoz/u/ELOsFb9Gf934hBnREQEREBERAREQEREBERAREQEREBERARYhVUpqDSCpiM4b1GLrHWG/Hj14WVAREQEREBERARFimqqWmLG1FTFEZXdLA94b1H4Dn1KDKiIgIiICIiAiIgIiICLgEH0K5QEREBEWKGppqnr+T1EcvluLH9Dw7pcPUHj0P1IMqIiAi4BBHIXKAi45B9FygIuCQO5IHuXKAiIgIiICIiAiIgIiICwVv0Z/3fiFnWCt+jP+78QgzoiICIiAiIgIiICIiAiIgKsjdLv31rzXcpDtN2oXe32Sr+dm4/VX+eFkkktfz0zNYZGubHHEQ5pcGlxLHFvA45s3Xn13k6V6q7WN198ypslZQmuyCfJ8YvsIPRKySd0zC1/p5kZd0vae/I544cCQsIyrbp4lelGPnMdMt4D9Q7vTM86sx+62mONkw45cyB0xla8/AHyuR6EHgL9+xLXfeRuD1LyWj1ykosUs2BxxQ19pjsHySrrqybqDGPMvUWRtaxzi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nREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFgrfoz/u/ELOsFb9Gf8Ad+IQZ0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBYK36M/7vxCzrBW/Rn/d+IQZ0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBYK36M/7vxCzrBW/Rn/d+IQZ0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBYK36M/wC78Qs6wVv0Z/3fiEGdERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAWCt+jP+78Qs6wVv0Z/wB34hBnREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFgrfoz/u/EIiD/9k=";
 
export default function Register() {
  const [email, setEmail] = useState("");
  // ✅ rôle avocat par défaut, pas de choix affiché
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ role toujours avocat
        body: JSON.stringify({ email, role: "avocat" }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/verify-email", { state: { email: data.email, message: data.message } });
      } else {
        setMessage(data.message || "Une erreur s'est produite.");
      }
    } catch {
      setMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .reg-root { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 768px) {
          .reg-root { grid-template-columns: 1fr; }
          .reg-left { display: none !important; }
          .reg-right { padding: 32px 20px !important; }
        }
        .reg-left {
          background: linear-gradient(155deg, #0a2463 0%, #1e5fa8 55%, #2176d4 100%);
          display: flex; flex-direction: column; justify-content: center;
          padding: 60px; position: relative; overflow: hidden;
        }
        .reg-left::before {
          content: ''; position: absolute; width: 400px; height: 400px;
          border-radius: 50%; background: rgba(255,255,255,0.04);
          top: -100px; right: -100px;
        }
        .reg-left::after {
          content: ''; position: absolute; width: 250px; height: 250px;
          border-radius: 50%; background: rgba(255,255,255,0.04);
          bottom: -60px; left: -60px;
        }
        .reg-brand { display: flex; align-items: center; gap: 14px; margin-bottom: 48px; }
        .reg-brand-logo {
          width: 52px; height: 52px; border-radius: 12px;
          background: white; padding: 4px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .reg-brand-logo img { width: 100%; height: 100%; object-fit: contain; }
        .reg-brand-name {
          font-family: 'DM Serif Display', serif; color: white; font-size: 22px; letter-spacing: 1px;
        }
        .reg-brand-sub { color: rgba(255,255,255,0.6); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
        .reg-steps { position: relative; z-index: 1; }
        .reg-steps-title { font-family: 'DM Serif Display', serif; color: white; font-size: 36px; line-height: 1.2; margin-bottom: 40px; }
        .step-item { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 24px; }
        .step-num {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 14px; font-weight: 600; flex-shrink: 0;
        }
        .step-num.active { background: #60a5fa; border-color: #60a5fa; }
        .step-content h4 { color: white; font-size: 15px; font-weight: 600; margin-bottom: 4px; }
        .step-content p { color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.5; }
        .reg-right {
          background: white; display: flex; align-items: center;
          justify-content: center; padding: 60px 72px;
        }
        .reg-form-container { width: 100%; max-width: 400px; }
        .reg-logo-center {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 28px;
        }
        .reg-logo-img {
          width: 80px; height: 80px; object-fit: contain; margin-bottom: 8px;
        }
        .reg-logo-name {
          font-family: 'DM Serif Display', serif; font-size: 22px;
          color: #0a2463; letter-spacing: 2px; text-transform: uppercase;
        }
        .reg-logo-sub { font-size: 11px; color: #94a3b8; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
        .reg-step-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; color: #2176d4; font-size: 12px; font-weight: 600;
          padding: 6px 12px; border-radius: 20px; margin-bottom: 20px;
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .reg-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #0f172a; margin-bottom: 8px; }
        .reg-subtitle { color: #64748b; font-size: 14px; margin-bottom: 28px; line-height: 1.5; }
        .error-box {
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
          padding: 14px 16px; color: #dc2626; font-size: 14px; margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .field-group { margin-bottom: 20px; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; letter-spacing: 0.3px; text-transform: uppercase; }
        .field-input {
          width: 100%; padding: 13px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: 15px; font-family: 'DM Sans', sans-serif; color: #0f172a;
          background: #f8fafc; transition: all 0.2s; outline: none;
        }
        .field-input:focus { border-color: #2176d4; background: white; box-shadow: 0 0 0 4px rgba(33,118,212,0.08); }
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #0a2463, #2176d4);
          color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(33,118,212,0.35); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; color: #94a3b8; font-size: 13px; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
        .google-btn {
          width: 100%; padding: 13px; background: white; border: 1.5px solid #e2e8f0;
          border-radius: 10px; font-size: 15px; font-family: 'DM Sans', sans-serif;
          color: #374151; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px; transition: all 0.2s; font-weight: 500; margin-bottom: 24px;
        }
        .google-btn:hover { background: #f8fafc; border-color: #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .login-link { text-align: center; font-size: 14px; color: #64748b; }
        .login-link a { color: #2176d4; font-weight: 600; text-decoration: none; }
        .login-link a:hover { text-decoration: underline; }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
 
      <div className="reg-root">
        {/* LEFT */}
        <div className="reg-left">
          <div className="reg-brand">
            <div className="reg-brand-logo">
              <img src={LOGO} alt="Sanad Law" />
            </div>
            <div>
              <div className="reg-brand-name">Sanad Law</div>
              <div className="reg-brand-sub">Gestion Juridique</div>
            </div>
          </div>
          <div className="reg-steps">
            <h2 className="reg-steps-title">Rejoignez la plateforme en 3 étapes</h2>
            <div className="step-item">
              <div className="step-num active">1</div>
              <div className="step-content">
                <h4>Créez votre compte</h4>
                <p>Entrez votre email professionnel</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Vérifiez votre email</h4>
                <p>Confirmez votre identité avec le code reçu</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Complétez votre profil</h4>
                <p>Renseignez vos informations professionnelles</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* RIGHT */}
        <div className="reg-right">
          <div className="reg-form-container">
            {/* Logo centré */}
            <div className="reg-logo-center">
              <img src={LOGO} alt="Sanad Law" className="reg-logo-img" />
              <div className="reg-logo-name">Sanad Law</div>
              <div className="reg-logo-sub">App Gestion Juridique</div>
            </div>
 
            <div className="reg-step-badge"><span>●</span> Étape 1 / 3</div>
            <h2 className="reg-title">Créer un compte avocat</h2>
            <p className="reg-subtitle">Entrez votre email. Vous recevrez un code de vérification.</p>
 
            {message && <div className="error-box"><span></span> {message}</div>}
 
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">Adresse email</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="vous@cabinet.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
 
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><span className="spinner"></span> Envoi en cours...</> : "Continuer →"}
              </button>
 
              <div className="divider">ou</div>
 
              <button type="button" className="google-btn"
                onClick={() => window.location.href = "http://localhost:8000/api/auth/google"}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                S'inscrire avec Google
              </button>
 
              <p className="login-link">Déjà inscrit ? <a href="/login">Se connecter</a></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}