<?php
namespace App\Http\Controllers;

use App\Services\PaymentService;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;

class TaskController extends Controller
{
    protected $taskService;
    protected $paymentService;

    public function __construct(PaymentService $paymentService) {
        $this->paymentService = $paymentService;
    }

    public function testPayment() {
        return $this->paymentService->processPayment(500);
    }

    public function index(Request $request)
    {
        $query = Task::query();

        // Search by title
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by completed status
        if ($request->has('completed')) {
            $query->where('is_completed', $request->completed);
        }

        // Sorting
        if ($request->filled('sort')) {
            $sortField = ltrim($request->sort, '-');
            $sortDirection = str_starts_with($request->sort, '-') ? 'desc' : 'asc';

            // whitelist allowed columns (IMPORTANT for security)
            if (in_array($sortField, ['title', 'created_at', 'is_completed'])) {
                $query->orderBy($sortField, $sortDirection);
            }
        } else {
            $query->latest(); // default sorting
        }

        return TaskResource::collection(
            $query->paginate(5)
        );
    }

    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();

        $task = Task::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'data' => new TaskResource($task)
        ], 201);
    }

    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'boolean'
        ]);

        $task->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => new TaskResource($task)
        ]);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'status' => true,
            'message' => 'Task deleted successfully'
        ], 200);
    }

    public function restore($id) 
    {
        $task = Task::withTrashed()->findOrFail($id);
        $task->restore();

        return response()->json([
            'success' => true,
            'message' => 'Task restored successfully'
        ]);
    }

    public function forceDelete($id)
    {
        $task = Task::withTrashed()->findOrFail($id);
        $task->forceDelete();

        return response()->json([
            'message' => 'Task permanently deleted'
        ]);
    }

    public function trashed()
    {
        return Task::onlyTrashed()->latest()->paginate(5);
    }
}
