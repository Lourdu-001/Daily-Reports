import { useState, useEffect } from 'react';
import api from '../services/api';
import { getNutrition } from '../services/nutrition';

// ── Food Modal Component ──
function FoodModal({ show, onClose, onSubmit, form, onChange, onAutoFill, searching, editFood }) {
    if (!show) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            {editFood ? '✏️ Edit Meal' : '➕ Log a Meal'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={onSubmit} className="p-6 space-y-4">

                        {/* Food Name + Auto Fill */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Food Name
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="food_name"
                                    value={form.food_name}
                                    onChange={onChange}
                                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. idly 2, mutton biryani 300g"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={onAutoFill}
                                    disabled={searching || !form.food_name.trim()}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 whitespace-nowrap text-sm"
                                >
                                    {searching ? '⏳...' : '✨ Auto Fill'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                💡 Type food + quantity then click Auto Fill!
                            </p>
                        </div>

                        {/* Meal Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Meal Type
                            </label>
                            <select
                                name="meal_type"
                                value={form.meal_type}
                                onChange={onChange}
                                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="breakfast">🌅 Breakfast</option>
                                <option value="lunch">☀️ Lunch</option>
                                <option value="dinner">🌙 Dinner</option>
                                <option value="snack">🍿 Snack</option>
                            </select>
                        </div>

                        {/* Nutrition Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nutrition Info
                                <span className="text-xs text-gray-400 ml-2">
                                    (auto-filled or enter manually)
                                </span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-red-600 dark:text-red-400 mb-1">
                                        🔥 Calories (kcal)
                                    </label>
                                    <input
                                        type="number"
                                        name="calories"
                                        value={form.calories}
                                        onChange={onChange}
                                        className="w-full bg-transparent border-b border-red-200 dark:border-red-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                                        💪 Protein (g)
                                    </label>
                                    <input
                                        type="number"
                                        name="protein"
                                        value={form.protein}
                                        onChange={onChange}
                                        className="w-full bg-transparent border-b border-blue-200 dark:border-blue-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1">
                                        🌾 Carbs (g)
                                    </label>
                                    <input
                                        type="number"
                                        name="carbs"
                                        value={form.carbs}
                                        onChange={onChange}
                                        className="w-full bg-transparent border-b border-yellow-200 dark:border-yellow-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                                        🥑 Fats (g)
                                    </label>
                                    <input
                                        type="number"
                                        name="fats"
                                        value={form.fats}
                                        onChange={onChange}
                                        className="w-full bg-transparent border-b border-green-200 dark:border-green-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes + Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={onChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Any notes..."
                                    rows="2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={onChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                {editFood ? 'Update Meal' : 'Log Meal'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

// ── Main Food Page ──
export default function Food() {
    const [foods,     setFoods]     = useState([]);
    const [loading,   setLoading]   = useState(true);
    const [error,     setError]     = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editFood,  setEditFood]  = useState(null);
    const [searching, setSearching] = useState(false);
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ── Open Modal for Add ──
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
        setShowModal(true);
    };

    // ── Open Modal for Edit ──
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
        setShowModal(true);
    };

    // ── Close Modal ──
    const handleClose = () => {
        setShowModal(false);
        setEditFood(null);
        setError('');
    };

    // ── Auto Fill Nutrition ──
    const handleAutoFill = async () => {
        if (!form.food_name.trim()) {
            setError('Please enter a food name first!');
            return;
        }
        setSearching(true);

        setForm(prev => ({
            ...prev,
            calories: '',
            protein:  '',
            carbs:    '',
            fats:     '',
        }));
        
        setError('');
        try {
            const nutrition = await getNutrition(form.food_name);
            if (nutrition.found) {
                console.log(nutrition.found);
                setForm(prev => ({
                    ...prev,
                    calories: nutrition.calories  || '',
                    protein:  nutrition.protein_g || '',
                    carbs:    nutrition.carbs_g   || '',
                    fats:     nutrition.fats_g    || '',
                }));
            } else {
                setError('Food not recognized! Please fill nutrition manually.');
            }
        } catch (err) {
            setError('Failed to get nutrition data!');
        } finally {
            setSearching(false);
        }
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
            setShowModal(false);
            setEditFood(null);
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

    // ── Meal Badge ──
    const mealBadge = (meal_type) => {
        const styles = {
            breakfast: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            lunch:     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            dinner:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            snack:     'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
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

    // ── Group by meal type ──
    const grouped = {
        breakfast: foods.filter(f => f.meal_type === 'breakfast'),
        lunch:     foods.filter(f => f.meal_type === 'lunch'),
        dinner:    foods.filter(f => f.meal_type === 'dinner'),
        snack:     foods.filter(f => f.meal_type === 'snack'),
    };

    // ── Totals ──
    const totalCalories = foods.reduce((sum, f) => sum + (f.calories || 0), 0);
    const totalProtein  = foods.reduce((sum, f) => sum + (parseFloat(f.protein) || 0), 0);
    const totalCarbs    = foods.reduce((sum, f) => sum + (parseFloat(f.carbs)   || 0), 0);
    const totalFats     = foods.reduce((sum, f) => sum + (parseFloat(f.fats)    || 0), 0);

    return (
        <div>

            {/* ── Modal ── */}
            <FoodModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                form={form}
                onChange={handleChange}
                onAutoFill={handleAutoFill}
                searching={searching}
                editFood={editFood}
            />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        🍎 Food
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track your daily meals and nutrition
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Meal
                </button>
            </div>

            {/* ── Error ── */}
            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* ── Nutrition Summary ── */}
            {foods.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Calories', value: `${totalCalories} kcal`,       color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',       icon: '🔥' },
                        { label: 'Protein',  value: `${totalProtein.toFixed(1)}g`, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',   icon: '💪' },
                        { label: 'Carbs',    value: `${totalCarbs.toFixed(1)}g`,   color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400', icon: '🌾' },
                        { label: 'Fats',     value: `${totalFats.toFixed(1)}g`,    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', icon: '🥑' },
                    ].map((macro) => (
                        <div key={macro.label} className={`${macro.color} rounded-2xl p-4 text-center`}>
                            <p className="text-2xl">{macro.icon}</p>
                            <p className="text-xl font-bold mt-1">{macro.value}</p>
                            <p className="text-sm opacity-70">{macro.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Food List ── */}
            {loading ? (
                <div className="text-center text-gray-500 py-10">
                    Loading food logs...
                </div>
            ) : foods.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">🍽️</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        No meals logged yet! Click + Add Meal to get started.
                    </p>
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
                                        <div
                                            key={food.id}
                                            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 flex items-start justify-between gap-4"
                                        >
                                            {/* Left */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                                        {food.food_name}
                                                    </h3>
                                                    {mealBadge(food.meal_type)}
                                                </div>

                                                {/* Macros */}
                                                <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2 flex-wrap">
                                                    {food.calories && (
                                                        <span className="flex items-center gap-1">
                                                            🔥 <strong>{food.calories}</strong> kcal
                                                        </span>
                                                    )}
                                                    {food.protein && (
                                                        <span className="flex items-center gap-1">
                                                            💪 <strong>{food.protein}</strong>g
                                                        </span>
                                                    )}
                                                    {food.carbs && (
                                                        <span className="flex items-center gap-1">
                                                            🌾 <strong>{food.carbs}</strong>g
                                                        </span>
                                                    )}
                                                    {food.fats && (
                                                        <span className="flex items-center gap-1">
                                                            🥑 <strong>{food.fats}</strong>g
                                                        </span>
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
                                                    className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm font-medium transition"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food.id)}
                                                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-lg text-sm font-medium transition"
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