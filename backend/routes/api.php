<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventGuestsCOntroller;
use App\Http\Controllers\EventsController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'authenticate']);

Route::get('events', [EventsController::class, 'index']);        
Route::get('events/{id}', [EventsController::class, 'show']); 

// Route::group(['middleware'=> ['auth.jwt']], function(){
//   
//   Route::post('logout', [AuthController::class, 'lougout']);
// });

Route::middleware('auth.jwt')->group(function () {

  Route::prefix('users')->group(function () {
      Route::get('/get_user', [AuthController::class, 'get_user']);
      Route::post('/logout', [AuthController::class, 'logout']);
      Route::get('/{userId}/events', [EventsController::class, 'eventsByUser']);
  });

  Route::prefix('events')->group(function () {
         
    Route::post('/', [EventsController::class, 'store']);        
    Route::put('/{id}', [EventsController::class, 'update']);    
    Route::delete('/{id}', [EventsController::class, 'destroy']);
  });

  Route::prefix('events/{eventId}/guests')->group(function () {
    Route::get('/', [EventGuestsCOntroller::class, 'index']);    
    Route::post('/', [EventGuestsCOntroller::class, 'store']);   
    Route::delete('/{guestId}', [EventGuestsCOntroller::class, 'destroy']);
  });
});
