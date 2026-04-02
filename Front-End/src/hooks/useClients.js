import { useState, useEffect } from 'react'   // ← retire useCallback
import api from '../services/axios'

export default function useClients() {

  const [search,       setSearch]       = useState('')
  const [compteActif,  setCompteActif]  = useState('')
  const [ville,        setVille]        = useState('')
  const [nationalite,  setNationalite]  = useState('')
  const [dateDebut,    setDateDebut]    = useState('')
  const [dateFin,      setDateFin]      = useState('')
  const [sortBy,       setSortBy]       = useState('created_at')
  const [sortDir,      setSortDir]      = useState('desc')
  const [page,         setPage]         = useState(1)

  const [clients,      setClients]      = useState([])
  const [pagination,   setPagination]   = useState(null)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState(null)

  const [optionsVilles,       setOptionsVilles]       = useState([])
  const [optionsNationalites, setOptionsNationalites] = useState([])

  // Debounce sur la recherche
  const [searchDebounce, setSearchDebounce] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(search)
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  // Chargement dropdowns
  useEffect(() => {
    api.get('/clients/filtres')
      .then(res => {
        setOptionsVilles(res.data.villes)
        setOptionsNationalites(res.data.nationalites)
      })
      .catch(() => {})
  }, [])

  // ── Appel API principal ───────────────────────────────────
  useEffect(() => {
    let ignore = false

    const params = { page }
    if (searchDebounce) params.search       = searchDebounce
    if (compteActif)    params.compte_actif = compteActif
    if (ville)          params.ville        = ville
    if (nationalite)    params.nationalite  = nationalite
    if (dateDebut)      params.date_debut   = dateDebut
    if (dateFin)        params.date_fin     = dateFin
    params.sort_by  = sortBy
    params.sort_dir = sortDir

    // ── setLoading et setError maintenant dans la promesse ──
    api.get('/clients', { params })
      .then(res => {
        if (ignore) return
        setLoading(false)
        setError(null)
        setClients(res.data.data)
        setPagination({
          currentPage: res.data.current_page,
          lastPage:    res.data.last_page,
          total:       res.data.total,
          perPage:     res.data.per_page,
        })
      })
      .catch(() => {
        if (ignore) return
        setLoading(false)
        setError('Erreur lors du chargement des clients.')
      })

    return () => { ignore = true }

  }, [searchDebounce, compteActif, ville, nationalite, dateDebut, dateFin, sortBy, sortDir, page])

  // ── Tri ───────────────────────────────────────────────────
  const handleSort = (colonne) => {
    if (sortBy === colonne) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(colonne)
      setSortDir('asc')
    }
    setPage(1)
  }

  // ── Reset ─────────────────────────────────────────────────
  const resetFiltres = () => {
    setSearch('')
    setCompteActif('')
    setVille('')
    setNationalite('')
    setDateDebut('')
    setDateFin('')
    setSortBy('created_at')
    setSortDir('desc')
    setPage(1)
  }

  return {
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
  }
}