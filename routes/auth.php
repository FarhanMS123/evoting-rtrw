<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

// GET  /dashboard/profile
// POST /dashboard/update

Route::inertia('/auth/login', "Auth/Login", [
    "reset_password" => fn () => session("reset_password", false),
])->middleware("guest")->name("login");
Route::inertia("/auth/forget-password", "Auth/ForgetPassword")->name('password.request');
Route::inertia("/auth/reset-password/{token}", "Auth/ResetPassword", [
    "token" => fn () => request()->route("token"),
    "email" => fn () => request()->query("email"),
])->name('password.reset');

Route::post('/auth/forget-password', [AuthController::class, "forgotPassword"])->name('password.email');
Route::post('/auth/reset-password', [AuthController::class, "resetPassword"])->name('password.update');
Route::post('/auth/login', [AuthController::class, "login"])->name("login")->middleware("guest");
Route::post('/auth/logout', [AuthController::class, "logout"])->middleware("auth")->name("logout");
