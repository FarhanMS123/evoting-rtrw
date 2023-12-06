<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string("nik");
            $table->string('nama');
            $table->string("alamat");
            $table->string("pekerjaan");
            $table->set("jenis_kelamin", ["laki-laki", "perempuan"]);
            $table->string('password');

            $table->boolean("is_admin")->default(false);
            $table->rememberToken();
            $table->timestamps();

            $table->primary("nik");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
