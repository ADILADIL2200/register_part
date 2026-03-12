<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController ;

    Route::post('/register',      [RegisterController::class, 'register']);
        Route::post('/verify-email',  [RegisterController::class, 'verifyEmail']);

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working'
    ]);
});
        Route::post('/login',    [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile/avocat',    [RegisterController::class, 'completeAvocatProfile']);
    Route::post('/profile/client',    [RegisterController::class, 'completeClientProfile']);

});