import './Pagination.css'

export default function Pagination({ pagination, page, setPage }) {
  if (!pagination || pagination.lastPage <= 1) return null

  return (
    <div className="pagination-wrapper">

      <p className="pagination-info">
        <span>{pagination.total}</span> clients au total
      </p>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          ← Précédent
        </button>

        <span className="pagination-page">
          Page <span>{pagination.currentPage}</span> sur {pagination.lastPage}
        </span>

        <button
          className="pagination-btn"
          onClick={() => setPage(p => p + 1)}
          disabled={page === pagination.lastPage}
        >
          Suivant →
        </button>
      </div>

    </div>
  )
}