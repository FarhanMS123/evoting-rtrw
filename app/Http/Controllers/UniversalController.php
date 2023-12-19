<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use Illuminate\Http\Request;

class UniversalController extends Controller
{
    public function showHome() {
        $calons = Calon::with(["user"])->get(); //->all();
        return inertia("Home", [
            "calons" => $calons,
        ]);
    }
}
