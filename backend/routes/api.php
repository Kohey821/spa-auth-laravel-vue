<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/about', function () {
    return 'about from api';
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/current-user', [AuthenticatedSessionController::class, 'show']);
});
