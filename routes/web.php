<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

require "auth.php";

Route::get('/', function () {
    if (session("login", false)) {
        return inertia("Home");
    } else {
        return to_route('login');
    }
})->name("home");

Route::redirect("/dashboard", "/dashboard/profile");
Route::inertia("/dashboard/profile", "Dashboard/Profile");

Route::resource('dashboard/users', UserController::class);
