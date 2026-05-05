import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate         = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/tasks',     label: 'Tasks',     icon: '✅' },
        { path: '/workout',   label: 'Workout',   icon: '💪' },
        { path: '/food',      label: 'Food',      icon: '🍎' },
    ];

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold text-green-400">
                    📋 Daily Reports
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Hey, {user?.name}! 👋
                </p>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
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
    );
}