<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

// ── Routes publiques ─────────────────────────────────
Route::post('/register',     [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/login',        [RegisterController::class, 'login']);
  Route::post('/sendResetLink',    [RegisterController::class, 'sendResetLink']);
                 Route::post('/resetPassword',    [RegisterController::class, 'resetPassword']);




// ── Google OAuth ──────────────────────────────────────
Route::get('/auth/google',          [RegisterController::class, 'googleRedirect']);
Route::get('/auth/google/callback', [RegisterController::class, 'googleCallback']);

// ── Test ──────────────────────────────────────────────
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/avocat/profile',    [RegisterController::class, 'updateAvocatProfile']);
        Route::post('/profile/avocat',    [RegisterController::class, 'completeAvocatProfile']);


        Route::get('/avocat/profile',    [RegisterController::class, 'getAvocatProfile']);

});
