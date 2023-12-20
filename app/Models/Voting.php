<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Voting extends Model
{
    use HasFactory;

    protected $primaryKey = 'token';
    protected $keyType = 'string';
    public $incrementing = false;

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

    public function peserta(): HasOne {
        return $this->hasOne(User::class, 'nonce_voting', "token");
    }
}
