import './ClientsFilters.css'

export default function ClientsFilters({
  search, setSearch,
  compteActif, setCompteActif,
  ville, setVille,
  nationalite, setNationalite,
  dateDebut, setDateDebut,
  dateFin, setDateFin,
  optionsVilles, optionsNationalites,
  resetFiltres,
}) {
  return (
    <div className="filters-card">

      <div className="filters-search-wrapper">
        <span className="filters-search-icon"></span>
        <input
          type="text"
          className="filters-search-input"
          placeholder="Rechercher par nom, prénom ou CIN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filters-grid">

        <select
          className="filters-select"
          value={compteActif}
          onChange={e => setCompteActif(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="1">Actif</option>
          <option value="0">Inactif</option>
        </select>

        <select
          className="filters-select"
          value={ville}
          onChange={e => setVille(e.target.value)}
        >
          <option value="">Toutes les villes</option>
          {optionsVilles.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          className="filters-select"
          value={nationalite}
          onChange={e => setNationalite(e.target.value)}
        >
          <option value="">Toutes nationalités</option>
          {optionsNationalites.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <input
          type="date"
          className="filters-date"
          value={dateDebut}
          onChange={e => setDateDebut(e.target.value)}
        />

        <input
          type="date"
          className="filters-date"
          value={dateFin}
          onChange={e => setDateFin(e.target.value)}
        />

      </div>

      <div className="filters-reset-row">
        <button className="filters-reset-btn" onClick={resetFiltres}>
          Réinitialiser les filtres
        </button>
      </div>

    </div>
  )
}