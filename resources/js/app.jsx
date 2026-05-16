import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks     from './pages/Tasks';
import Workout   from './pages/Workout';
import Food      from './pages/Food';
import Profile   from './pages/Profile';
import Notes     from './pages/Notes';

import './bootstrap';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider> 
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

                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Layout><Profile /></Layout>
                            </ProtectedRoute>
                        }/>

                        <Route path="/notes" element={
                            <ProtectedRoute>
                                <Layout><Notes /></Layout>
                            </ProtectedRoute>
                        }/>

                        {/* Default */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);