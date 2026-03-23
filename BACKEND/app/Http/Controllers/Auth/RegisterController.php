<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Useer;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;





class RegisterController extends Controller
{
    // ── ÉTAPE 1 : Inscription → envoie OTP ───────────────
    public function register(Request $request)
    {
        $request->validate([
            // ✅ FIX : useers (double e) pas users
            'email' => 'required|email|unique:useers,email',
            'role'  => 'nullable|in:avocat,client,admin',
        ]);

        $code = rand(100000, 999999);

        // Supprimer l'ancien code si existant
        EmailVerification::where('email', $request->email)->delete();

        // Créer le nouveau code
        EmailVerification::create([
            'email'      => $request->email,
            'code'       => $code,
            'role'       => $request->role ?? 'avocat',
            'expires_at' => now()->addMinutes(10),
        ]);

        // Envoyer l'email
        try {
            Mail::raw("Votre code de vérification est : $code", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject('Code de vérification - Espace Avocat');
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Impossible d\'envoyer l\'email. Vérifiez la configuration mail.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message'    => 'Code de vérification envoyé à votre email.',
            'email'      => $request->email,
            'role'       => $request->role ?? 'avocat',
            'expires_at' => now()->addMinutes(10)->toDateTimeString(),
        ], 200);
    }

    // ── ÉTAPE 2 : Vérifier OTP → créer user ──────────────
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'code'     => 'required|digits:6',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Chercher le code de vérification
        $verification = EmailVerification::where('email', $request->email)
                                         ->where('code', $request->code)
                                         ->first();

        // Code invalide
        if (!$verification) {
            return response()->json(['message' => 'Code de vérification invalide.'], 422);
        }

        // Code expiré
        if (now()->isAfter($verification->expires_at)) {
            $verification->delete();
            return response()->json([
                'message' => 'Code expiré. Veuillez vous réinscrire.',
            ], 422);
        }

        // Créer le compte
        try {
            $user = Useer::create([
                'email'             => $verification->email,
                'role'              => $verification->role,
                'email_verified_at' => now(),
                'password'          => Hash::make($request->password),
            ]);

            $verification->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Email vérifié avec succès.',
                'token'   => $token,
                'user'    => [
                    'id'    => $user->id,
                    'email' => $user->email,
                    'role'  => $user->role,
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Impossible de créer le compte. Réessayez.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ── ÉTAPE 3 : Compléter profil avocat ────────────────
    public function completeAvocatProfile(Request $request)
    {
        $request->validate([
            'nom'                      => 'required|string|max:100',
            'prenom'                   => 'required|string|max:100',
            'telephone'                => 'nullable|string|max:20',
            'barreau'                  => 'required|in:Casablanca,Rabat,Marrakech,Fes,Agadir,Tanger,Meknes,Oujda,Kenitra,Autre',
            'numero_ordre'             => 'required|string|max:50|unique:avocats,numero_ordre',
            'date_inscription_barreau' => 'nullable|date',
            'grade'                    => 'nullable|in:stagiaire,titulaire',
            'specialite'               => 'nullable|string|max:150',
            'nom_cabinet'              => 'nullable|string|max:200',
            'adresse_cabinet'          => 'nullable|string',
            'ville'                    => 'nullable|string|max:100',
            'photo'                    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            $user = $request->user();

            // Vérifier que c'est un avocat
            if ($user->role !== 'avocat') {
                return response()->json(['message' => 'Non autorisé. Compte non avocat.'], 403);
            }

            // Vérifier que le profil n'est pas déjà complété
            if ($user->avocat()->exists()) {
                return response()->json(['message' => 'Profil déjà complété.'], 403);
            }

            // Upload photo
            $photoPath = null;
            if ($request->hasFile('photo')) {
                try {
                    $photoPath = $request->file('photo')->store('avocats/photos', 'public');
                } catch (\Exception $e) {
                    return response()->json([
                        'message' => 'Erreur lors de l\'upload de la photo.',
                        'error'   => $e->getMessage(),
                    ], 500);
                }
            }

            // ✅ FIX : Pas de useer_id ici, la relation le gère automatiquement
            $avocat = $user->avocat()->create([
                'nom'                      => $request->nom,
                'prenom'                   => $request->prenom,
                'telephone'                => $request->telephone,
                'barreau'                  => $request->barreau,
                'numero_ordre'             => $request->numero_ordre,
                'date_inscription_barreau' => $request->date_inscription_barreau,
                'grade'                    => $request->grade ?? 'titulaire',
                'specialite'               => $request->specialite,
                'nom_cabinet'              => $request->nom_cabinet,
                'adresse_cabinet'          => $request->adresse_cabinet,
                'ville'                    => $request->ville,
                'photo'                    => $photoPath,
            ]);

            return response()->json([
                'message' => 'Profil avocat complété avec succès.',
                'avocat'  => $avocat,
            ], 201);

        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            return response()->json([
                'message' => 'Ce numéro d\'ordre existe déjà.',
                'error'   => $e->getMessage(),
            ], 409);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Erreur base de données.',
                'error'   => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur inattendue.',
                'error'   => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile(),
            ], 500);
        }
    }

    // ── LOGIN ─────────────────────────────────────────────
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        try {
            $user = Useer::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(['message' => 'Email ou mot de passe incorrect.'], 401);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Email ou mot de passe incorrect.'], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Connexion réussie.',
                'token'   => $token,
                'user'    => [
                    'id'          => $user->id,
                    'email'       => $user->email,
                    'role'        => $user->role,
                    'has_profile' => $user->avocat()->exists(),
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur inattendue lors de la connexion.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ── GOOGLE REDIRECT ───────────────────────────────────
    public function googleRedirect()
    {
        // Redirige l'utilisateur vers la page de connexion Google
        return Socialite::driver('google')->stateless()->redirect();
    }

    // ── GOOGLE CALLBACK ───────────────────────────────────
    public function googleCallback()
    {
        try {
            // Récupère les infos de l'utilisateur depuis Google
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return redirect(env('FRONTEND_URL') . '/login?error=google_failed');
        }

        // ✅ Cherche l'utilisateur ou le crée (upsert)
        $user = Useer::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'google_id'         => $googleUser->getId(),
                'role'              => 'avocat',
                'is_active'         => true,
                'email_verified_at' => now(),
                'password'          => null,
            ]
        );

        // Supprimer anciens tokens pour sécurité
        $user->tokens()->delete();

        // Générer nouveau token Sanctum
        $token = $user->createToken('google_token')->plainTextToken;

        // ✅ FIX : Ajouter has_profile pour savoir si profil est complété
        $userData = urlencode(json_encode([
            'id'          => $user->id,
            'email'       => $user->email,
            'role'        => $user->role,
            'has_profile' => $user->avocat()->exists(),
        ]));

        // Rediriger vers React avec le token
        return redirect(
            env('FRONTEND_URL') . '/auth/callback?token=' . $token . '&user=' . $userData
        );
    }


  public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = Useer::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'If this email exists, a reset link has been sent.'
            ]);
        }

        $token = Str::random(64);

        DB::table('password_resets')->where('email', $request->email)->delete();
        DB::table('password_resets')->insert([
            'email'      => $request->email,
            'token'      => Hash::make($token),
            'created_at' => now(),
        ]);

        $resetLink = "http://localhost:5173/ResetPassword?token=$token&email={$request->email}";

        try {
            Mail::raw("Click this link to reset your password: $resetLink", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject('Password Reset Link');
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send email',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'If this email exists, a reset link has been sent.'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'token'    => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid request'], 422);
        }

        if (!Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'Invalid or expired token'], 422);
        }

        if (now()->diffInMinutes($record->created_at) > 15) {
            DB::table('password_resets')->where('email', $request->email)->delete();
            return response()->json(['message' => 'Token expired'], 422);
        }

        try {
            $user = Useer::where('email', $request->email)->first();

            $user->update([
                'password' => Hash::make($request->password)
            ]);

            DB::table('password_resets')->where('email', $request->email)->delete();

            return response()->json([
                'message' => 'Password reset successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error resetting password',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function getAvocatProfile(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->role !== 'avocat') {
                return response()->json(['message' => 'Unauthorized. Not an avocat.'], 403);
            }

            $avocat = $user->avocat;

            if (!$avocat) {
                return response()->json(['message' => 'Profile not found'], 404);
            }

            return response()->json([
                'user' => [
                    'id'    => $user->id,
                    'email' => $user->email,
                    'role'  => $user->role,
                ],
                'avocat' => [
                    'nom'                      => $avocat->nom,
                    'prenom'                   => $avocat->prenom,
                    'telephone'                => $avocat->telephone,
                    'barreau'                  => $avocat->barreau,
                    'numero_ordre'             => $avocat->numero_ordre,
                    'date_inscription_barreau' => $avocat->date_inscription_barreau,
                    'grade'                    => $avocat->grade,
                    'specialite'               => $avocat->specialite,
                    'nom_cabinet'              => $avocat->nom_cabinet,
                    'adresse_cabinet'          => $avocat->adresse_cabinet,
                    'ville'                    => $avocat->ville,
                    'photo'                    => $avocat->photo ? asset('storage/' . $avocat->photo) : null,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching profile',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
 

    // ── UPDATE PROFIL AVOCAT ──────────────────────────────
public function updateAvocatProfile(Request $request)
{
    try {
        $user = $request->user();

        // Vérifier que c'est un avocat
        if ($user->role !== 'avocat') {
            return response()->json(['message' => 'Non autorisé. Compte non avocat.'], 403);
        }

        // Vérifier que le profil existe
        $avocat = $user->avocat;
        if (!$avocat) {
            return response()->json(['message' => 'Profil introuvable. Veuillez d\'abord compléter votre profil.'], 404);
        }

        $request->validate([
            'nom'                      => 'sometimes|string|max:100',
            'prenom'                   => 'sometimes|string|max:100',
            'telephone'                => 'nullable|string|max:20',
            'barreau'                  => 'sometimes|in:Casablanca,Rabat,Marrakech,Fes,Agadir,Tanger,Meknes,Oujda,Kenitra,Autre',
            'numero_ordre'             => 'sometimes|string|max:50|unique:avocats,numero_ordre,' . $avocat->id,
            'date_inscription_barreau' => 'nullable|date',
            'grade'                    => 'nullable|in:stagiaire,titulaire',
            'specialite'               => 'nullable|string|max:150',
            'nom_cabinet'              => 'nullable|string|max:200',
            'adresse_cabinet'          => 'nullable|string',
            'ville'                    => 'nullable|string|max:100',
            'photo'                    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Upload nouvelle photo et suppression de l'ancienne
        if ($request->hasFile('photo')) {
            try {
                // Supprimer l'ancienne photo si elle existe
                if ($avocat->photo && \Storage::disk('public')->exists($avocat->photo)) {
                    \Storage::disk('public')->delete($avocat->photo);
                }
                $photoPath = $request->file('photo')->store('avocats/photos', 'public');
                $avocat->photo = $photoPath;
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Erreur lors de l\'upload de la photo.',
                    'error'   => $e->getMessage(),
                ], 500);
            }
        }

        // Mettre à jour uniquement les champs envoyés (PATCH-style)
        $avocat->fill($request->only([
            'nom',
            'prenom',
            'telephone',
            'barreau',
            'numero_ordre',
            'date_inscription_barreau',
            'grade',
            'specialite',
            'nom_cabinet',
            'adresse_cabinet',
            'ville',
        ]));

        $avocat->save();

        return response()->json([
            'message' => 'Profil avocat mis à jour avec succès.',
            'avocat'  => [
                'nom'                      => $avocat->nom,
                'prenom'                   => $avocat->prenom,
                'telephone'                => $avocat->telephone,
                'barreau'                  => $avocat->barreau,
                'numero_ordre'             => $avocat->numero_ordre,
                'date_inscription_barreau' => $avocat->date_inscription_barreau,
                'grade'                    => $avocat->grade,
                'specialite'               => $avocat->specialite,
                'nom_cabinet'              => $avocat->nom_cabinet,
                'adresse_cabinet'          => $avocat->adresse_cabinet,
                'ville'                    => $avocat->ville,
                'photo'                    => $avocat->photo ? asset('storage/' . $avocat->photo) : null,
            ],
        ], 200);

    } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
        return response()->json([
            'message' => 'Ce numéro d\'ordre est déjà utilisé.',
            'error'   => $e->getMessage(),
        ], 409);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Données invalides.',
            'errors'  => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur inattendue.',
            'error'   => $e->getMessage(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile(),
        ], 500);
    }
}











}
