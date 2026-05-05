import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Tasks() {
    const [tasks, setTasks]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [form, setForm] = useState({
        title:       '',
        description: '',
        priority:    'medium',
        date:        new Date().toISOString().split('T')[0],
    });

    // ── Fetch Tasks ──
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks');
            setTasks(response.data.tasks);
        } catch (err) {
            setError('Failed to load tasks!');
        } finally {
            setLoading(false);
        }
    };

    // ── Handle Form Change ──
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ── Open Form for Add ──
    const handleAdd = () => {
        setEditTask(null);
        setForm({
            title:       '',
            description: '',
            priority:    'medium',
            date:        new Date().toISOString().split('T')[0],
        });
        setShowForm(true);
    };

    // ── Open Form for Edit ──
    const handleEdit = (task) => {
        setEditTask(task);
        setForm({
            title:       task.title,
            description: task.description ?? '',
            priority:    task.priority,
            date:        task.date,
        });
        setShowForm(true);
    };

    // ── Submit Form (Add or Edit) ──
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTask) {
                await api.put(`/tasks/${editTask.id}`, form);
            } else {
                await api.post('/tasks', form);
            }
            setShowForm(false);
            fetchTasks();
        } catch (err) {
            setError('Failed to save task!');
        }
    };

    // ── Toggle Complete ──
    const handleToggle = async (task) => {
        try {
            await api.put(`/tasks/${task.id}`, {
                ...task,
                status: task.status === 'completed' ? 'pending' : 'completed',
            });
            fetchTasks();
        } catch (err) {
            setError('Failed to update task!');
        }
    };

    // ── Delete Task ──
    const handleDelete = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task!');
        }
    };

    // ── Priority Badge ──
    const priorityBadge = (priority) => {
        const styles = {
            low:    'bg-gray-100 text-gray-600',
            medium: 'bg-yellow-100 text-yellow-700',
            high:   'bg-red-100 text-red-600',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[priority]}`}>
                {priority}
            </span>
        );
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">✅ Tasks</h1>
                    <p className="text-gray-500 mt-1">Manage your daily tasks</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Task
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        {editTask ? '✏️ Edit Task' : '➕ New Task'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Task title..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Task description..."
                                rows="3"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                {editTask ? 'Update Task' : 'Add Task'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tasks List */}
            {loading ? (
                <div className="text-center text-gray-500 py-10">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">📝</p>
                    <p className="text-gray-500">No tasks yet! Add your first task.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`bg-white rounded-2xl shadow p-5 flex items-start justify-between gap-4 ${
                                task.status === 'completed' ? 'opacity-60' : ''
                            }`}
                        >
                            {/* Left Side */}
                            <div className="flex items-start gap-4">

                                {/* Checkbox */}
                                <button
                                    onClick={() => handleToggle(task)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition ${
                                        task.status === 'completed'
                                            ? 'bg-green-600 border-green-600 text-white'
                                            : 'border-gray-300 hover:border-green-500'
                                    }`}
                                >
                                    {task.status === 'completed' && '✓'}
                                </button>

                                {/* Task Info */}
                                <div>
                                    <h3 className={`font-semibold text-gray-800 ${
                                        task.status === 'completed' ? 'line-through' : ''
                                    }`}>
                                        {task.title}
                                    </h3>
                                    {task.description && (
                                        <p className="text-gray-500 text-sm mt-1">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        {priorityBadge(task.priority)}
                                        <span className="text-xs text-gray-400">
                                            📅 {task.date?.slice(0, 10)}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Right Side - Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                >
                                    🗑️ Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
