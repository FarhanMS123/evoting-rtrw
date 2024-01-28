<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CalonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $calons = $calons = Calon::with(["user"])->get();

        $str = $request->query("s", "");
        $str = Str::replace("\\", "\\\\", $str);
        $str = Str::replace("%", "\\%", $str);

        $users = User::limit(10)->where("nik", "LIKE", "%" . $str . "%")->orWhere("nama", "LIKE", "%" . $str . "%")->get();
        return inertia("Dashboard/CalonManagement", [
            "calons" => $calons,
            "users" => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return $this->index($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $calon = $calons = Calon::where("nomor", $id)->with(["user"])->firstOrFail();
        $calons = $calons = Calon::with(["user"])->get();

        $str = $request->query("s", "");
        $str = Str::replace("\\", "\\\\", $str);
        $str = Str::replace("%", "\\%", $str);
        $users = User::limit(10)->where("nik", "LIKE", "%" . $str . "%")->orWhere("nama", "LIKE", "%" . $str . "%")->get();

        return inertia("Dashboard/CalonManagement", [
            "calon" => $calon,
            "calons" => $calons,
            "users" => $users,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
