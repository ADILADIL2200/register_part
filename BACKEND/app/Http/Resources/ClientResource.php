<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id'             => $this->id,
            'nom'            => $this->nom,
            'prenom'         => $this->prenom,
            'cin'            => $this->cin,
            'passeport'      => $this->passeport,
            'date_naissance' => $this->date_naissance?->format('d/m/Y'),
            'nationalite'    => $this->nationalite,
            'telephone'      => $this->telephone,
            'email'          => $this->email,
            'adresse'        => $this->adresse,
            'ville'          => $this->ville,
            'compte_actif'   => $this->compte_actif,
            'notes'          => $this->notes,
            'created_at'     => $this->created_at->format('d/m/Y'),
        ];
    }
}
