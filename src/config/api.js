// API Configuration
const API_CONFIG = {
  // Base URL for all API calls
  BASE_URL: 'http://localhost:8000/api',
  
  // Authentication endpoints
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    GET_CURRENT_USER: '/user',
    SEND_VERIFICATION_EMAIL: '/send-verification-email',
    VERIFY_EMAIL: '/verify-email',
    EMAIL_VERIFICATION_LINK: '/email/verify',
    RESEND_EMAIL_VERIFICATION: '/email/resend'
  },

  // Siswa (Student) endpoints
  SISWA: {
    GET_ALL: '/siswa',
    GET_BY_ID: (id) => `/siswa/${id}`,
    CREATE: '/siswa',
    UPDATE: (id) => `/siswa/${id}`,
    DELETE: (id) => `/siswa/${id}`
  },

  // Hobby endpoints
  HOBBY: {
    GET_ALL: '/hobby',
    CREATE: '/hobby'
  },

  // Phone endpoints
  PHONE: {
    GET_ALL: '/phone'
  },

  // User Management endpoints
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    SEARCH: (query) => `/users/search?query=${query}`
  },

  // Profile endpoints
  PROFILE: {
    GET_CURRENT: '/profile',
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',
    DELETE_ACCOUNT: '/profile',
    GET_STATISTICS: '/profile/statistics'
  }
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (token) => {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Helper function to get default headers
export const getDefaultHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

export default API_CONFIG; 