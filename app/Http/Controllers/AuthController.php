<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login (Request $request) {
        $cred = $request->validate([
            "nik" => ["required"],
            "password" => ["required"],
        ]);

        if ( Auth::attempt($cred) ) {
            $request->session()->regenerate();
            if ($request->user()->is_admin) return redirect("/dashboard/users");
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

    public function forgotPassword (Request $request) {
        $data = $request->validate([
            "nik" => ["required", "digits:16"],
            "email" => ["required", "email"],
        ]);

        $status = Password::sendResetLink($data);

        return $status === Password::RESET_LINK_SENT
            ? back()->with(["status" => true])
            : back()->withErrors(["status" => false]);
    }

    public function resetPassword (Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    "password" => $password,
                ])->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) session()->flash("reset_password", true);

        return $status === Password::PASSWORD_RESET
            ? redirect()->route("login")
            : back()->withErrors(["errors" => true]);
    }
}
