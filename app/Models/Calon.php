<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Calon extends Model
{
    use HasFactory;

    protected $primaryKey = 'nomor';

    protected $fillable = [
        'nomor',
        'nik',
        'photo',
        'visi',
        'misi',
    ];

    protected $casts = [
        'misi' => 'array',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, "nik", "nik");
    }
}
