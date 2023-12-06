<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
