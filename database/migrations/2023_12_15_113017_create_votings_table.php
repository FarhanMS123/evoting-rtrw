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
        Schema::create('votings', function (Blueprint $table) {
            $table->string("token");
            $table->string("identifier")->nullable(); // TOKEN_NIK
            $table->string("verifier")->nullable(); // TOKEN_NIK_VOTE
            $table->number("vote");

            $table->timestamps();
            $table->primary(["token"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votings');
    }
};
