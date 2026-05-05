<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    // ── Get all workouts ──
    public function index(Request $request)
    {
        $workouts = Workout::where('user_id', $request->user()->id)
                           ->orderBy('date', 'desc')
                           ->get();

        return response()->json([
            'success'  => true,
            'workouts' => $workouts,
        ]);
    }

    // ── Create workout ──
    public function store(Request $request)
    {
        $request->validate([
            'exercise_name' => 'required|string|max:255',
            'category'      => 'in:cardio,strength,flexibility,other',
            'sets'          => 'nullable|integer',
            'reps'          => 'nullable|integer',
            'duration'      => 'nullable|integer',
            'date'          => 'required|date',
        ]);

        $workout = Workout::create([
            'user_id'       => $request->user()->id,
            'exercise_name' => $request->exercise_name,
            'category'      => $request->category ?? 'other',
            'sets'          => $request->sets,
            'reps'          => $request->reps,
            'duration'      => $request->duration,
            'notes'         => $request->notes,
            'date'          => $request->date,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Workout created!',
            'workout' => $workout,
        ], 201);
    }

    // ── Update workout ──
    public function update(Request $request, $id)
    {
        $workout = Workout::where('id', $id)
                          ->where('user_id', $request->user()->id)
                          ->first();

        if (!$workout) {
            return response()->json([
                'success' => false,
                'message' => 'Workout not found!',
            ], 404);
        }

        $workout->update($request->only([
            'exercise_name', 'category', 'sets',
            'reps', 'duration', 'notes', 'date'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Workout updated!',
            'workout' => $workout,
        ]);
    }

    // ── Delete workout ──
    public function destroy(Request $request, $id)
    {
        $workout = Workout::where('id', $id)
                          ->where('user_id', $request->user()->id)
                          ->first();

        if (!$workout) {
            return response()->json([
                'success' => false,
                'message' => 'Workout not found!',
            ], 404);
        }

        $workout->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workout deleted!',
        ]);
    }
}
?>