<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\User;
use App\Models\Voting;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VotingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $votes = Voting::all();
        // $group = Voting::groupBy("vote")->selectRaw("vote, count(vote) as suara")->get();
        // $group = Calon::with(["user"])->leftJoin("votings", "calons.nomor", "=", "votings.vote")->get();
        // $group = Calon::with(["user"])->leftJoin("votings", function (JoinClause $join) {
        //     $join->on("calons.nomor", "=", "votings.vote")->groupBy("vote")->selectRaw("count(vote) as suara");
        $group = Calon::with(["user"])->leftJoinSub(
            Voting::groupBy("vote")->selectRaw("vote, count(vote) as suara"),
            "votings",
            "calons.nomor", "=", "votings.vote"
        )->get();
        $left = User::count() - Voting::count();
        return inertia("Result", [
            "votes" => $votes,
            "group" => $group,
            "left" => $left,
        ]);
    }

    public function printView() {
        $votes = Voting::all();
        $calons = Calon::with(["user"])->get();
        $group = Calon::with(["user"])->leftJoinSub(
            Voting::groupBy("vote")->selectRaw("vote, count(vote) as suara"),
            "votings",
            "calons.nomor", "=", "votings.vote"
        )->get();
        $left = User::count() - Voting::count();
        return inertia("ResultVer1", [
            "calons" => $calons,
            "votes" => $votes,
            "group" => $group,
            "left" => $left,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $calons = Calon::with(["user"])->get();
        return inertia("Voting", [
            "token" => $user->nonce_voting,
            "calons" => $calons,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->nonce_voting) return back()->withErrors([
            "vote" => "Sudah Memilih"
        ]);

        $token = Str::random(6);

        Voting::create([
            'token' => $token,
            'identifier' => $token . "_" . $user->nik,
            'verifier' => $token . "_" . $user->nik . "_" . $request->input("vote"),
            'vote' => $request->input("vote"),
        ]);

        $user->update([
            "nonce_voting" => $token,
        ]);

        session()->flash('token', $token);
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
