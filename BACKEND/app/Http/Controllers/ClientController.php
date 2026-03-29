<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource ;

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
}
