<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KioskController;
use App\Http\Controllers\GameListController;
use App\Http\Controllers\PlayerInfoController;
use App\Http\Controllers\AuthPlayerController;
use App\Http\Controllers\AuthLoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ExternalLogoutController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('game', GameListController::class);
Route::get('/auth/{username}', AuthPlayerController::class);
Route::post('/auth/login', AuthLoginController::class);
Route::post('/auth/logout', LogoutController::class)
    ->middleware('auth:sanctum');

Route::get('/get-balance/{player_name?}', [
    KioskController::class, 'getPlayerBalance'
]);

Route::get('/player/{username}', PlayerInfoController::class);
Route::post('external-logout', ExternalLogoutController::class);
