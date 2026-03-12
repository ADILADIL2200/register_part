<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Useer;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /**
     * Step 1: Accept email + role, send OTP
     */
    public function register(Request $request)
{
    $request->validate([
        'email' => 'required|email|unique:users,email',
        'role'  => 'nullable|in:avocat,client,admin',
    ]);

    $code = rand(100000, 999999);

    EmailVerification::where('email', $request->email)->delete();

    EmailVerification::create([
        'email'      => $request->email,
        'code'       => $code,
        'role'       => $request->role ?? 'avocat',
        'expires_at' => now()->addMinutes(10),
    ]);

    try {
        Mail::raw("Your verification code is: $code", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Email Verification Code');
        });
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to send email. Please check mail configuration.',
            'error'   => $e->getMessage(), // 👈 shows exact error
        ], 500);
    }

    return response()->json([
        'message' => 'Verification code sent to your email.',
        'email'   => $request->email,
        'role'    => $request->role ?? 'avocat',
        'expires_at' => now()->addMinutes(10)->toDateTimeString(),
        // code removed from response — only sent via email now
    ], 200);
}

    /**
     * Step 2: Verify OTP → create user → return token + next step
     */
public function verifyEmail(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code'  => 'required|digits:6',
            'password' => 'required|string|min:6|confirmed', // ← هنا فقط للـvalidation

    ]);

    // 1. Find the verification record
    $verification = EmailVerification::where('email', $request->email)
                                     ->where('code', $request->code)
                                     ->first();

    // 2. Not found
    if (!$verification) {
        return response()->json(['message' => 'Invalid verification code.'], 422);
    }

    // 3. Expired
    if (now()->isAfter($verification->expires_at)) {
        $verification->delete();
        return response()->json([
            'message' => 'Verification code has expired. Please register again.',
        ], 422);
    }

    // 4. Create user + token wrapped in try/catch
    try {
        $user = Useer::create([
            'email'             => $verification->email,
            'role'              => $verification->role,
            'email_verified_at' => now(),
                    'password'          => Hash::make($request->password), // ← هنا تحفظ الباسوورد فعلياً


        ]);

        $verification->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified successfully.',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Could not create account. Please try again.',
            'error'   => $e->getMessage(),
        ], 500);
    }


    
}
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

        if ($user->role !== 'avocat') {
            return response()->json(['message' => 'Unauthorized. Not an avocat account.'], 403);
        }

        if ($user->avocat()->exists()) {
            return response()->json(['message' => 'Profile already completed.'], 403);
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            try {
                $photoPath = $request->file('photo')->store('avocats/photos', 'public');
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Failed to upload photo.',
                    'error'   => $e->getMessage(),
                ], 500);
            }
        }

        $avocat = $user->avocat()->create([
            'useer_id'                 => $user->id,
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
            'message' => 'Avocat profile completed successfully.',
            'avocat'  => $avocat,
        ], 201);

    } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
        return response()->json([
            'message' => 'Numero ordre already exists.',
            'error'   => $e->getMessage(),
        ], 409);
    } catch (\Illuminate\Database\QueryException $e) {
        return response()->json([
            'message' => 'Database error while saving avocat profile.',
            'error'   => $e->getMessage(),
        ], 500);
    } catch (\Exception $e) {
        return response()->json([ 
            'message' => 'Unexpected error. Please try again.',
            'error'   => $e->getMessage(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile(),
        ], 500);
    }
}

public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:6',
    ]);

    try {

        // Find user
        $user = Useer::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'email' => $user->email,
                'role'  => $user->role,
            ]
        ], 200);

    } catch (\Illuminate\Database\QueryException $e) {

        return response()->json([
            'message' => 'Database error during login.',
            'error'   => $e->getMessage()
        ], 500);

    } catch (\Exception $e) {

        return response()->json([
            'message' => 'Unexpected error during login.',
            'error'   => $e->getMessage(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile()
        ], 500);
    }
}








}