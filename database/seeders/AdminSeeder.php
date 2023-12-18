<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            "nik" => "8899003112230000",
            "nama" => "Default Admin",
            "alamat" => "Jl.",
            "pekerjaan" => "Admin",
            "telepon" => "+62",
            "jenis_kelamin" => "laki-laki",
            'password' => "TestPass123!",

            "is_admin" => true,
            "non_villager" => true,
        ]);
    }
}
