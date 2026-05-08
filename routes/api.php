<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\FoodController;

// ── Public Routes (no auth needed) ──
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ── Protected Routes (auth required) ──
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Tasks
    Route::get('/tasks',          [TaskController::class, 'index']);
    Route::post('/tasks',         [TaskController::class, 'store']);
    Route::put('/tasks/{id}',     [TaskController::class, 'update']);
    Route::delete('/tasks/{id}',  [TaskController::class, 'destroy']);

    // Workouts
    Route::get('/workouts',         [WorkoutController::class, 'index']);
    Route::post('/workouts',        [WorkoutController::class, 'store']);
    Route::put('/workouts/{id}',    [WorkoutController::class, 'update']);
    Route::delete('/workouts/{id}', [WorkoutController::class, 'destroy']);

    // Foods
    Route::get('/foods',         [FoodController::class, 'index']);
    Route::post('/foods',        [FoodController::class, 'store']);
    Route::put('/foods/{id}',    [FoodController::class, 'update']);
    Route::delete('/foods/{id}', [FoodController::class, 'destroy']);

});