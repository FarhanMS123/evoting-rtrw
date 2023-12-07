<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Dashboard/UserManagement");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nik" => ["required", "digits:16", "unique:users,nik"],
            "nama" => ["required"],
            "alamat" => ["required"],
            "pekerjaan" => ["required"],
            "telepon" => ["nullable", "unique:users,telepon"],
            "password" => ["required"],
            "jenis_kelamin" => ["required", Rule::in(["laki-laki", "perempuan"])],
            "is_admin" => ["nullable", "boolean"],
            "non_villager" => ["nullable", "boolean"],
        ]);

        User::create([
            "nik" => $request->input("nik"),
            "nama" => $request->input("nama"),
            "alamat" => $request->input("alamat"),
            "pekerjaan" => $request->input("pekerjaan"),
            "telepon" => $request->input("telepon"),
            "password" => $request->input("password"),
            "jenis_kelamin" => $request->input("jenis_kelamin"),
            "is_admin" => $request->input("is_admin", false),
            "non_villager" => $request->input("non_villager", false),
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
