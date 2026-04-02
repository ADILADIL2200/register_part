import './ClientsList.css'
import useClients      from '../../hooks/useClients'
import ClientsFilters  from '../../components/clients/ClientsFilters'
import ClientsTable    from '../../components/clients/ClientsTable'
import Pagination      from '../../components/clients/Pagination'

export default function ClientsList() {
  const {
    clients, pagination, loading, error,
    optionsVilles, optionsNationalites,
    search, setSearch,
    compteActif, setCompteActif,
    ville, setVille,
    nationalite, setNationalite,
    dateDebut, setDateDebut,
    dateFin, setDateFin,
    sortBy, sortDir, handleSort,
    page, setPage,
    resetFiltres,
  } = useClients()

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <div className="page-header">
          <div>
            <h1 className="page-title">Mes Clients</h1>
            <p className="page-subtitle">Gérez et retrouvez rapidement vos clients</p>
          </div>
          <button className="btn-nouveau">+ Nouveau client</button>
        </div>

        <ClientsFilters
          search={search}           setSearch={setSearch}
          compteActif={compteActif} setCompteActif={setCompteActif}
          ville={ville}             setVille={setVille}
          nationalite={nationalite} setNationalite={setNationalite}
          dateDebut={dateDebut}     setDateDebut={setDateDebut}
          dateFin={dateFin}         setDateFin={setDateFin}
          optionsVilles={optionsVilles}
          optionsNationalites={optionsNationalites}
          resetFiltres={resetFiltres}
        />

        {error && <div className="error-banner">{error}</div>}

        <ClientsTable
          clients={clients}
          loading={loading}
          sortBy={sortBy}
          sortDir={sortDir}
          handleSort={handleSort}
        />

        <Pagination
          pagination={pagination}
          page={page}
          setPage={setPage}
        />

      </div>
    </div>
  )
}