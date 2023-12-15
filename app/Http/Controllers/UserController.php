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
        $users = User::all();
        return inertia("Dashboard/UserManagement", [
            "users" => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->index();
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
        $users = User::all();
        $warga = User::where("nik", $id)->firstOrFail();
        return inertia("Dashboard/UserManagement", [
            "users" => $users,
            "warga" => $warga,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return $this->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "nik" => ["nullable", "digits:16", "unique:users,nik"],
            "nama" => ["nullable"],
            "alamat" => ["nullable"],
            "pekerjaan" => ["nullable"],
            "telepon" => ["nullable", "unique:users,telepon"],
            "password" => ["nullable"],
            "jenis_kelamin" => ["nullable", Rule::in(["laki-laki", "perempuan"])],
            "is_admin" => ["nullable", "boolean"],
            "non_villager" => ["nullable", "boolean"],
        ]);
        $warga = User::where("nik", $id)->firstOrFail();
        $warga->update($data);
        if ($request->has("nik")) return redirect("/dashboard/users/" . $request->input("nik"));
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $warga = User::where("nik", $id)->firstOrFail();
        $warga->delete();
        return redirect("/dashboard/users");
    }
}
