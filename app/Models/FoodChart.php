<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodChart extends Model
{
    protected$fillable = [
        'food_name',
        'calories',
        'carbs',
        'protein',
        'fats',
        'unit'
    ];

    


}
