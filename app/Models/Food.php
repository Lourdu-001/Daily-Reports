<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'foods';
    
    protected $fillable = [
        'user_id', 'food_name', 'meal_type',
        'calories', 'protein', 'carbs', 'fats', 'notes', 'date'
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
