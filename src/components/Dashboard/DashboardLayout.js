'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar.js';
import Header from './Header.js';
import DashboardOverview from './DashboardOverview.js';
import StudentsList from '../Students/StudentsList.js';
import HobbiesList from '../Hobbies/HobbiesList.js';
import UsersList from '../Users/UsersList.js';
import ProfileSettings from '../Profile/ProfileSettings.js';
import apiService from '../../services/apiService.js';

export default function DashboardLayout({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      // Redirect to login or handle authentication
      console.log('User not authenticated');
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.auth.logout(apiService.getToken());
      apiService.removeToken();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token and logout even if API call fails
      apiService.removeToken();
      onLogout();
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'students':
        return <StudentsList />;
      case 'hobbies':
        return <HobbiesList />;
      case 'users':
        return <UsersList />;
      case 'profile':
        return <ProfileSettings user={user} />;
      default:
        return <DashboardOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header user={user} onLogout={handleLogout} />

          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 