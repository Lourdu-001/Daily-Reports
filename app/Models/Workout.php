<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $table = 'workouts';
    
    protected $fillable = [
        'user_id', 'exercise_name', 'sets',
        'reps', 'duration', 'category', 'notes', 'date'
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',  // ← forces clean date format
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

?>