<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    
    protected $fillable = [
        'user_id', 'title', 'description',
        'status', 'priority', 'date'
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