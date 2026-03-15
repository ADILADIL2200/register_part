import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Continue() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [numeroOrdre, setNumeroOrdre] = useState("");
  const [barreau, setBarreau] = useState("");
  const [dateInscription, setDateInscription] = useState("");
  const [grade, setGrade] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [nomCabinet, setNomCabinet] = useState("");
  const [adresseCabinet, setAdresseCabinet] = useState("");
  const [ville, setVille] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});
    setSuccess("");

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("numero_ordre", numeroOrdre);
    formData.append("barreau", barreau);
    formData.append("date_inscription_barreau", dateInscription);
    formData.append("grade", grade);
    formData.append("specialite", specialite);
    formData.append("nom_cabinet", nomCabinet);
    formData.append("adresse_cabinet", adresseCabinet);
    formData.append("ville", ville);
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/avocat", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profil avocat complété avec succès! Redirection en cours...");
        setTimeout(() => navigate("/avocat/dashboard"), 2000);
      } else {
        setMessage(data.message || "Une erreur s'est produite");
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <div className="form-card form-card.extended">
          <div className="form-header">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2>Profil Complet d'Avocat</h2>
            <p>Fournissez tous les détails de votre <span className="subtitle-highlight">cabinet juridique</span> et votre expérience professionnelle</p>
          </div>

          {success && <div className="alert alert-success">{success}</div>}
          {message && <div className="alert alert-error">{message}</div>}

          {Object.keys(errors).length > 0 && (
            <div className="alert alert-error">
              <strong>Erreurs de validation:</strong>
              <ul style={{ marginTop: "0.5rem" }}>
                {Object.entries(errors).map(([field, messages]) =>
                  messages.map((msg, i) => (
                    <li key={`${field}-${i}`}>{field}: {msg}</li>
                  ))
                )}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Informations Personnelles */}
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="nom">Nom <span className="text-red-500">*</span></label>
                <input
                  id="nom"
                  type="text"
                  placeholder="Ex: Dupont"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom <span className="text-red-500">*</span></label>
                <input
                  id="prenom"
                  type="text"
                  placeholder="Ex: Jean"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  id="telephone"
                  type="tel"
                  placeholder="Ex: +33 1 23 45 67 89"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ville">Ville</label>
                <input
                  id="ville"
                  type="text"
                  placeholder="Ex: Paris"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                />
              </div>
            </div>

            {/* Informations Professionnelles Légales */}
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="numeroOrdre">Numéro d'Ordre <span className="text-red-500">*</span></label>
                <input
                  id="numeroOrdre"
                  type="text"
                  placeholder="Ex: A2024001"
                  value={numeroOrdre}
                  onChange={(e) => setNumeroOrdre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="barreau">Barreau <span className="text-red-500">*</span></label>
                <select
                  id="barreau"
                  value={barreau}
                  onChange={(e) => setBarreau(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez un barreau</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Fes">Fes</option>
                  <option value="Agadir">Agadir</option>
                  <option value="Tanger">Tanger</option>
                  <option value="Meknes">Meknes</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Kenitra">Kenitra</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            {/* Formation & Expérience */}
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="dateInscription">Date d'Inscription au Barreau</label>
                <input
                  id="dateInscription"
                  type="date"
                  value={dateInscription}
                  onChange={(e) => setDateInscription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="grade">Grade</label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Sélectionnez un grade</option>
                  <option value="stagiaire">Stagiaire</option>
                  <option value="titulaire">Titulaire</option>
                </select>
              </div>
            </div>

            {/* Domaines de Pratique */}
            <div className="form-group">
              <label htmlFor="specialite">Spécialité <span className="helper-text">(Ex: Droit des affaires, Droit pénal...)</span></label>
              <input
                id="specialite"
                type="text"
                placeholder="Ex: Droit des affaires"
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
              />
            </div>

            {/* Cabinet */}
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="nomCabinet">Nom du Cabinet</label>
                <input
                  id="nomCabinet"
                  type="text"
                  placeholder="Ex: Cabinet Dupont & Associés"
                  value={nomCabinet}
                  onChange={(e) => setNomCabinet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adresseCabinet">Adresse du Cabinet</label>
                <input
                  id="adresseCabinet"
                  type="text"
                  placeholder="Ex: 123 Rue de la Paix"
                  value={adresseCabinet}
                  onChange={(e) => setAdresseCabinet(e.target.value)}
                />
              </div>
            </div>

            {/* Photo de Profil */}
            <div className="form-group">
              <label htmlFor="photo">Photo de Profil</label>
              <div className="file-upload-wrapper" style={{
                border: "2px dashed #d1d5db",
                borderRadius: "0.5rem",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 150ms ease",
                backgroundColor: photo ? "#f0fdf4" : "#f9fafb"
              }}>
                <input
                  id="photo"
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="photo" style={{ cursor: "pointer", margin: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: "0 auto 0.5rem", color: "#4f46e5" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p style={{ margin: "0.5rem 0 0", color: "#4f46e5", fontWeight: 600 }}>
                    {photoName ? "✓ Fichier sélectionné" : "Cliquez pour ajouter une photo"}
                  </p>
                  {photoName && <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "#6b7280" }}>{photoName}</p>}
                </label>
              </div>
            </div>

            {/* Bouton de Soumission */}
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: "1rem", height: "1rem", borderWidth: "2px" }}></span>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Compléter le Profil
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}