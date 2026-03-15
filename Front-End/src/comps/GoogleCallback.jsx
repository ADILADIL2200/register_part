import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function GoogleCallback() {
  const navigate = useNavigate();
 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");
 
    if (token && user) {
      localStorage.setItem("authToken", token);
      const userData = JSON.parse(decodeURIComponent(user));
      localStorage.setItem("user", JSON.stringify(userData));
 
      // ✅ FIX : Rediriger selon rôle ET si profil existe
      if (userData.role === "avocat" && !userData.has_profile) {
        navigate("/complete-profile");
      } else if (userData.role === "avocat" && userData.has_profile) {
        navigate("/avocat/dashboard");
      } else if (userData.role === "client") {
        navigate("/client/dashboard");
      } else {
        navigate("/avocat/dashboard");
      }
    } else {
      navigate("/login?error=google_failed");
    }
  }, []);
 
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gcb-root { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%); font-family: sans-serif; gap: 20px; }
        .gcb-card { background: white; border-radius: 20px; box-shadow: 0 4px 40px rgba(0,0,0,0.08); padding: 48px 56px; text-align: center; max-width: 380px; width: 100%; }
        .gcb-logo { width: 56px; height: 56px; background: linear-gradient(135deg, #0a2463, #2176d4); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 24px; }
        .gcb-spinner { width: 44px; height: 44px; border: 4px solid #e2e8f0; border-top: 4px solid #2176d4; border-radius: 50%; animation: gcb-spin 0.8s linear infinite; margin: 0 auto 20px; }
        @keyframes gcb-spin { to { transform: rotate(360deg); } }
        .gcb-title { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
        .gcb-sub { font-size: 14px; color: #64748b; line-height: 1.5; }
      `}</style>
      <div className="gcb-root">
        <div className="gcb-card">
          <div className="gcb-logo">⚖️</div>
          <div className="gcb-spinner"></div>
          <div className="gcb-title">Connexion en cours...</div>
          <div className="gcb-sub">Nous finalisons votre connexion.<br />Redirection automatique...</div>
        </div>
      </div>
    </>
  );
}