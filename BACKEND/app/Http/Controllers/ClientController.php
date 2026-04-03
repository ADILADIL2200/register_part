<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource ;
use App\Models\Client ;

class ClientController extends Controller
{
    public function store (StoreClientRequest $request){
        //  Récupération du useer connecté
        $useer = $request->user();
         // Récupérer son profil avocat
        $avocat = $useer->avocat;

        if (!$avocat) {
            return response()->json([
                'message' => 'Profil avocat introuvable. Complétez votre profil d\'abord.'
            ], 403);
        }
        // Création de client lié à cet avocat
        $client = $avocat->clients()->create($request->validated());
        // Retourner le client crée sous forme de ressource formatter et transformer 
        return new ClientResource($client);
    }
     public function index(Request $request)
    {
        $useer  = $request->user();
        $avocat = $useer->avocat;

        if (!$avocat) {
            return response()->json([
                'message' => 'Profil avocat introuvable.'
            ], 403);
        }

        // Tri : liste blanche pour la sécurité
        $colonnesAutorisees = ['nom', 'ville', 'created_at'];
        $sortBy  = in_array($request->sort_by, $colonnesAutorisees)
                   ? $request->sort_by
                   : 'created_at';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $clients = Client::pourAvocat($avocat->id)

            // Recherche : nom, prenom, cin
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->recherche($request->search);
            })

            // Filtre : statut compte
            ->when($request->filled('compte_actif'), function ($query) use ($request) {
                $query->where('compte_actif', (bool) $request->compte_actif);
            })

            // Filtre : ville
            ->when($request->filled('ville'), function ($query) use ($request) {
                $query->where('ville', $request->ville);
            })

            // Filtre : nationalité
            ->when($request->filled('nationalite'), function ($query) use ($request) {
                $query->where('nationalite', $request->nationalite);
            })

            // Filtre : date création début
            ->when($request->filled('date_debut'), function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request->date_debut);
            })

            // Filtre : date création fin
            ->when($request->filled('date_fin'), function ($query) use ($request) {
                $query->whereDate('created_at', '<=', $request->date_fin);
            })

            // Tri
            ->orderBy($sortBy, $sortDir)

            // Seulement les champs utiles pour la liste
            ->select([
                'id', 'nom', 'prenom', 'email', 'telephone',
                'ville', 'cin', 'passeport', 'compte_actif', 'created_at'
            ])

            ->paginate(15);

        return response()->json($clients);
    }
    public function filtres(Request $request)
    {
        $useer  = $request->user();
        $avocat = $useer->avocat;

        if (!$avocat) {
            return response()->json([
                'message' => 'Profil avocat introuvable.'
            ], 403);
        }

        $villes = Client::pourAvocat($avocat->id)
            ->whereNotNull('ville')
            ->distinct()
            ->orderBy('ville')
            ->pluck('ville');

        $nationalites = Client::pourAvocat($avocat->id)
            ->whereNotNull('nationalite')
            ->distinct()
            ->orderBy('nationalite')
            ->pluck('nationalite');

        return response()->json([
            'villes'       => $villes,
            'nationalites' => $nationalites,
        ]);
    }

}
