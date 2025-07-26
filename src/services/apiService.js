import authApi from './authApi.js';
import siswaApi from './siswaApi.js';
import hobbyApi from './hobbyApi.js';
import phoneApi from './phoneApi.js';
import userApi from './userApi.js';
import profileApi from './profileApi.js';

// Main API service that combines all individual services
class ApiService {
  constructor() {
    this.auth = authApi;
    this.siswa = siswaApi;
    this.hobby = hobbyApi;
    this.phone = phoneApi;
    this.user = userApi;
    this.profile = profileApi;
  }

  // Helper method to get token from localStorage
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Helper method to set token in localStorage
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Helper method to remove token from localStorage
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Helper method to check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Helper method to handle API responses
  handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Helper method to handle API errors
  handleError(error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default new ApiService(); 