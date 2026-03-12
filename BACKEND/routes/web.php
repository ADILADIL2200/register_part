<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController ;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register.form');
// Route::post('/register', [RegisterController::class, 'register'])->name('register');
// Route::get('/verify-email', [RegisterController::class, 'showVerifyForm'])->name('verify.email');
// Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);