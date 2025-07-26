'use client';

import { useState, useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm.js';
import RegisterForm from '../components/Auth/RegisterForm.js';
import DashboardLayout from '../components/Dashboard/DashboardLayout.js';
import apiService from '../services/apiService.js';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = apiService.getToken();
      if (token && apiService.isAuthenticated()) {
        // Try to get current user
        const response = await apiService.auth.getCurrentUser(token);
        if (response.success) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          apiService.removeToken();
        }
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      apiService.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    apiService.removeToken();
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Siswa Manager...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <DashboardLayout user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white font-bold">SM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Siswa Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Student Management System
          </p>
        </div>

        {/* Auth Forms */}
        {authMode === 'login' ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={switchAuthMode}
          />
        ) : (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={switchAuthMode}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Siswa Manager. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
