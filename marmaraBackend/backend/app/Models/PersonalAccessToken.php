<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class PersonalAccessToken extends Model
{
    use HasFactory, HasApiTokens;

    protected $table ="personal_access_tokens";

    protected $fillable = [
        'user_id',
        'token',
        'abilities',
    ];
}
