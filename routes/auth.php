<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// GET /dashboard/profile
// POST /dashboard/update

Route::get('/auth/login', [AuthController::class, "index"])->middleware("guest")->name("login");
Route::post('/auth/login', [AuthController::class, "login"])->middleware("guest");
Route::post('/auth/logout', [AuthController::class, "logout"])->middleware("auth")->name("logout");
