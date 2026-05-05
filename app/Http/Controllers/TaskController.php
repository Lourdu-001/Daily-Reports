<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // ── Get all tasks ──
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)
                     ->orderBy('date', 'desc')
                     ->get();

        return response()->json([
            'success' => true,
            'tasks'   => $tasks,
        ]);
    }

    // ── Create task ──
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority'    => 'in:low,medium,high',
            'date'        => 'required|date',
        ]);

        $task = Task::create([
            'user_id'     => $request->user()->id,
            'title'       => $request->title,
            'description' => $request->description,
            'priority'    => $request->priority ?? 'medium',
            'status'      => 'pending',
            'date'        => $request->date,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created!',
            'task'    => $task,
        ], 201);
    }

    // ── Update task ──
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->first();

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found!',
            ], 404);
        }

        $task->update($request->only([
            'title', 'description', 'status', 'priority', 'date'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Task updated!',
            'task'    => $task,
        ]);
    }

    // ── Delete task ──
    public function destroy(Request $request, $id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->first();

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found!',
            ], 404);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted!',
        ]);
    }
}
?>