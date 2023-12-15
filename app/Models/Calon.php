<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
