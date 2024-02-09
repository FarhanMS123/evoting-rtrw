<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use App\Models\Voting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

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
        $data = $request->validate([
            "nomor" => ["nullable", "numeric"],
            "nik" => ["required", "digits:16", "unique:calons,nik"],
            "photo" => ["required", "image"],
            "visi" => ["required", "string"],
            "misi" => ["required", "string"],
        ]);

        $photo = $request->file("photo")->store("", "public");

        if (env("DEPLOYPATH", false)) {
            // Storage::copy(storage_path("app/public/" . $photo), base_path(env("DEPLOYPATH") . "/storage/" . $photo));
            // Storage::disk("deploy")
            //     ->copy(storage_path("app/public/" . $photo), "storage/" . $photo);
            copy(storage_path("app/public/" . $photo), env("DEPLOYPATH") . "/storage/" . $photo);
        }

        $photo = "/storage/" . $photo;
        $data["photo"] = $photo;

        Calon::create($data);

        return back();
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
    public function edit(Request $request, string $id)
    {
        return $this->show($request, $id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "nomor" => ["nullable", "numberic"],
            "nik" => ["nullable", "digits:16", "unique:calons,nik"],
            "photo" => ["nullable", "image"],
            "visi" => ["nullable", "string"],
            "misi" => ["nullable", "string"],
        ]);
        $calon = Calon::where("nomor", $id)->firstOrFail();

        if ($request->file("photo")) {
            $photo = $request->file("photo")->store("", "public");

            if (env("DEPLOYPATH", false)) {
                // Storage::copy(storage_path("app/public/" . $photo), env("DEPLOYPATH") . "/storage/" . $photo);
                copy(storage_path("app/public/" . $photo), env("DEPLOYPATH") . "/storage/" . $photo);
            }

            $photo = "/storage/" . $photo;
            $data["photo"] = $photo;
        }

        // dd("hehehehe", $request->file("photo"));

        $calon->update($data);
        if ($request->has("nomor")) return redirect("/dashboard/calons/" . $request->input("nomor"));
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $calon = Calon::where("nomor", $id)->firstOrFail();

        User::join("votings", "users.nonce_voting", "LIKE", "votings.token")
            ->whereNot("users.nik", $calon->nik)
            ->where("votings.vote", $calon->nomor)
            ->update([
                "nonce_voting" => null,
            ]);
        Voting::where("vote", $calon->nomor)->delete();

        $calon->delete();
        return redirect("/dashboard/calons");
    }
}
