<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

Route::inertia('/', "Home")->middleware("auth")->name("home");
Route::inertia('/pemilihan', "Voting")->middleware("auth")->name("voting");

Route::redirect("/dashboard", "/dashboard/profile")->middleware(["auth"]);
Route::inertia("/dashboard/profile", "Dashboard/Profile")->middleware(["auth"]);

Route::resource('dashboard/users', UserController::class)->middleware(["auth", "rolem:is_admin"]);

Route::inertia("/dashboard/debug", "Dashboard/Debug")->middleware(["auth", "rolem:is_admin"]);
Route::post("/dashboard/debug", function (Request $request) {
    $exitCode = Artisan::call($request->input("cmd"));
    return response()->json([ $exitCode ]);
})->middleware(["auth", "rolem:is_admin", "rolem:is_debug"]);
