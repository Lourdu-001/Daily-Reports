import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Workout() {
    const [workouts, setWorkouts]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');
    const [showForm, setShowForm]   = useState(false);
    const [editWorkout, setEditWorkout] = useState(null);
    const [form, setForm] = useState({
        exercise_name: '',
        category:      'strength',
        sets:          '',
        reps:          '',
        duration:      '',
        notes:         '',
        date:          new Date().toISOString().split('T')[0],
    });

    // ── Fetch Workouts ──
    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/workouts');
            setWorkouts(response.data.workouts);
        } catch (err) {
            setError('Failed to load workouts!');
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
        setEditWorkout(null);
        setForm({
            exercise_name: '',
            category:      'strength',
            sets:          '',
            reps:          '',
            duration:      '',
            notes:         '',
            date:          new Date().toISOString().split('T')[0],
        });
        setShowForm(true);
    };

    // ── Open Form for Edit ──
    const handleEdit = (workout) => {
        setEditWorkout(workout);
        setForm({
            exercise_name: workout.exercise_name,
            category:      workout.category,
            sets:          workout.sets ?? '',
            reps:          workout.reps ?? '',
            duration:      workout.duration ?? '',
            notes:         workout.notes ?? '',
            date:          workout.date,
        });
        setShowForm(true);
    };

    // ── Submit Form ──
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editWorkout) {
                await api.put(`/workouts/${editWorkout.id}`, form);
            } else {
                await api.post('/workouts', form);
            }
            setShowForm(false);
            fetchWorkouts();
        } catch (err) {
            setError('Failed to save workout!');
        }
    };

    // ── Delete Workout ──
    const handleDelete = async (id) => {
        if (!confirm('Delete this workout?')) return;
        try {
            await api.delete(`/workouts/${id}`);
            fetchWorkouts();
        } catch (err) {
            setError('Failed to delete workout!');
        }
    };

    // ── Category Badge ──
    const categoryBadge = (category) => {
        const styles = {
            cardio:      'bg-blue-100 text-blue-700',
            strength:    'bg-purple-100 text-purple-700',
            flexibility: 'bg-yellow-100 text-yellow-700',
            other:       'bg-gray-100 dark:bg-gray-950 text-gray-600 dark:text-gray-300',
        };
        const icons = {
            cardio:      '🏃',
            strength:    '🏋️',
            flexibility: '🧘',
            other:       '⚡',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[category]}`}>
                {icons[category]} {category}
            </span>
        );
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">💪 Workout</h1>
                    <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-1">Track your daily workout plans</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Workout
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        {editWorkout ? '✏️ Edit Workout' : '➕ New Workout'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Exercise Name
                                </label>
                                <input
                                    type="text"
                                    name="exercise_name"
                                    value={form.exercise_name}
                                    onChange={handleChange}
                                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. Push ups"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="strength">🏋️ Strength</option>
                                    <option value="cardio">🏃 Cardio</option>
                                    <option value="flexibility">🧘 Flexibility</option>
                                    <option value="other">⚡ Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sets
                                </label>
                                <input
                                    type="number"
                                    name="sets"
                                    value={form.sets}
                                    onChange={handleChange}
                                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. 3"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reps
                                </label>
                                <input
                                    type="number"
                                    name="reps"
                                    value={form.reps}
                                    onChange={handleChange}
                                    className="w-full border dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. 12"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (mins)
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    className="w-full border dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. 30"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Any notes..."
                                    rows="2"
                                />
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
                                    className="w-full border dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                {editWorkout ? 'Update Workout' : 'Add Workout'}
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

            {/* Workouts List */}
            {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-400 dark:text-gray-500 py-10">
                    Loading workouts...
                </div>
            ) : workouts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">💪</p>
                    <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500">No workouts yet! Add your first workout.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">

                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                                        {workout.exercise_name}
                                    </h3>
                                    <div className="mt-1">
                                        {categoryBadge(workout.category)}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(workout)}
                                        className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(workout.id)}
                                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300 mt-3">
                                {workout.sets && (
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {workout.sets}
                                        </span> sets
                                    </div>
                                )}
                                {workout.reps && (
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {workout.reps}
                                        </span> reps
                                    </div>
                                )}
                                {workout.duration && (
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {workout.duration}
                                        </span> mins
                                    </div>
                                )}
                            </div>

                            {/* Notes */}
                            {workout.notes && (
                                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 text-sm mt-2 border-t pt-2">
                                    📝 {workout.notes}
                                </p>
                            )}

                            {/* Date */}
                            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                                📅 {workout.date}
                            </p>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}