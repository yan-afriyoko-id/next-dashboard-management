'use client';

import { useState, useEffect } from 'react';
import apiService from '../../services/apiService.js';
import HobbyForm from './HobbyForm.js';

export default function HobbiesList() {
  const [hobbies, setHobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHobby, setEditingHobby] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.hobby.getAllHobbies(apiService.getToken());
      if (response.success) {
        setHobbies(response.data);
      }
    } catch (error) {
      console.error('Error loading hobbies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHobby = () => {
    setEditingHobby(null);
    setShowForm(true);
  };

  const handleEditHobby = (hobby) => {
    setEditingHobby(hobby);
    setShowForm(true);
  };

  const handleDeleteHobby = async (hobbyId) => {
    if (confirm('Are you sure you want to delete this hobby?')) {
      try {
        const response = await apiService.hobby.deleteHobby(hobbyId, apiService.getToken());
        if (response.success) {
          setHobbies(hobbies.filter(h => h.id !== hobbyId));
        } else {
          alert('Failed to delete hobby: ' + (response.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting hobby:', error);
        alert('Error deleting hobby: ' + error.message);
      }
    }
  };

  const handleFormSubmit = async (hobbyData) => {
    try {
      let response;
      if (editingHobby) {
        response = await apiService.hobby.updateHobby(editingHobby.id, hobbyData, apiService.getToken());
      } else {
        response = await apiService.hobby.createHobby(hobbyData, apiService.getToken());
      }

      if (response && response.success) {
        await loadHobbies();
        setShowForm(false);
        setEditingHobby(null);
      } else {
        alert('Failed to save hobby: ' + (response?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving hobby:', error);
      alert('Error saving hobby: ' + error.message);
    }
  };

  const filteredHobbies = hobbies.filter(hobby =>
    hobby.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hobbies Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student hobbies
          </p>
        </div>
        <button
          onClick={handleAddHobby}
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          ➕ Add Hobby
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search hobbies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Hobbies Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      ) : filteredHobbies.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Students Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredHobbies.map(hobby => (
                  <tr key={hobby.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                          🎨
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {hobby.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {hobby.siswas ? hobby.siswas.length : 0} students
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {hobby.created_at ? new Date(hobby.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditHobby(hobby)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHobby(hobby.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🎨</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No hobbies found' : 'No hobbies yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first hobby'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddHobby}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add First Hobby
            </button>
          )}
        </div>
      )}

      {/* Hobby Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingHobby ? 'Edit Hobby' : 'Add New Hobby'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <HobbyForm
                hobby={editingHobby}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 