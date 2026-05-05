import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
    const { user } = useAuth();

    const [tasks,    setTasks]    = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [foods,    setFoods]    = useState([]);

    // Today's date
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [taskRes, workoutRes, foodRes] = await Promise.all([
                api.get('/tasks'),
                api.get('/workouts'),
                api.get('/foods'),
            ]);

            setTasks(taskRes.data.tasks);
            setWorkouts(workoutRes.data.workouts);
            setFoods(foodRes.data.foods);
        } catch (err) {
            console.error('Failed to load dashboard data!', err);
        }
    };

    // ── Filter today's data ──
    const todayTasks    = tasks.filter(t => t.date?.slice(0, 10) === today);
    const todayWorkouts = workouts.filter(w => w.date?.slice(0, 10) === today);
    const todayFoods    = foods.filter(f => f.date?.slice(0, 10) === today);
    const completedTasks = todayTasks.filter(t => t.status === 'completed');

    // ── Stats ──
    const stats = [
        {
            label: 'Tasks Today',
            value: `${completedTasks.length}/${todayTasks.length}`,
            icon:  '✅',
            color: 'bg-blue-500'
        },
        {
            label: 'Workouts Today',
            value: todayWorkouts.length,
            icon:  '💪',
            color: 'bg-green-500'
        },
        {
            label: 'Meals Logged',
            value: todayFoods.length,
            icon:  '🍎',
            color: 'bg-orange-500'
        },
        {
            label: 'Total Calories',
            value: todayFoods.reduce((sum, f) => sum + (f.calories || 0), 0),
            icon:  '🔥',
            color: 'bg-red-500'
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Good day, {user?.name}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Here's your daily summary for {new Date().toDateString()}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label}
                        className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                        <div className={`${stat.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today's Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Tasks Summary */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">✅ Today's Tasks</h2>
                    {todayTasks.length === 0 ? (
                        <p className="text-gray-400 text-sm">No tasks for today.</p>
                    ) : (
                        <ul className="space-y-2">
                            {todayTasks.map(task => (
                                <li key={task.id}
                                    className="flex items-center gap-2 text-sm">
                                    <span>{task.status === 'completed' ? '✅' : '⬜'}</span>
                                    <span className={task.status === 'completed'
                                        ? 'line-through text-gray-400'
                                        : 'text-gray-700'
                                    }>
                                        {task.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Workout Summary */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">💪 Today's Workouts</h2>
                    {todayWorkouts.length === 0 ? (
                        <p className="text-gray-400 text-sm">No workouts logged today.</p>
                    ) : (
                        <ul className="space-y-2">
                            {todayWorkouts.map(workout => (
                                <li key={workout.id}
                                    className="flex items-center gap-2 text-sm">
                                    <span>🏋️</span>
                                    <span className="text-gray-700">
                                        {workout.exercise_name}
                                        {workout.sets && ` — ${workout.sets} sets`}
                                        {workout.reps && ` x ${workout.reps} reps`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Food Summary */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">🍎 Today's Meals</h2>
                    {todayFoods.length === 0 ? (
                        <p className="text-gray-400 text-sm">No meals logged today.</p>
                    ) : (
                        <ul className="space-y-2">
                            {todayFoods.map(food => (
                                <li key={food.id}
                                    className="flex items-center gap-2 text-sm">
                                    <span>🍽️</span>
                                    <span className="text-gray-700">
                                        {food.food_name}
                                        {food.calories && (
                                            <span className="text-gray-400">
                                                {' '}— {food.calories} kcal
                                            </span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}