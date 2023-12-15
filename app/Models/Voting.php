<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voting extends Model
{
    use HasFactory;

    protected $primaryKey = 'token';

    protected $fillable = [
        'token',
        'identifier',
        'verifier',
        'vote',
    ];

    protected $hidden = [
        'identifier',
        'verifier',
    ];

    protected $casts = [
        'identifier' => 'hashed',
        'verifier' => 'hashed',
    ];

}
