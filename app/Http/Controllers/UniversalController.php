<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use App\Models\Voting;
use Illuminate\Http\Request;

class UniversalController extends Controller
{
    public function showHome() {
        $calons = Calon::with(["user"])->get();
        return inertia("Home", [
            "calons" => $calons,
        ]);
    }

    public function cleanVoting() {
        Voting::whereNotIn("token", User::select("nonce_voting")->whereNot("nonce_voting", null))->delete();

        return response()->json([
            "type" => "voting",
            "clean" => "true",
        ]);
    }
}
