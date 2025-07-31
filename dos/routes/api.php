<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KioskController;
use App\Http\Controllers\GameListController;
use App\Http\Controllers\PlayerInfoController;

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

Route::get('/get-balance/{player_name?}', [
    KioskController::class, 'getPlayerBalance'
]);

Route::get('/player/{username}', PlayerInfoController::class);

