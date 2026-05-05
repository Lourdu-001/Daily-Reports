<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;   // Use the trait

    protected $fillable = [
        'title',
        'description',
        'is_completed'
    ];
}
