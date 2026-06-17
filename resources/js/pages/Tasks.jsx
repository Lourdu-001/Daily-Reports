import { useState, useEffect } from 'react';
import api from '../services/api';

// ── Modal Component ──
function TaskModal({ show, onClose, onSubmit, form, onChange, editTask }) {
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
                <div className="bg-white dark:bg-gray-80 rounded-2xl shadow-xl w-full max-w-lg">

                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            {editTask ? '✏️ Edit Task' : '➕ New Task'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 text-2xl leading-none"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={onSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={onChange}
                                className="w-full border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                onChange={onChange}
                                className="w-full border border-gray-300 dark:bg-gray-600 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    onChange={onChange}
                                    className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🔴 High</option>
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
                                    onChange={onChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:text-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                {editTask ? 'Update Task' : 'Add Task'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
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

export default function Tasks() {
    const [tasks, setTasks]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask]   = useState(null);
    const [search, setSearch]       = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [form, setForm] = useState({
        title:       '',
        description: '',
        priority:    'medium',
        date:        new Date().toISOString().split('T')[0],
    });

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        setEditTask(null);
        setForm({
            title:       '',
            description: '',
            priority:    'medium',
            date:        new Date().toISOString().split('T')[0],
        });
        setShowModal(true);
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setForm({
            title:       task.title,
            description: task.description ?? '',
            priority:    task.priority,
            date:        task.date?.slice(0, 10),
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditTask(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTask) {
                await api.put(`/tasks/${editTask.id}`, form);
            } else {
                await api.post('/tasks', form);
            }
            setShowModal(false);
            fetchTasks();
        } catch (err) {
            setError('Failed to save task!');
        }
    };

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

    const handleDelete = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task!');
        }
    };

    // ── Filter + Search Logic ──
    const filteredTasks = tasks.filter(task => {

        // Search filter
        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        // Date filter
        const matchesDate = filterDate
            ? task.date?.slice(0, 10) === filterDate
            : true;

        // Status filter
        const matchesStatus = filterStatus === 'all'
            ? true
            : task.status === filterStatus;

        return matchesSearch && matchesDate && matchesStatus;
    });

    // ── Progress Bar ──
    const today           = new Date().toISOString().split('T')[0];
    const todayTasks      = tasks.filter(t => t.date?.slice(0, 10) === today);
    const completedToday  = todayTasks.filter(t => t.status === 'completed');
    const progressPercent = todayTasks.length > 0
        ? Math.round((completedToday.length / todayTasks.length) * 100)
        : 0;

    // ── Priority Badge ──
    const priorityBadge = (priority) => {
        const styles = {
            low:    'bg-gray-100 dark:bg-gray-950 text-gray-600 dark:text-gray-300',
            medium: 'bg-yellow-100 text-yellow-700',
            high:   'bg-red-100 text-red-600',
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[priority]}`}>
                {priority}
            </span>
        );
    };

    // ── Quick Date Filters ──
    const setQuickDate = (type) => {
        const today = new Date();
        if (type === 'today') {
            setFilterDate(today.toISOString().split('T')[0]);
        } else if (type === 'yesterday') {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            setFilterDate(yesterday.toISOString().split('T')[0]);
        } else if (type === 'tomorrow') {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            setFilterDate(tomorrow.toISOString().split('T')[0]);
        } else {
            setFilterDate('');
        }
    };

    return (
        <div>
            {/* ── Modal ── */}
            <TaskModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                form={form}
                onChange={handleChange}
                editTask={editTask}
            />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">✅ Tasks</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your daily tasks</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                    + Add Task
                </button>
            </div>

            {/* ── Progress Bar ── */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-gray-700">
                        Today's Progress
                    </h2>
                    <span className="text-sm font-bold text-green-700">
                        {completedToday.length}/{todayTasks.length} tasks
                    </span>
                </div>

                {/* Progress Track */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="h-4 rounded-full transition-all duration-500"
                        style={{
                            width: `${progressPercent}%`,
                            backgroundColor: progressPercent === 100
                                ? '#16a34a'
                                : progressPercent >= 50
                                ? '#f59e0b'
                                : '#3b82f6'
                        }}
                    />
                </div>

                {/* Percentage + Message */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">
                        {progressPercent === 0   && 'Start completing tasks! 💪'}
                        {progressPercent > 0 && progressPercent < 50  && 'Keep going! 🔥'}
                        {progressPercent >= 50 && progressPercent < 100 && 'Almost there! ⚡'}
                        {progressPercent === 100 && 'All done! Amazing! 🎉'}
                    </span>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                        {progressPercent}%
                    </span>
                </div>
            </div>

            {/* ── Search + Filter Bar ── */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Search */}
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Date Filter */}
                    <div>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        >
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending Only</option>
                            <option value="completed">Completed Only</option>
                        </select>
                    </div>

                </div>

                {/* Quick Date Buttons */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                        onClick={() => setQuickDate('all')}
                        className={`text-xs px-3 py-1 rounded-full border transition ${
                            filterDate === ''
                                ? 'bg-green-700 text-white border-green-700'
                                : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                    >
                        All Dates
                    </button>
                    <button
                        onClick={() => setQuickDate('yesterday')}
                        className={`text-xs px-3 py-1 rounded-full border transition ${
                            filterDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]
                                ? 'bg-green-700 text-white border-green-700'
                                : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                    >
                        Yesterday
                    </button>
                    <button
                        onClick={() => setQuickDate('today')}
                        className={`text-xs px-3 py-1 rounded-full border transition ${
                            filterDate === new Date().toISOString().split('T')[0]
                                ? 'bg-green-700 text-white border-green-700'
                                : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setQuickDate('tomorrow')}
                        className={`text-xs px-3 py-1 rounded-full border transition ${
                            filterDate === new Date(Date.now() + 86400000).toISOString().split('T')[0]
                                ? 'bg-green-700 text-white border-green-700'
                                : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                    >
                        Tomorrow
                    </button>

                    {/* Clear filters */}
                    {(search || filterDate || filterStatus !== 'all') && (
                        <button
                            onClick={() => {
                                setSearch('');
                                setFilterDate('');
                                setFilterStatus('all');
                            }}
                            className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-500 hover:bg-red-50 transition"
                        >
                            ✕ Clear Filters
                        </button>
                    )}
                </div>

                {/* Results count */}
                {(search || filterDate || filterStatus !== 'all') && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Showing {filteredTasks.length} of {tasks.length} tasks
                    </p>
                )}
            </div>

            {/* ── Error ── */}
            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* ── Tasks List ── */}
            {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-400 dark:text-gray-500 py-10">
                    Loading tasks...
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
                    <p className="text-4xl mb-3">📝</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {tasks.length === 0
                            ? 'No tasks yet! Add your first task.'
                            : 'No tasks match your search!'}
                    </p>
                    {(search || filterDate || filterStatus !== 'all') && (
                        <button
                            onClick={() => {
                                setSearch('');
                                setFilterDate('');
                                setFilterStatus('all');
                            }}
                            className="mt-3 text-green-700 font-semibold hover:underline text-sm"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`bg-white dark:bg-gray-800 rounded-2xl shadow p-5 flex md:flex-row flex-col items-start justify-between gap-4 ${
                                task.status === 'completed' ? 'opacity-60' : ''
                            }`}
                        >
                            {/* Left */}
                            <div className="flex items-start gap-4">
                                <button
                                    onClick={() => handleToggle(task)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition ${
                                        task.status === 'completed'
                                            ? 'bg-green-600 border-green-600 text-white'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                                    }`}
                                >
                                    {task.status === 'completed' && '✓'}
                                </button>
                                <div>
                                    <h3 className={`font-semibold text-gray-800 dark:text-white ${
                                        task.status === 'completed' ? 'line-through' : ''
                                    }`}>
                                        {task.title}
                                    </h3>
                                    {task.description && (
                                        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 text-sm mt-1">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        {priorityBadge(task.priority)}
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            📅 {task.date?.slice(0, 10)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right */}
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