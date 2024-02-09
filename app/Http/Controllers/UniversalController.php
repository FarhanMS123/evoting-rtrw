<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use App\Models\Voting;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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

    public function qrCode1(Request $request) {
        $token = $request->query("token", "");
        $nik = $request->query("nik", "");
        return response()->streamDownload(function () use ($token, $nik) {
            echo QrCode::size(500)->format('png')->generate(route("login", [
                "via" => "qr",
                "token" => $token,
                "nik" => $nik,
            ]));
        }, "qr-code-1.png");
    }
}
