<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RolesM
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (
            ($role == "is_admin" && Auth::user()->is_admin)
            || ($role == "non_villager" && Auth::user()->non_villager)
            || ($role == "is_villager" && !Auth::user()->non_villager)
            || ($role == "is_debug" && env("APP_DEBUG"))
        ) return $next($request);

        return redirect("/");
    }
}
