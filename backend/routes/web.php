<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get(
    '/email/verify/{id}/{hash}',
    [VerifyEmailController::class, '__invoke']
)
    ->middleware(['auth', 'signed'])
    ->name('verification.verify');

Route::post(
    '/email/verification-notification',
    [EmailVerificationNotificationController::class, '__invoke']
)
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');
