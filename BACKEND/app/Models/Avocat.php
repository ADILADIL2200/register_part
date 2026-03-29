<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Avocat extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'useer_id', 'nom', 'prenom', 'telephone',
        'barreau', 'numero_ordre', 'date_inscription_barreau',
        'grade', 'specialite', 'nom_cabinet',
        'adresse_cabinet', 'ville', 'photo',
    ];
    protected $casts = [
        'date_inscription_barreau' => 'date',
    ];

    // Un avocat appartient à un useer
    public function useer()
    {
        return $this->belongsTo(Useer::class, 'useer_id');
    }

    // Un avocat a plusieurs clients
    public function clients()
    {
        return $this->hasMany(Client::class, 'avocat_id');
    }
    
}