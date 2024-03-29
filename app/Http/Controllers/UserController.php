<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use App\Models\Voting;
use App\Notifications\UpdateUserInfo;
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
        $data = $request->validate([
            "nik" => ["required", "digits:16", "unique:users,nik"],
            "nama" => ["required"],
            "alamat" => ["required"],
            "pekerjaan" => ["required"],
            "email" => ["nullable", "email", "unique:users,email"],
            "telepon" => ["nullable", "unique:users,telepon"],
            "password" => ["nullable"],
            "jenis_kelamin" => ["required", Rule::in(["laki-laki", "perempuan"])],
            "is_admin" => ["nullable", "boolean"],
            "non_villager" => ["nullable", "boolean"],
            "also_email" => ["nullable", "boolean"],
        ]);

        if (!array_key_exists("password", $data)) $data["password"] = fake("en_US")->colorName() . fake()->numberBetween(100, 999);

        $user = User::create($data);
        if ($data["also_email"]) $user->notify(new UpdateUserInfo($data["nik"], $user, $data["password"]));

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
            "email" => ["nullable", "email", "unique:users,email"],
            "telepon" => ["nullable", "unique:users,telepon"],
            "password" => ["nullable"],
            "jenis_kelamin" => ["nullable", Rule::in(["laki-laki", "perempuan"])],
            "is_admin" => ["nullable", "boolean"],
            "non_villager" => ["nullable", "boolean"],
            "also_email" => ["nullable", "boolean"],
        ]);
        $warga = User::where("nik", $id)->firstOrFail();
        $warga->update($data);
        if ($data["also_email"]) $warga->notify(new UpdateUserInfo(
            array_key_exists("nik", $data) ? $data["nik"] : $warga->nik,
            $warga,
            array_key_exists("password", $data) ? $data["password"] : null
        ));

        if ($request->has("nik")) return redirect("/dashboard/users/" . $request->input("nik"));
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $warga = User::where("nik", $id)->firstOrFail();

        $calon = Calon::where("nik", $warga->nik)->first();
        if ($calon) {
            User::join("votings", "users.nonce_voting", "LIKE", "votings.token")
                ->whereNot("users.nik", $calon->nik)
                ->where("votings.vote", $calon->nomor)
                ->update([
                    "nonce_voting" => null,
                ]);
            Voting::where("vote", $calon->nomor)->delete();
            $calon->delete();
        }

        $warga->delete();
        Voting::where("token", "=", $warga->nonce_voting)->delete();

        return redirect("/dashboard/users");
    }
}
