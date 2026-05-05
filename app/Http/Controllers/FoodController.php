<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // ── Get all foods ──
    public function index(Request $request)
    {
        $foods = Food::where('user_id', $request->user()->id)
                     ->orderBy('date', 'desc')
                     ->get();

        return response()->json([
            'success' => true,
            'foods'   => $foods,
        ]);
    }

    // ── Create food ──
    public function store(Request $request)
    {
        $request->validate([
            'food_name' => 'required|string|max:255',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'calories'  => 'nullable|integer',
            'protein'   => 'nullable|numeric',
            'carbs'     => 'nullable|numeric',
            'fats'      => 'nullable|numeric',
            'date'      => 'required|date',
        ]);

        $food = Food::create([
            'user_id'   => $request->user()->id,
            'food_name' => $request->food_name,
            'meal_type' => $request->meal_type,
            'calories'  => $request->calories,
            'protein'   => $request->protein,
            'carbs'     => $request->carbs,
            'fats'      => $request->fats,
            'notes'     => $request->notes,
            'date'      => $request->date,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Food log created!',
            'food'    => $food,
        ], 201);
    }

    // ── Update food ──
    public function update(Request $request, $id)
    {
        $food = Food::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->first();

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food log not found!',
            ], 404);
        }

        $food->update($request->only([
            'food_name', 'meal_type', 'calories',
            'protein', 'carbs', 'fats', 'notes', 'date'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Food log updated!',
            'food'    => $food,
        ]);
    }

    // ── Delete food ──
    public function destroy(Request $request, $id)
    {
        $food = Food::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->first();

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food log not found!',
            ], 404);
        }

        $food->delete();

        return response()->json([
            'success' => true,
            'message' => 'Food log deleted!',
        ]);
    }
}