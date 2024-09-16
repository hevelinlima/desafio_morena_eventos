<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'authenticate']);

// Route::group(['middleware'=> ['auth.jwt']], function(){
//   
//   Route::post('logout', [AuthController::class, 'lougout']);
// });

Route::middleware('auth.jwt')->group(function () {

  Route::prefix('users')->group(function () {
      Route::get('/get_user', [AuthController::class, 'get_user']);
      Route::post('/logout', [AuthController::class, 'logout']);
  });

});