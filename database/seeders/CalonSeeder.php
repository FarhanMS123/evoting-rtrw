<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CalonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // File::copy(public_path("assets/paslon-1.jpg"), storage_path('app/public/paslon-1.jpg'));
        // File::copy(public_path("assets/paslon-2.jpg"), storage_path('app/public/paslon-2.jpg'));

        \App\Models\User::create([
            "nik" => "8899003112230901",
            "nama" => "Dr. Kitty",
            "alamat" => "Jl.",
            "pekerjaan" => "Psikiater",
            "telepon" => "+62",
            "jenis_kelamin" => "laki-laki",
            'password' => "TestPass123!",

            "is_admin" => false,
            "non_villager" => false,
        ]);

        \App\Models\Calon::create([
            'nomor' => 1,
            "nik" => "8899003112230901",
            'photo' => "/storage/paslon-1.jpg",
            'visi' => "Menciptakan RT/RW yang makmur dan sejahtera dengan merberdayakan tikus dan hewan-hewan kecil lainnya dalam kegiatan yang prduktif dan menghasilkan. Serta menciptakan ketentraman antar-kucing dan hewan-hewan lainnya dalam kesepakatan yang menguntungkan di kedua belah pihak.",
            'misi' => [
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
            ],
        ]);

        \App\Models\User::create([
            "nik" => "8899003112230902",
            "nama" => "Mr. Teddy Bear",
            "alamat" => "Jl.",
            "pekerjaan" => "CEO",
            "telepon" => "+62",
            "jenis_kelamin" => "laki-laki",
            'password' => "TestPass123!",

            "is_admin" => false,
            "non_villager" => false,
        ]);

        \App\Models\Calon::create([
            'nomor' => 2,
            "nik" => "8899003112230902",
            'photo' => "/storage/paslon-2.jpg",
            'visi' => "Menciptakan RT/RW yang manis dan tentram melalui program-program yang memadukan setiap makhluk dalam keuntungan setimpal.",
            'misi' => [
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
                "lorem ipsum dolor sit amet",
            ],
        ]);
    }
}
