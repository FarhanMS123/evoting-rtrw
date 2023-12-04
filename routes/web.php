<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
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

Route::get('/', function () {
    if (session("login", false)) {
        return inertia("Home");
    } else {
        return to_route('login');
    }
})->name("home");

Route::get('/auth/login', function () {
    if (session("login", false)) {
        return to_route("home");
    } else {
        return inertia("Auth/Login");
    }
})->name("login");

Route::post('/auth/login', function (Request $req) {
    if ( $req->input("nik") == "8899003112230000" && $req->input("password") == "TestPass123!" ) {
        session(["login" => true]);
        return to_route("home");
    }
    return back()->withErrors([
        "login" => false,
    ]);
});

Route::post('/auth/logout', function (Request $req) {
    session(["login" => false]);
    return to_route("login");
})->name("logout");
