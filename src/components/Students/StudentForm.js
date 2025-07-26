'use client';

import { useState, useEffect } from 'react';
import { formatPhoneNumber } from '../../utils/apiUtils.js';

export default function StudentForm({ student, hobbies, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nisns: '',
    hobbies: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (student) {
      // Handle phone array - get first phone number
      const phoneNumber = student.phone && student.phone.length > 0 
        ? student.phone[0].number_phone 
        : '';
      
      // Handle nisns array - get first NISN
      const nisnNumber = student.nisns && student.nisns.length > 0 
        ? student.nisns[0].nisns 
        : '';
      
      // Handle hobbies array - get hobby IDs
      const hobbyIds = student.hobbies && student.hobbies.length > 0 
        ? student.hobbies.map(hobby => hobby.id)
        : [];

      setFormData({
        name: student.name || '',
        phone: phoneNumber,
        nisns: nisnNumber,
        hobbies: hobbyIds
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Format phone number as user types
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleHobbyChange = (hobbyId) => {
    setFormData(prev => {
      const currentHobbies = [...prev.hobbies];
      const index = currentHobbies.indexOf(hobbyId);
      
      if (index > -1) {
        // Remove hobby if already selected
        currentHobbies.splice(index, 1);
      } else {
        // Add hobby if not selected
        currentHobbies.push(hobbyId);
      }
      
      return {
        ...prev,
        hobbies: currentHobbies
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.nisns.trim()) {
      newErrors.nisns = 'NISN is required';
    } else if (formData.nisns.length < 5) {
      newErrors.nisns = 'NISN must be at least 5 characters long';
    }

    if (formData.hobbies.length === 0) {
      newErrors.hobbies = 'Please select at least one hobby';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Prepare data according to API structure
      const submitData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        nisns: formData.nisns.trim(),
        hobbies: formData.hobbies
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter student name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
        )}
      </div>

      {/* NISN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          NISN *
        </label>
        <input
          type="text"
          name="nisns"
          value={formData.nisns}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.nisns ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter NISN"
        />
        {errors.nisns && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nisns}</p>
        )}
      </div>

      {/* Hobbies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Hobbies *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {hobbies.map(hobby => (
            <label key={hobby.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hobbies.includes(hobby.id)}
                onChange={() => handleHobbyChange(hobby.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{hobby.name}</span>
            </label>
          ))}
        </div>
        {errors.hobbies && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hobbies}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : (student ? 'Update Student' : 'Add Student')}
        </button>
      </div>
    </form>
  );
} 