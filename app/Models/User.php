<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relationships
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    public function foods()
    {
        return $this->hasMany(Food::class);
    }
}