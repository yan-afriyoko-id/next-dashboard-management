import API_CONFIG, { getApiUrl, getAuthHeaders } from '../config/api.js';

class UserApiService {
  // Get all users (paginated)
  async getAllUsers(token, page = 1) {
    try {
      const url = `${getApiUrl(API_CONFIG.USERS.GET_ALL)}?page=${page}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(token)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", data: { current_page, data: [...], per_page, total } }
      if (result.status === "success") {
        return {
          success: true,
          data: result.data.data, // Extract the actual users array
          pagination: {
            current_page: result.data.current_page,
            per_page: result.data.per_page,
            total: result.data.total
          }
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to get users'
        };
      }
    } catch (error) {
      throw new Error('Failed to get users: ' + error.message);
    }
  }

  // Get single user by ID
  async getUserById(id, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.USERS.GET_BY_ID(id)), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get user: ' + error.message);
    }
  }

  // Create new user
  async createUser(userData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.USERS.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(userData)
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
          message: result.message || 'Failed to create user'
        };
      }
    } catch (error) {
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  // Update user
  async updateUser(id, userData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.USERS.UPDATE(id)), {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(userData)
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
          message: result.message || 'Failed to update user'
        };
      }
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  // Delete user
  async deleteUser(id, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.USERS.DELETE(id)), {
        method: 'DELETE',
        headers: getAuthHeaders(token)
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
          message: result.message || 'Failed to delete user'
        };
      }
    } catch (error) {
      throw new Error('Failed to delete user: ' + error.message);
    }
  }

  // Search users
  async searchUsers(query, token, page = 1) {
    try {
      const url = `${getApiUrl(API_CONFIG.USERS.SEARCH(query))}&page=${page}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(token)
      });
      const result = await response.json();
      
      // Handle the API response structure: { status: "success", data: { current_page, data: [...], per_page, total } }
      if (result.status === "success") {
        return {
          success: true,
          data: result.data.data, // Extract the actual users array
          pagination: {
            current_page: result.data.current_page,
            per_page: result.data.per_page,
            total: result.data.total
          }
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to search users'
        };
      }
    } catch (error) {
      throw new Error('Failed to search users: ' + error.message);
    }
  }

  // Helper method to validate user data
  validateUserData(data, isUpdate = false) {
    const errors = [];
    
    if (!isUpdate || data.name !== undefined) {
      if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
      }
      
      if (data.name && data.name.length > 255) {
        errors.push('Name must be less than 255 characters');
      }
    }
    
    if (!isUpdate || data.email !== undefined) {
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
    
    if (!isUpdate || data.password !== undefined) {
      if (!data.password) {
        errors.push('Password is required');
      } else if (data.password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      
      if (data.password && data.password !== data.password_confirmation) {
        errors.push('Password confirmation does not match');
      }
    }
    
    return errors;
  }

  // Helper method to format user data for API
  formatUserData(data) {
    const formatted = {};
    
    if (data.name !== undefined) {
      formatted.name = data.name?.trim();
    }
    
    if (data.email !== undefined) {
      formatted.email = data.email?.trim().toLowerCase();
    }
    
    if (data.password !== undefined) {
      formatted.password = data.password;
    }
    
    if (data.password_confirmation !== undefined) {
      formatted.password_confirmation = data.password_confirmation;
    }
    
    return formatted;
  }
}

export default new UserApiService(); 