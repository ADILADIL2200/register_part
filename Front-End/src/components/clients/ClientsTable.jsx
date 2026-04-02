import './ClientsTable.css'

export default function ClientsTable({ clients, loading, sortBy, sortDir, handleSort }) {

  const fleche = (colonne) => {
    if (sortBy !== colonne) return <span className="sort-arrow inactive">↕</span>
    return sortDir === 'asc'
      ? <span className="sort-arrow active">↑</span>
      : <span className="sort-arrow active">↓</span>
  }

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner" />
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty-icon">👤</div>
        <p className="table-empty-text">Aucun client trouvé</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="clients-table">

        <thead>
          <tr>
            <th className="sortable" onClick={() => handleSort('nom')}>
              Nom complet {fleche('nom')}
            </th>
            <th>Contact</th>
            <th className="sortable" onClick={() => handleSort('ville')}>
              Ville {fleche('ville')}
            </th>
            <th>CIN / Passeport</th>
            <th>Statut</th>
            <th>Depuis</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients.map(client => (
            <tr key={client.id}>

              <td>
                <span className="client-nom">
                  {client.prenom} {client.nom}
                </span>
              </td>

              <td>
                <div className="contact-email">{client.email || '—'}</div>
                <div className="contact-tel">{client.telephone || '—'}</div>
              </td>

              <td>{client.ville || '—'}</td>

              <td>
                <span className="cin-value">
                  {client.cin || client.passeport || '—'}
                </span>
              </td>

              <td>
                {client.compte_actif ? (
                  <span className="badge badge-actif">
                    <span className="badge-dot" /> Actif
                  </span>
                ) : (
                  <span className="badge badge-inactif">
                    <span className="badge-dot" /> Inactif
                  </span>
                )}
              </td>

              <td>
                <span className="date-value">
                  {new Date(client.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </span>
              </td>

              <td>
                <div className="actions-cell">
                  <button className="btn-action btn-voir">Voir</button>
                  <button className="btn-action btn-modifier">Modifier</button>
                  <button className="btn-action btn-supprimer">Supprimer</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}