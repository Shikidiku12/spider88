<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AuthController;

Route::get('/', WelcomeController::class);
Route::post('/web-api/login', LoginController::class);
Route::post('/get-access-token', [AuthController::class, 'getAccessToken']);
Route::post('/extract-values-from-token', [AuthController::class, 'extractValuesFromToken']);