import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks     from './pages/Tasks';
import Workout   from './pages/Workout';
import Food      from './pages/Food';

import './bootstrap';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes with Layout */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Layout><Dashboard /></Layout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/tasks" element={
                        <ProtectedRoute>
                            <Layout><Tasks /></Layout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/workout" element={
                        <ProtectedRoute>
                            <Layout><Workout /></Layout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/food" element={
                        <ProtectedRoute>
                            <Layout><Food /></Layout>
                        </ProtectedRoute>
                    }/>

                    {/* Default */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);