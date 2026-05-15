import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Food() {
    const [foods,     setFoods]     = useState([]);
    const [loading,   setLoading]   = useState(true);
    const [error,     setError]     = useState('');
    const [showForm,  setShowForm]  = useState(false);
    const [editFood,  setEditFood]  = useState(null);
    const [form, setForm] = useState({
        food_name: '',
        meal_type: 'breakfast',
        calories:  '',
        protein:   '',
        carbs:     '',
        fats:      '',
        notes:     '',
        date:      new Date().toISOString().split('T')[0],
    });

    // ── Fetch Foods ──
    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            setLoading(true);
            const response = await api.get('/foods');
            setFoods(response.data.foods);
        } catch (err) {
            setError('Failed to load food logs!');
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
        setEditFood(null);
        setForm({
            food_name: '',
            meal_type: 'breakfast',
            calories:  '',
            protein:   '',
            carbs:     '',
            fats:      '',
            notes:     '',
            date:      new Date().toISOString().split('T')[0],
        });
        setShowForm(true);
    };

    // ── Open Form for Edit ──
    const handleEdit = (food) => {
        setEditFood(food);
        setForm({
            food_name: food.food_name,
            meal_type: food.meal_type,
            calories:  food.calories  ?? '',
            protein:   food.protein   ?? '',
            carbs:     food.carbs     ?? '',
            fats:      food.fats      ?? '',
            notes:     food.notes     ?? '',
            date:      food.date?.slice(0, 10),
        });
        setShowForm(true);
    };

    // ── Submit Form ──
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editFood) {
                await api.put(`/foods/${editFood.id}`, form);
            } else {
                await api.post('/foods', form);
            }
            setShowForm(false);
            fetchFoods();
        } catch (err) {
            setError('Failed to save food log!');
        }
    };

    // ── Delete Food ──
    const handleDelete = async (id) => {
        if (!confirm('Delete this food log?')) return;
        try {
            await api.delete(`/foods/${id}`);
            fetchFoods();
        } catch (err) {
            setError('Failed to delete food log!');
        }
    };

    // ── Meal Type Badge ──
    const mealBadge = (meal_type) => {
        const styles = {
            breakfast: 'bg-yellow-100 text-yellow-700',
            lunch:     'bg-green-100 text-green-700',
            dinner:    'bg-blue-100 text-blue-700',
            snack:     'bg-pink-100 text-pink-700',
        };
        const icons = {
            breakfast: '🌅',
            lunch:     '☀️',
            dinner:    '🌙',
            snack:     '🍿',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[meal_type]}`}>
                {icons[meal_type]} {meal_type}
            </span>
        );
    };

    // ── Group foods by meal type ──
    const grouped = {
        breakfast: foods.filter(f => f.meal_type === 'breakfast'),
        lunch:     foods.filter(f => f.meal_type === 'lunch'),
        dinner:    foods.filter(f => f.meal_type === 'dinner'),
        snack:     foods.filter(f => f.meal_type === 'snack'),
    };

    // ── Total calories ──
    const totalCalories = foods.reduce((sum, f) => sum + (f.calories || 0), 0);
    const totalProtein  = foods.reduce((sum, f) => sum + (parseFloat(f.protein) || 0), 0);
    const totalCarbs    = foods.reduce((sum, f) => sum + (parseFloat(f.carbs) || 0), 0);
    const totalFats     = foods.reduce((sum, f) => sum + (parseFloat(f.fats) || 0), 0);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🍎 Food</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track your daily meals and nutrition</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Meal
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Nutrition Summary */}
            {foods.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Calories',  value: `${totalCalories} kcal`, color: 'bg-red-50 text-red-600',    icon: '🔥' },
                        { label: 'Protein',   value: `${totalProtein.toFixed(1)}g`,  color: 'bg-blue-50 text-blue-600',  icon: '💪' },
                        { label: 'Carbs',     value: `${totalCarbs.toFixed(1)}g`,    color: 'bg-yellow-50 text-yellow-600', icon: '🌾' },
                        { label: 'Fats',      value: `${totalFats.toFixed(1)}g`,     color: 'bg-green-50 text-green-600', icon: '🥑' },
                    ].map((macro) => (
                        <div key={macro.label} className={`${macro.color} rounded-2xl p-4 text-center`}>
                            <p className="text-2xl">{macro.icon}</p>
                            <p className="text-xl font-bold mt-1">{macro.value}</p>
                            <p className="text-sm opacity-70">{macro.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        {editFood ? '✏️ Edit Meal' : '➕ Log a Meal'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Food Name
                                </label>
                                <input
                                    type="text"
                                    name="food_name"
                                    value={form.food_name}
                                    onChange={handleChange}
                                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. Chicken Rice"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Meal Type
                                </label>
                                <select
                                    name="meal_type"
                                    value={form.meal_type}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="breakfast">🌅 Breakfast</option>
                                    <option value="lunch">☀️ Lunch</option>
                                    <option value="dinner">🌙 Dinner</option>
                                    <option value="snack">🍿 Snack</option>
                                </select>
                            </div>
                        </div>

                        {/* Macros */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    🔥 Calories
                                </label>
                                <input
                                    type="number"
                                    name="calories"
                                    value={form.calories}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="kcal"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    💪 Protein (g)
                                </label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={form.protein}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="grams"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    🌾 Carbs (g)
                                </label>
                                <input
                                    type="number"
                                    name="carbs"
                                    value={form.carbs}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="grams"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    🥑 Fats (g)
                                </label>
                                <input
                                    type="number"
                                    name="fats"
                                    value={form.fats}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="grams"
                                    min="0"
                                    step="0.1"
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
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                {editFood ? 'Update Meal' : 'Log Meal'}
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

            {/* Food List */}
            {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                    Loading food logs...
                </div>
            ) : foods.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">🍽️</p>
                    <p className="text-gray-500 dark:text-gray-400">No meals logged yet! Add your first meal.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(grouped).map(([mealType, items]) =>
                        items.length > 0 && (
                            <div key={mealType}>

                                {/* Meal Type Header */}
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                    {mealType === 'breakfast' && '🌅 Breakfast'}
                                    {mealType === 'lunch'     && '☀️ Lunch'}
                                    {mealType === 'dinner'    && '🌙 Dinner'}
                                    {mealType === 'snack'     && '🍿 Snacks'}
                                </h3>

                                <div className="space-y-3">
                                    {items.map((food) => (
                                        <div key={food.id}
                                            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 flex items-start justify-between gap-4">

                                            {/* Left */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                                        {food.food_name}
                                                    </h3>
                                                    {mealBadge(food.meal_type)}
                                                </div>

                                                {/* Macros Row */}
                                                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2 flex-wrap">
                                                    {food.calories && (
                                                        <span>🔥 {food.calories} kcal</span>
                                                    )}
                                                    {food.protein && (
                                                        <span>💪 {food.protein}g protein</span>
                                                    )}
                                                    {food.carbs && (
                                                        <span>🌾 {food.carbs}g carbs</span>
                                                    )}
                                                    {food.fats && (
                                                        <span>🥑 {food.fats}g fats</span>
                                                    )}
                                                </div>

                                                {food.notes && (
                                                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                                        📝 {food.notes}
                                                    </p>
                                                )}

                                                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                                    📅 {food.date?.slice(0, 10)}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={() => handleEdit(food)}
                                                    className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food.id)}
                                                    className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition"
                                                >
                                                    🗑️
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        )
                    )}
                </div>
            )}

        </div>
    );
}