// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  VALIDATION_ERROR: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Internal server error'
};

// Validation Rules
export const VALIDATION_RULES = {
  NAME: {
    MAX_LENGTH: 255,
    MIN_LENGTH: 1
  },
  EMAIL: {
    MAX_LENGTH: 255
  },
  PASSWORD: {
    MIN_LENGTH: 8
  },
  ADDRESS: {
    MAX_LENGTH: 500
  },
  CITY: {
    MAX_LENGTH: 100
  },
  PHONE: {
    PATTERN: /^[\d\s\-\+\(\)]+$/
  }
};

// Helper function to validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
export const isStrongPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Helper function to format phone number
export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if no pattern matches
};

// Helper function to validate required fields
export const validateRequired = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  return errors;
};

// Helper function to validate field length
export const validateLength = (data, field, minLength, maxLength) => {
  const errors = {};
  
  if (data[field]) {
    const length = data[field].toString().length;
    
    if (minLength && length < minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters`;
    }
    
    if (maxLength && length > maxLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be less than ${maxLength} characters`;
    }
  }
  
  return errors;
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return {
          message: 'Unauthorized access. Please login again.',
          status,
          data
        };
      case HTTP_STATUS.NOT_FOUND:
        return {
          message: 'Resource not found.',
          status,
          data
        };
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return {
          message: 'Validation failed. Please check your input.',
          status,
          data
        };
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return {
          message: 'Server error. Please try again later.',
          status,
          data
        };
      default:
        return {
          message: data?.message || 'An error occurred',
          status,
          data
        };
    }
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      data: null
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      data: null
    };
  }
};

// Helper function to create success response
export const createSuccessResponse = (data, message = API_MESSAGES.SUCCESS) => {
  return {
    success: true,
    message,
    data
  };
};

// Helper function to create error response
export const createErrorResponse = (message, errors = null) => {
  return {
    success: false,
    message,
    errors
  };
};

// Helper function to debounce API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Helper function to throttle API calls
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 