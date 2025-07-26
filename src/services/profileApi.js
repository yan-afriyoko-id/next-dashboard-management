import API_CONFIG, { getApiUrl, getAuthHeaders } from '../config/api.js';

class ProfileApiService {
  // Get current user profile
  async getCurrentProfile(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PROFILE.GET_CURRENT), {
        headers: getAuthHeaders(token)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", data: {...} }
      if (result.status === "success") {
        return {
          success: true,
          data: result.data
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to get profile'
        };
      }
    } catch (error) {
      throw new Error('Failed to get profile: ' + error.message);
    }
  }

  // Update current user profile
  async updateProfile(profileData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PROFILE.UPDATE), {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(profileData)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", data: {...} }
      if (result.status === "success") {
        return {
          success: true,
          data: result.data
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to update profile'
        };
      }
    } catch (error) {
      throw new Error('Failed to update profile: ' + error.message);
    }
  }

  // Change password
  async changePassword(passwordData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PROFILE.CHANGE_PASSWORD), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(passwordData)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", message: "..." }
      if (result.status === "success") {
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to change password'
        };
      }
    } catch (error) {
      throw new Error('Failed to change password: ' + error.message);
    }
  }

  // Delete account
  async deleteAccount(password, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PROFILE.DELETE_ACCOUNT), {
        method: 'DELETE',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ password })
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", message: "..." }
      if (result.status === "success") {
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to delete account'
        };
      }
    } catch (error) {
      throw new Error('Failed to delete account: ' + error.message);
    }
  }

  // Get user statistics
  async getUserStatistics(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PROFILE.GET_STATISTICS), {
        headers: getAuthHeaders(token)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", data: {...} }
      if (result.status === "success") {
        return {
          success: true,
          data: result.data
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to get user statistics'
        };
      }
    } catch (error) {
      throw new Error('Failed to get user statistics: ' + error.message);
    }
  }

  // Helper method to validate profile data
  validateProfileData(data) {
    const errors = [];
    
    if (data.name !== undefined) {
      if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
      }
      
      if (data.name && data.name.length > 255) {
        errors.push('Name must be less than 255 characters');
      }
    }
    
    if (data.email !== undefined) {
      if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
      }
      
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Email format is invalid');
      }
      
      if (data.email && data.email.length > 255) {
        errors.push('Email must be less than 255 characters');
      }
    }
    
    if (data.alamat !== undefined && data.alamat && data.alamat.length > 500) {
      errors.push('Address must be less than 500 characters');
    }
    
    if (data.kota !== undefined && data.kota && data.kota.length > 100) {
      errors.push('City must be less than 100 characters');
    }
    
    return errors;
  }

  // Helper method to validate password change data
  validatePasswordChangeData(data) {
    const errors = [];
    
    if (!data.current_password) {
      errors.push('Current password is required');
    }
    
    if (!data.new_password) {
      errors.push('New password is required');
    } else if (data.new_password.length < 8) {
      errors.push('New password must be at least 8 characters');
    }
    
    if (!data.new_password_confirmation) {
      errors.push('Password confirmation is required');
    } else if (data.new_password !== data.new_password_confirmation) {
      errors.push('Password confirmation does not match');
    }
    
    return errors;
  }

  // Helper method to format profile data for API
  formatProfileData(data) {
    const formatted = {};
    
    if (data.name !== undefined) {
      formatted.name = data.name?.trim();
    }
    
    if (data.email !== undefined) {
      formatted.email = data.email?.trim().toLowerCase();
    }
    
    if (data.alamat !== undefined) {
      formatted.alamat = data.alamat?.trim() || null;
    }
    
    if (data.kota !== undefined) {
      formatted.kota = data.kota?.trim() || null;
    }
    
    return formatted;
  }

  // Helper method to format password change data for API
  formatPasswordChangeData(data) {
    return {
      current_password: data.current_password,
      new_password: data.new_password,
      new_password_confirmation: data.new_password_confirmation
    };
  }
}

export default new ProfileApiService(); 