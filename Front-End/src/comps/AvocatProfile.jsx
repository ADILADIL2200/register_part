import { useEffect, useState } from "react";
import axios from "axios";

const LOGO = "data:image/jpeg;base64,..."; // (اختصرته)

export default function AvocatDashboard() {
  const [avocat, setAvocat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("authToken") ||
          localStorage.getItem("token");

        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const res = await axios.get(
          "http://127.0.0.1:8000/api/avocat/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAvocat(res.data.avocat);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const displayName = avocat
    ? `Me. ${avocat.prenom} ${avocat.nom}`
    : user?.email || "Avocat";

  const initials = avocat
    ? `${avocat.prenom?.[0] || ""}${avocat.nom?.[0] || ""}`.toUpperCase()
    : "AV";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside
        className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}
      >
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={LOGO} alt="Sanad Law" />
          </div>
          <div className="sidebar-title">
            <div className="sidebar-name">Sanad Law</div>
            <div className="sidebar-sub">Gestion Juridique</div>
          </div>
        </div>

        {/* User */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {avocat?.photo ? (
              <img
                src={`http://127.0.0.1:8000/storage/${avocat.photo}`}
                alt="avatar"
              />
            ) : (
              initials
            )}
          </div>

          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{displayName}</div>
            <div className="sidebar-user-role">Avocat</div>
          </div>
        </div>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main
        className={`main-content ${sidebarOpen ? "" : "collapsed"}`}
      >
        <div className="page-body">
          <h1>Bonjour, {displayName} 👋</h1>

          {avocat && (
            <div>
              <p>Nom: {avocat.nom}</p>
              <p>Prénom: {avocat.prenom}</p>
              <p>Email: {user?.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}