import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Profile() {
    const { user, logout }   = useAuth();
    const navigate           = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [success, setSuccess]     = useState('');
    const [error, setError]         = useState('');
    const [loading, setLoading]     = useState(false);

    // ── Profile Form ──
    const [profileForm, setProfileForm] = useState({
        name:  '',
        email: '',
    });

    // ── Password Form ──
    const [passwordForm, setPasswordForm] = useState({
        current_password:          '',
        new_password:              '',
        new_password_confirmation: '',
    });

    // ── Delete Form ──
    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // ── Stats ──
    const [stats, setStats] = useState({
        total_tasks:    0,
        total_workouts: 0,
        total_foods:    0,
    });

    useEffect(() => {
        if (user) {
            setProfileForm({
                name:  user.name,
                email: user.email,
            });
        }
        fetchStats();
    }, [user]);

    const fetchStats = async () => {
        try {
            const [taskRes, workoutRes, foodRes] = await Promise.allSettled([
                api.get('/tasks'),
                api.get('/workouts'),
                api.get('/foods'),
            ]);
            setStats({
                total_tasks:    taskRes.status    === 'fulfilled' ? taskRes.value.data.tasks.length       : 0,
                total_workouts: workoutRes.status === 'fulfilled' ? workoutRes.value.data.workouts.length : 0,
                total_foods:    foodRes.status    === 'fulfilled' ? foodRes.value.data.foods.length       : 0,
            });
        } catch (err) {
            console.error('Failed to load stats', err);
        }
    };

    // ── Handle Profile Update ──
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await api.put('/profile', profileForm);

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSuccess('Profile updated successfully! ✅');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile!');
        } finally {
            setLoading(false);
        }
    };

    // ── Handle Password Change ──
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await api.put('/profile/password', passwordForm);
            setSuccess('Password changed successfully! ✅');
            setPasswordForm({
                current_password:          '',
                new_password:              '',
                new_password_confirmation: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password!');
        } finally {
            setLoading(false);
        }
    };

    // ── Handle Delete Account ──
    const handleDeleteAccount = async () => {
        setLoading(true);
        setError('');
        try {
            await api.delete('/profile', {
                data: { password: deletePassword }
            });
            await logout();
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete account!');
        } finally {
            setLoading(false);
        }
    };

    // ── Avatar Initial ──
    const avatarInitial = user?.name?.charAt(0).toUpperCase();

    const tabs = [
        { id: 'profile',  label: 'Edit Profile', icon: '👤' },
        { id: 'password', label: 'Password',      icon: '🔒' },
        { id: 'danger',   label: 'Danger Zone',   icon: '⚠️'  },
    ];

    return (
        <div className="max-w-2xl mx-auto">

            {/* ── Header ── */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">👤 Profile</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings</p>
            </div>

            {/* ── Profile Card ── */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
                <div className="flex items-center gap-5">

                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-green-700 text-white text-3xl font-bold flex items-center justify-center shrink-0">
                        {avatarInitial}
                    </div>

                    {/* Info */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {user?.name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                            Member since {new Date(user?.created_at).toDateString()}
                        </p>
                    </div>

                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                    {[
                        { label: 'Total Tasks',    value: stats.total_tasks,    icon: '✅' },
                        { label: 'Total Workouts', value: stats.total_workouts, icon: '💪' },
                        { label: 'Total Meals',    value: stats.total_foods,    icon: '🍎' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-2xl">{stat.icon}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setError('');
                            setSuccess('');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                            activeTab === tab.id
                                ? 'bg-green-700 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow hover:bg-gray-50 dark-hover:text-black'
                        }`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ── Alerts ── */}
            {success && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 border border-green-200">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 border border-red-200">
                    {error}
                </div>
            )}

            {/* ── Tab: Edit Profile ── */}
            {activeTab === 'profile' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Edit Profile</h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({
                                    ...profileForm, name: e.target.value
                                })}
                                className="w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({
                                    ...profileForm, email: e.target.value
                                })}
                                className="w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            )}

            {/* ── Tab: Password ── */}
            {activeTab === 'password' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.current_password}
                                onChange={(e) => setPasswordForm({
                                    ...passwordForm,
                                    current_password: e.target.value
                                })}
                                className="w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.new_password}
                                onChange={(e) => setPasswordForm({
                                    ...passwordForm,
                                    new_password: e.target.value
                                })}
                                className="w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.new_password_confirmation}
                                onChange={(e) => setPasswordForm({
                                    ...passwordForm,
                                    new_password_confirmation: e.target.value
                                })}
                                className="w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            )}

            {/* ── Tab: Danger Zone ── */}
            {activeTab === 'danger' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-red-200">
                    <h3 className="font-bold text-red-600 mb-2">⚠️ Danger Zone</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        Once you delete your account, all your tasks, workouts,
                        and food logs will be permanently deleted. This cannot be undone!
                    </p>

                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            🗑️ Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm font-medium mb-3">
                                    Type your password to confirm deletion:
                                </p>
                                <input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-red-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={!deletePassword || loading}
                                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
                                >
                                    {loading ? 'Deleting...' : 'Yes, Delete Account'}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setDeletePassword('');
                                    }}
                                    className="flex-1 bg-gray-100 dark:bg-gray-950 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}