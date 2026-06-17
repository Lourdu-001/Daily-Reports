import { useState, useEffect } from 'react';
import api from '../services/api';
import { getNutrition } from '../services/nutrition';

// resources/js/services/nutrition.js
import { indianFoodDatabase } from '../config/nutritionData';

// ── Food Modal Component ──
function FoodModal({ show, onClose, onSubmit, form, onChange, onAutoFill, searching, editFood, error }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Add this inside FoodModal — full Indian + common foods list
    const foodSuggestions = [
        // South Indian
        'Idly', 'Idli', 'Dosa', 'Masala Dosa', 'Rava Dosa',
        'Sambar', 'Vada', 'Medu Vada', 'Upma', 'Pongal',
        'Uttapam', 'Appam', 'Puttu', 'Pesarattu', 'Adai',
        'Curd Rice', 'Lemon Rice', 'Tamarind Rice', 'Coconut Rice',
        'Rasam', 'Aviyal', 'Kootu', 'Poriyal', 'Keerai',

        // Rice & Biryani
        'Rice', 'Biryani', 'Mutton Biryani', 'Chicken Biryani',
        'Veg Biryani', 'Egg Biryani', 'Prawn Biryani',
        'Fried Rice', 'Egg Fried Rice', 'Chicken Fried Rice',
        'Jeera Rice', 'Ghee Rice', 'Pulao',

        // Breads
        'Roti', 'Chapati', 'Paratha', 'Aloo Paratha',
        'Naan', 'Puri', 'Bhatura', 'Poori',

        // Curries & Dals
        'Dal', 'Dal Tadka', 'Dal Makhani', 'Rajma',
        'Chole', 'Paneer Butter Masala', 'Palak Paneer',
        'Butter Chicken', 'Chicken Curry', 'Chicken Gravy',
        'Mutton Curry', 'Mutton Gravy', 'Fish Curry',
        'Prawn Curry', 'Egg Curry', 'Mixed Veg Curry',
        'Korma', 'Vindaloo', 'Kadai Chicken',

        // Snacks
        'Samosa', 'Pakora', 'Bhaji', 'Vada Pav',
        'Pav Bhaji', 'Poha', 'Chaat', 'Bhel Puri',
        'Pani Puri', 'Sev Puri', 'Dhokla', 'Kachori',
        'Spring Roll', 'Manchurian', 'Gobi Manchurian',

        // Non Veg Snacks
        'Chicken 65', 'Chicken Tikka', 'Tandoori Chicken',
        'Fish Fry', 'Prawn Fry', 'Mutton Kebab',
        'Seekh Kebab', 'Shawarma', 'Chicken Roll',

        // Breakfast
        'Omelette', 'Boiled Egg', 'Scrambled Eggs',
        'Bread Toast', 'Sandwich', 'Poha', 'Upma',
        'Cornflakes', 'Oats', 'Muesli',

        // Drinks
        'Chai', 'Coffee', 'Milk', 'Lassi', 'Buttermilk',
        'Mango Lassi', 'Fruit Juice', 'Coconut Water',
        'Lemonade', 'Masala Chai', 'Green Tea',

        // Sweets & Desserts
        'Gulab Jamun', 'Rasgulla', 'Kheer', 'Halwa',
        'Ladoo', 'Barfi', 'Jalebi', 'Payasam',
        'Ice Cream', 'Kulfi',

        // Fruits
        'Apple', 'Banana', 'Mango', 'Orange', 'Grapes',
        'Watermelon', 'Papaya', 'Pomegranate', 'Guava',
        'Pineapple',

        // Common
        'Egg', 'Chicken', 'Mutton', 'Fish', 'Paneer',
        'Curd', 'Butter', 'Ghee', 'Cheese',
        'White Rice', 'Brown Rice',
    ];

    // Replace the food_name input onChange handler
    const handleFoodNameChange = (e) => {
        const value = e.target.value;
        onChange(e); // call original onChange

        let newArray = [];

        for(const[key, value] of Object.entries(indianFoodDatabase)) {
            newArray.push(key);
        }

        // Filter suggestions
        if (value.trim().length > 0) {
            const filtered = newArray.filter(food =>
                food.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 6)); // show max 6
            setShowDropdown(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        // Create a fake event to update form
        const fakeEvent = {
            target: {
                name: 'food_name',
                value: suggestion,
            }
        };
        onChange(fakeEvent);
        setSuggestions([]);
        setShowDropdown(false);
    };

    if (!show) return null;

    // useEffect(() => {
    //     console.log(indianFoodDatabase);
    //     for(const[key, value] of Object.entries(indianFoodDatabase)) {
    //         console.log(`${key}` +  " " + `${value}`);
    //     }
    // }, [])

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            {editFood ? '✏️ Edit Meal' : '➕ Log a Meal'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
                    </div>

                    {/* Body */}
                    <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">

                        {/* Error inside modal */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Food Name + Auto Fill */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Name</label>
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    name="food_name"
                                    value={form.food_name}
                                    onChange={handleFoodNameChange}
                                    autoComplete='off'
                                    onBlur={() => {
                                        // Small delay so click on suggestion registers
                                        setTimeout(() => setShowDropdown(false), 150);
                                    }}
                                    onFocus={() => {
                                        if (suggestions.length > 0) setShowDropdown(true);
                                    }}
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
                                {/* ── Dropdown ── */}
                                {showDropdown && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 mt-1 overflow-hidden">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onMouseDown={() => handleSuggestionClick(suggestion)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 transition flex items-center gap-2 border-b border-gray-100 dark:border-gray-600 last:border-0"
                                            >
                                                <span>🍽️</span>
                                                <span>{suggestion}</span>
                                            </button>
                                        ))}
                                        <div className="px-4 py-1.5 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800">
                                            💡 Add quantity after selecting e.g. "Idly 2"
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">💡 Type food + quantity then click Auto Fill!</p>
                        </div>

                        {/* Meal Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meal Type</label>
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
                                <span className="text-xs text-gray-400 ml-2">(auto-filled or enter manually)</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-red-600 dark:text-red-400 mb-1">🔥 Calories (kcal)</label>
                                    <input type="number" name="calories" value={form.calories} onChange={onChange}
                                        className="w-full bg-transparent border-b border-red-200 dark:border-red-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0" min="0" />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">💪 Protein (g)</label>
                                    <input type="number" name="protein" value={form.protein} onChange={onChange}
                                        className="w-full bg-transparent border-b border-blue-200 dark:border-blue-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0" min="0" step="0.1" />
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1">🌾 Carbs (g)</label>
                                    <input type="number" name="carbs" value={form.carbs} onChange={onChange}
                                        className="w-full bg-transparent border-b border-yellow-200 dark:border-yellow-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0" min="0" step="0.1" />
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                                    <label className="block text-xs font-medium text-green-600 dark:text-green-400 mb-1">🥑 Fats (g)</label>
                                    <input type="number" name="fats" value={form.fats} onChange={onChange}
                                        className="w-full bg-transparent border-b border-green-200 dark:border-green-700 px-1 py-1 focus:outline-none text-gray-800 dark:text-white font-semibold"
                                        placeholder="0" min="0" step="0.1" />
                                </div>
                            </div>
                        </div>

                        {/* Notes + Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                                <textarea name="notes" value={form.notes} onChange={onChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Any notes..." rows="2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                <input type="date" name="date" value={form.date} onChange={onChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button type="submit"
                                className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition">
                                {editFood ? 'Update Meal' : 'Log Meal'}
                            </button>
                            <button type="button" onClick={onClose}
                                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
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

    // ── Filter State ──
    const [searchQuery,       setSearchQuery]       = useState('');
    const [filterMealType,    setFilterMealType]    = useState('all');
    const [filterDate,        setFilterDate]        = useState('today');
    const [filterSpecificDate, setFilterSpecificDate] = useState('');

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

    useEffect(() => { fetchFoods(); }, []);

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
        setError('');
        setShowModal(true);
    };

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
        setError('');
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditFood(null);
        setError('');
    };

    const handleAutoFill = async () => {
        if (!form.food_name.trim()) {
            setError('Please enter a food name first!');
            return;
        }
        setSearching(true);
        setForm(prev => ({ ...prev, calories: '', protein: '', carbs: '', fats: '' }));
        setError('');

        try {
            const nutrition = await getNutrition(form.food_name);
            if (nutrition.found) {
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
            setError('');
            fetchFoods();
        } catch (err) {
            setError('Failed to save food log!');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this food log?')) return;
        try {
            await api.delete(`/foods/${id}`);
            fetchFoods();
        } catch (err) {
            setError('Failed to delete food log!');
        }
    };

    // ── Filter Logic ──
    const getFilteredFoods = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        return foods.filter(food => {

            // Search filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                if (!food.food_name.toLowerCase().includes(q)) return false;
            }

            // Meal type filter
            if (filterMealType !== 'all' && food.meal_type !== filterMealType) return false;

            // Specific date picker takes priority over pills
            if (filterSpecificDate) {
                if (food.date?.slice(0, 10) !== filterSpecificDate) return false;
            } else if (filterDate !== 'all') {
                const foodDate = new Date(food.date);
                foodDate.setHours(0, 0, 0, 0);

                if (filterDate === 'today'      && foodDate.getTime() !== today.getTime()) return false;
                if (filterDate === 'this_week'  && foodDate < startOfWeek)                 return false;
                if (filterDate === 'this_month' && foodDate < startOfMonth)                return false;
            }

            return true;
        });
    };

    const filteredFoods = getFilteredFoods();

    // ── Totals (based on filtered) ──
    const totalCalories = filteredFoods.reduce((sum, f) => sum + (parseFloat(f.calories) || 0), 0);
    const totalProtein  = filteredFoods.reduce((sum, f) => sum + (parseFloat(f.protein)  || 0), 0);
    const totalCarbs    = filteredFoods.reduce((sum, f) => sum + (parseFloat(f.carbs)    || 0), 0);
    const totalFats     = filteredFoods.reduce((sum, f) => sum + (parseFloat(f.fats)     || 0), 0);

    // ── Group filtered foods by meal type ──
    const grouped = {
        breakfast: filteredFoods.filter(f => f.meal_type === 'breakfast'),
        lunch:     filteredFoods.filter(f => f.meal_type === 'lunch'),
        dinner:    filteredFoods.filter(f => f.meal_type === 'dinner'),
        snack:     filteredFoods.filter(f => f.meal_type === 'snack'),
    };

    const mealBadge = (meal_type) => {
        const styles = {
            breakfast: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            lunch:     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            dinner:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            snack:     'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
        };
        const icons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍿' };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[meal_type]}`}>
                {icons[meal_type]} {meal_type}
            </span>
        );
    };

    const activeFiltersCount = [
        searchQuery.trim() !== '',
        filterMealType !== 'all',
        filterDate !== 'today',
        filterSpecificDate !== '',
    ].filter(Boolean).length;

    const clearFilters = () => {
        setSearchQuery('');
        setFilterMealType('all');
        setFilterDate('today');
        setFilterSpecificDate('');
    };

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
                error={error}
            />

            {/* ── Header ── */}
            <div className="flex md:flex-row flex-col md:items-center items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🍎 Food</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track your daily meals and nutrition</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 md:mt-0 mt-3.5 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Meal
                </button>
            </div>

            {/* ── Filters ── */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 space-y-3">

                {/* Search */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search food name..."
                        className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                        >×</button>
                    )}
                </div>

                {/* Meal Type + Date filters */}
                <div className="flex flex-wrap gap-3">

                    {/* Meal Type Pills */}
                    <div className="flex gap-1 flex-wrap">
                        {[
                            { value: 'all',       label: 'All Meals' },
                            { value: 'breakfast', label: '🌅 Breakfast' },
                            { value: 'lunch',     label: '☀️ Lunch' },
                            { value: 'dinner',    label: '🌙 Dinner' },
                            { value: 'snack',     label: '🍿 Snack' },
                        ].map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setFilterMealType(opt.value)}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                                    filterMealType === opt.value
                                        ? 'bg-green-700 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-600" />

                    {/* Date Pills */}
                    <div className="flex gap-1 flex-wrap">
                        {[
                            { value: 'today',      label: 'Today' },
                            { value: 'this_week',  label: 'This Week' },
                            { value: 'this_month', label: 'This Month' },
                            { value: 'all',        label: 'All Time' },
                        ].map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => { setFilterDate(opt.value); setFilterSpecificDate(''); }}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                                    filterDate === opt.value && !filterSpecificDate
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Specific Date Picker */}
                    <div className="flex items-center gap-2 ml-auto">
                        <label className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">📅 Pick date:</label>
                        <input
                            type="date"
                            value={filterSpecificDate}
                            onChange={e => { setFilterSpecificDate(e.target.value); setFilterDate(''); }}
                            className={`text-xs border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition ${
                                filterSpecificDate
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-600'
                            }`}
                        />
                        {filterSpecificDate && (
                            <button
                                onClick={() => { setFilterSpecificDate(''); setFilterDate('today'); }}
                                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                            >×</button>
                        )}
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-xs px-3 py-1.5 rounded-full font-medium text-red-500 border border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition ml-auto"
                        >
                            ✕ Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* ── Nutrition Summary (filtered) ── */}
            {filteredFoods.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Calories', value: `${Math.round(totalCalories)} kcal`, color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',         icon: '🔥' },
                        { label: 'Protein',  value: `${totalProtein.toFixed(1)}g`,        color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',     icon: '💪' },
                        { label: 'Carbs',    value: `${totalCarbs.toFixed(1)}g`,           color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400', icon: '🌾' },
                        { label: 'Fats',     value: `${totalFats.toFixed(1)}g`,            color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', icon: '🥑' },
                    ].map(macro => (
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
                <div className="text-center text-gray-500 py-10">Loading food logs...</div>
            ) : filteredFoods.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">{foods.length === 0 ? '🍽️' : '🔍'}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {foods.length === 0
                            ? 'No meals logged yet! Click + Add Meal to get started.'
                            : 'No meals match your filters.'}
                    </p>
                    {foods.length > 0 && activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="mt-3 text-sm text-green-600 hover:underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(grouped).map(([mealType, items]) =>
                        items.length > 0 && (
                            <div key={mealType}>
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                    {mealType === 'breakfast' && '🌅 Breakfast'}
                                    {mealType === 'lunch'     && '☀️ Lunch'}
                                    {mealType === 'dinner'    && '🌙 Dinner'}
                                    {mealType === 'snack'     && '🍿 Snacks'}
                                </h3>
                                <div className="space-y-3">
                                    {items.map(food => (
                                        <div key={food.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="font-semibold text-gray-800 dark:text-white">{food.food_name}</h3>
                                                    {mealBadge(food.meal_type)}
                                                </div>
                                                <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2 flex-wrap">
                                                    {food.calories && <span className="flex items-center gap-1">🔥 <strong>{food.calories}</strong> kcal</span>}
                                                    {food.protein  && <span className="flex items-center gap-1">💪 <strong>{food.protein}</strong>g</span>}
                                                    {food.carbs    && <span className="flex items-center gap-1">🌾 <strong>{food.carbs}</strong>g</span>}
                                                    {food.fats     && <span className="flex items-center gap-1">🥑 <strong>{food.fats}</strong>g</span>}
                                                </div>
                                                {food.notes && <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">📝 {food.notes}</p>}
                                                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">📅 {food.date?.slice(0, 10)}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => handleEdit(food)}
                                                    className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm font-medium transition">✏️</button>
                                                <button onClick={() => handleDelete(food.id)}
                                                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-lg text-sm font-medium transition">🗑️</button>
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