import { useForm } from "react-hook-form";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');
 
  .cf-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #e8f4fd 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    font-family: 'DM Sans', sans-serif;
  }
 
  .cf-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 680px;
    box-shadow:
      0 4px 6px rgba(59, 130, 246, 0.04),
      0 20px 60px rgba(59, 130, 246, 0.08),
      0 0 0 1px rgba(59, 130, 246, 0.06);
    animation: slideUp 0.5s ease forwards;
  }
 
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  .cf-header {
    margin-bottom: 40px;
    padding-bottom: 28px;
    border-bottom: 1px solid #e8f0fe;
  }
 
  .cf-badge {
    display: inline-block;
    background: #eff6ff;
    color: #3b82f6;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 14px;
  }
 
  .cf-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 600;
    color: #1e3a5f;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
 
  .cf-subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
    font-weight: 300;
  }
 
  .cf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
 
  .cf-grid-full {
    grid-column: 1 / -1;
  }
 
  .cf-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
 
  .cf-label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
 
  .cf-label span {
    color: #3b82f6;
    margin-left: 2px;
  }
 
  .cf-input, .cf-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #1e3a5f;
    background: #fafcff;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;
  }
 
  .cf-input:focus, .cf-textarea:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
  }
 
  .cf-input::placeholder, .cf-textarea::placeholder {
    color: #cbd5e1;
    font-weight: 300;
  }
 
  .cf-input.error, .cf-textarea.error {
    border-color: #f87171;
    background: #fff8f8;
  }
 
  .cf-input.error:focus, .cf-textarea.error:focus {
    box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.08);
  }
 
  .cf-textarea {
    resize: vertical;
    min-height: 90px;
  }
 
  .cf-error {
    font-size: 12px;
    color: #ef4444;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 400;
  }
 
  .cf-error::before {
    content: '⚠';
    font-size: 11px;
  }
 
  .cf-divider {
    grid-column: 1 / -1;
    border: none;
    border-top: 1px dashed #e2e8f0;
    margin: 4px 0;
  }
 
  .cf-section-label {
    grid-column: 1 / -1;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #3b82f6;
    margin-bottom: -8px;
  }
 
  .cf-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-top: 32px;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
 
  .cf-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
 
  .cf-btn:active:not(:disabled) {
    transform: translateY(0);
  }
 
  .cf-btn:disabled {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    cursor: not-allowed;
    box-shadow: none;
  }
 
  .cf-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
 
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
 
  /* Toast personnalisé */
  .cf-toast-success {
    background: #ffffff !important;
    color: #1e3a5f !important;
    border-left: 4px solid #3b82f6 !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.15) !important;
    font-family: 'DM Sans', sans-serif !important;
    font-size: 14px !important;
    padding: 14px 18px !important;
  }
 
  .cf-toast-error {
    background: #ffffff !important;
    color: #1e3a5f !important;
    border-left: 4px solid #f87171 !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 30px rgba(248, 113, 113, 0.15) !important;
    font-family: 'DM Sans', sans-serif !important;
    font-size: 14px !important;
    padding: 14px 18px !important;
  }
 
  @media (max-width: 600px) {
    .cf-card { padding: 28px 20px; }
    .cf-grid { grid-template-columns: 1fr; }
    .cf-grid-full { grid-column: 1; }
    .cf-section-label { grid-column: 1; }
    .cf-divider { grid-column: 1; }
  }
`;

function ClientForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cin = watch("cin");
  const passeport = watch("passeport");

  return (
    <>
      <style>{styles}</style>
      <div className="cf-wrapper">
        <div className="cf-card">
          {/* Header */}
          <div className="cf-header">
            <h1 className="cf-title">Ajouter un Client</h1>
            <p className="cf-subtitle">Constituez la fiche de votre client en renseignant ses informations personnelles et ses coordonnées.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="cf-grid">
              {/* Section Identité */}
              <div className="cf-section-label">Identité</div>

              {/* Nom */}
              <div className="cf-field">
                <label className="cf-label">
                  Nom <span>*</span>
                </label>
                <input
                  className={`cf-input ${errors.nom ? "error" : ""}`}
                  placeholder="Ex: Benali"
                  {...register("nom", {
                    required: "Le nom est obligatoire",
                    maxLength: {
                      value: 100,
                      message: "Le nom ne doit pas dépasser 100 caractères",
                    },
                  })}
                />
                {errors.nom && (
                  <span className="cf-error">{errors.nom.message}</span>
                )}
              </div>

              {/* Prénom */}
              <div className="cf-field">
                <label className="cf-label">
                  Prénom <span>*</span>
                </label>
                <input
                  className={`cf-input ${errors.prenom ? "error" : ""}`}
                  placeholder="Ex: Hamza"
                  {...register("prenom", {
                    required: "Le prénom est obligatoire",
                    maxLength: {
                      value: 100,
                      message: "Le prénom ne doit pas dépasser 100 caractères",
                    },
                  })}
                />
                {errors.prenom && (
                  <span className="cf-error">{errors.prenom.message}</span>
                )}
              </div>

              {/* CIN */}
              <div className="cf-field">
                <label className="cf-label">CIN</label>
                <input
                  className={`cf-input ${errors.cin ? "error" : ""}`}
                  placeholder="Ex: BK123456"
                  {...register("cin", {
                    maxLength: {
                      value: 10,
                      message: "Le CIN ne doit pas dépasser 10 caractères",
                    },
                    validate: (value) => {
                      if (!value && !passeport)
                        return "Le CIN ou le Passeport est obligatoire";
                      return true;
                    },
                  })}
                />
                {errors.cin && (
                  <span className="cf-error">{errors.cin.message}</span>
                )}
              </div>

              {/* Passeport */}
              <div className="cf-field">
                <label className="cf-label">Passeport</label>
                <input
                  className={`cf-input ${errors.passeport ? "error" : ""}`}
                  placeholder="Ex: AB987654"
                  {...register("passeport", {
                    maxLength: {
                      value: 20,
                      message:
                        "Le passeport ne doit pas dépasser 20 caractères",
                    },
                    validate: (value) => {
                      if (!value && !cin)
                        return "Le CIN ou le Passeport est obligatoire";
                      return true;
                    },
                  })}
                />
                {errors.passeport && (
                  <span className="cf-error">{errors.passeport.message}</span>
                )}
              </div>

              {/* Date naissance */}
              <div className="cf-field">
                <label className="cf-label">Date de naissance</label>
                <input
                  type="date"
                  className={`cf-input ${errors.date_naissance ? "error" : ""}`}
                  {...register("date_naissance")}
                />
                {errors.date_naissance && (
                  <span className="cf-error">
                    {errors.date_naissance.message}
                  </span>
                )}
              </div>

              {/* Nationalité */}
              <div className="cf-field">
                <label className="cf-label">Nationalité</label>
                <input
                  className={`cf-input ${errors.nationalite ? "error" : ""}`}
                  placeholder="Ex: Marocaine"
                  defaultValue="Marocaine"
                  {...register("nationalite", {
                    maxLength: {
                      value: 50,
                      message:
                        "La nationalité ne doit pas dépasser 50 caractères",
                    },
                  })}
                />
                {errors.nationalite && (
                  <span className="cf-error">{errors.nationalite.message}</span>
                )}
              </div>

              <hr className="cf-divider" />

              {/* Section Contact */}
              <div className="cf-section-label">Contact</div>

              {/* Email */}
              <div className="cf-field">
                <label className="cf-label">Email</label>
                <input
                  type="text"
                  className={`cf-input ${errors.email ? "error" : ""}`}
                  placeholder="Ex: hamza@gmail.com"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Le format de l'email est invalide",
                    },
                    maxLength: {
                      value: 150,
                      message: "L'email ne doit pas dépasser 150 caractères",
                    },
                  })}
                />
                {errors.email && (
                  <span className="cf-error">{errors.email.message}</span>
                )}
              </div>

              {/* Téléphone */}
              <div className="cf-field">
                <label className="cf-label">Téléphone</label>
                <input
                  className={`cf-input ${errors.telephone ? "error" : ""}`}
                  placeholder="Ex: 0661234567"
                  {...register("telephone", {
                    maxLength: {
                      value: 20,
                      message:
                        "Le téléphone ne doit pas dépasser 20 caractères",
                    },
                  })}
                />
                {errors.telephone && (
                  <span className="cf-error">{errors.telephone.message}</span>
                )}
              </div>

              <hr className="cf-divider" />

              {/* Section Localisation */}
              <div className="cf-section-label">Localisation</div>

              {/* Ville */}
              <div className="cf-field">
                <label className="cf-label">Ville</label>
                <input
                  className={`cf-input ${errors.ville ? "error" : ""}`}
                  placeholder="Ex: Casablanca"
                  {...register("ville", {
                    maxLength: {
                      value: 100,
                      message: "La ville ne doit pas dépasser 100 caractères",
                    },
                  })}
                />
                {errors.ville && (
                  <span className="cf-error">{errors.ville.message}</span>
                )}
              </div>

              {/* Adresse */}
              <div className={`cf-field cf-grid-full`}>
                <label className="cf-label">Adresse</label>
                <input
                  className={`cf-input ${errors.adresse ? "error" : ""}`}
                  placeholder="Ex: 23 Rue Ibn Batouta, Casablanca"
                  {...register("adresse")}
                />
                {errors.adresse && (
                  <span className="cf-error">{errors.adresse.message}</span>
                )}
              </div>

              <hr className="cf-divider" />

              {/* Section Notes */}
              <div className="cf-section-label">Notes</div>

              {/* Notes */}
              <div className="cf-field cf-grid-full">
                <label className="cf-label">Notes internes</label>
                <textarea
                  className={`cf-textarea ${errors.notes ? "error" : ""}`}
                  placeholder="Informations supplémentaires sur le client..."
                  {...register("notes")}
                />
                {errors.notes && (
                  <span className="cf-error">{errors.notes.message}</span>
                )}
              </div>
            </div>

            {/* Bouton */}
            <button type="submit" className="cf-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="cf-spinner" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <span>＋</span>
                  Créer le client
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientForm;
