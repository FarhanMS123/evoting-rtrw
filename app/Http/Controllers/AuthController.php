<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index () {
        return inertia("Auth/Login");
    }

    public function login (Request $request) {
        $cred = $request->validate([
            "nik" => ["required"],
            "password" => ["required"],
        ]);

        if ( Auth::attempt($cred) ) {
            $request->session()->regenerate();
            return redirect()->intended("home");
        }

        return back()->withErrors([
            "login" => false,
        ])->onlyInput("nik");
    }

    public function logout (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect("/");
    }
}
