<?php
use Illuminate\Support\Facades\Route;

// ✅ Catch ALL routes and pass to React
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

?>
