<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import this

class Product extends Model
{
    use SoftDeletes; // Add this line inside the class
    
    protected $fillable = ['name', 'stock_quantity', 'price', 'category'];
}
?>