<?php

// app/Models/Client.php    ← Le commentaire APRÈS <?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'avocat_id',
        'useer_id',
        'nom',
        'prenom',
        'cin',
        'passeport',
        'date_naissance',
        'nationalite',
        'telephone',
        'email',
        'adresse',
        'ville',
        'compte_actif',
        'notes',
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'compte_actif'   => 'boolean',
    ];

    public function avocat()
    {
        return $this->belongsTo(Avocat::class, 'avocat_id');
    }

    public function useer()
    {
        return $this->belongsTo(Useer::class, 'useer_id');
    }
}