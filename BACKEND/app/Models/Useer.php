<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Useer extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'useers';

    protected $fillable = [
        'email',
        'password',
        'role',
        'google_id',
        'is_active',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
    ];

public function avocat()
{
    return $this->hasOne(Avocat::class, 'useer_id');
}
}