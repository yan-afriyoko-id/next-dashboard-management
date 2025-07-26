'use client';

import { useState, useEffect } from 'react';
import apiService from '../../services/apiService.js';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHobbies: 0,
    totalUsers: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load statistics
      const [studentsResponse, hobbiesResponse, usersResponse, profileResponse] = await Promise.all([
        apiService.siswa.getAllStudents(apiService.getToken()),
        apiService.hobby.getAllHobbies(apiService.getToken()),
        apiService.user.getAllUsers(apiService.getToken()),
        apiService.profile.getCurrentProfile(apiService.getToken())
      ]);

      setStats({
        totalStudents: studentsResponse.success ? studentsResponse.data.length : 0,
        totalHobbies: hobbiesResponse.success ? hobbiesResponse.data.length : 0,
        totalUsers: usersResponse.success ? usersResponse.data.length : 0,
        recentActivity: []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLoading ? '...' : value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, onClick, color = 'bg-blue-500' }) => (
    <button
      onClick={onClick}
      className={`${color} hover:opacity-90 text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div className="text-left">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Siswa Manager</h1>
        <p className="text-blue-100">
          Manage your students, hobbies, and system users efficiently
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👥"
          color="bg-blue-100 dark:bg-blue-900/20"
          description="Registered students"
        />
        <StatCard
          title="Total Hobbies"
          value={stats.totalHobbies}
          icon="🎨"
          color="bg-green-100 dark:bg-green-900/20"
          description="Available hobbies"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👤"
          color="bg-purple-100 dark:bg-purple-900/20"
          description="System users"
        />
        <StatCard
          title="Active Sessions"
          value="1"
          icon="🟢"
          color="bg-yellow-100 dark:bg-yellow-900/20"
          description="Current user"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction
          title="Add Student"
          description="Register new student"
          icon="➕"
          onClick={() => {/* Navigate to add student */}}
          color="bg-green-500"
        />
        <QuickAction
          title="Add Hobby"
          description="Create new hobby"
          icon="🎯"
          onClick={() => {/* Navigate to add hobby */}}
          color="bg-blue-500"
        />
        <QuickAction
          title="Manage Users"
          description="User administration"
          icon="👥"
          onClick={() => {/* Navigate to users */}}
          color="bg-purple-500"
        />
        <QuickAction
          title="View Reports"
          description="System analytics"
          icon="📊"
          onClick={() => {/* Navigate to reports */}}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="text-lg">📝</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📝</span>
              <p className="text-gray-500 dark:text-gray-400">
                No recent activity to display
              </p>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">API Connection</span>
              <span className="flex items-center text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
              <span className="flex items-center text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Authentication</span>
              <span className="flex items-center text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Tips
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>💡 Use the search bar to quickly find students or hobbies</p>
            <p>💡 Click on any card to view detailed information</p>
            <p>💡 Use the sidebar to navigate between different sections</p>
            <p>💡 Check your profile settings for account preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
} 