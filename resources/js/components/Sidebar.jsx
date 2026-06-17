import { useState } from 'react';  // 👈 add useState
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate         = useNavigate();
    const [isOpen, setIsOpen] = useState(false); 

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/tasks',     label: 'Tasks',     icon: '✅' },
        { path: '/workout',   label: 'Workout',   icon: '💪' },
        { path: '/food',      label: 'Food',      icon: '🍎' },
        { path: '/profile',   label: 'Profile',   icon: '👤' },
        // { path: '/notes',   label: 'Notes',   icon: '�' },
    ];

    return (
        <>
            {/* ── Mobile Top Bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold text-green-400">📋 Daily Reports</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ── Mobile Overlay ── */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside className={`
                fixed md:static top-0 left-0 h-full z-50
                w-64 min-h-screen bg-gray-900 text-white flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>

                {/* Logo - desktop */}
                <div className="p-6 border-b border-gray-700 hidden md:block">
                    <h1 className="text-xl font-bold text-green-400">
                        📋 Daily Reports
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Hey, {user?.name}! 👋
                    </p>
                </div>

                {/* Mobile spacing + greeting */}
                <div className="md:hidden pt-16 px-6 py-3 border-b border-gray-700">
                    <p className="text-gray-400 text-sm">Hey, {user?.name}! 👋</p>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                                    isActive
                                        ? 'bg-green-700 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* ── Dark Mode Toggle ── */}
                <div className="px-4 py-3 border-t border-gray-700">
                    <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
                    >
                        <div className="flex items-center gap-3">
                            <span>{darkMode ? '☀️' : '🌙'}</span>
                            <span className="font-medium">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        </div>
                        {/* Toggle Switch */}
                        <div className={`w-10 h-5 rounded-full transition-colors duration-300 ${
                            darkMode ? 'bg-green-500' : 'bg-gray-600'
                        }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                                darkMode ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                        </div>
                    </button>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-700 hover:text-white transition font-medium"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>

            </aside>
        </>
    );
}