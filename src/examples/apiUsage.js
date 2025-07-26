import apiService from '../services/apiService.js';
import { handleApiError, createSuccessResponse } from '../utils/apiUtils.js';

// Example usage of all API services

// Authentication Examples
export const authExamples = {
  // Register new user
  async registerUser() {
    try {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      };
      
      const response = await apiService.auth.register(userData);
      
      if (response.success) {
        // Save token to localStorage
        apiService.setToken(response.data.token);
        console.log('Registration successful:', response.message);
        return response;
      } else {
        console.error('Registration failed:', response.message);
        return response;
      }
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Registration error:', errorResponse);
      return errorResponse;
    }
  },

  // Login user
  async loginUser() {
    try {
      const credentials = {
        email: 'john@example.com',
        password: 'password123'
      };
      
      const response = await apiService.auth.login(credentials);
      
      if (response.success) {
        // Save token to localStorage
        apiService.setToken(response.data.token);
        console.log('Login successful:', response.message);
        return response;
      } else {
        console.error('Login failed:', response.message);
        return response;
      }
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Login error:', errorResponse);
      return errorResponse;
    }
  },

  // Logout user
  async logoutUser() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.log('No token found, user already logged out');
        return;
      }
      
      const response = await apiService.auth.logout(token);
      
      if (response.success) {
        // Remove token from localStorage
        apiService.removeToken();
        console.log('Logout successful:', response.message);
        return response;
      } else {
        console.error('Logout failed:', response.message);
        return response;
      }
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Logout error:', errorResponse);
      return errorResponse;
    }
  },

  // Forgot password
  async forgotPassword() {
    try {
      const response = await apiService.auth.forgotPassword('john@example.com');
      console.log('Forgot password response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Forgot password error:', errorResponse);
      return errorResponse;
    }
  },

  // Reset password
  async resetPassword() {
    try {
      const resetData = {
        token: 'reset_token_from_email',
        email: 'john@example.com',
        password: 'newpassword123',
        password_confirmation: 'newpassword123'
      };
      
      const response = await apiService.auth.resetPassword(resetData);
      console.log('Reset password response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Reset password error:', errorResponse);
      return errorResponse;
    }
  }
};

// Siswa (Student) Examples
export const siswaExamples = {
  // Get all students
  async getAllStudents() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.siswa.getAllStudents(token);
      console.log('All students:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Get students error:', errorResponse);
      return errorResponse;
    }
  },

  // Create new student
  async createStudent() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const studentData = {
        name: 'Jane Smith',
        phone: '081234567890',
        nisns: '1234567890',
        hobbies: [1, 2, 3] // Array of hobby IDs
      };
      
      // Validate student data
      const validationErrors = apiService.siswa.validateStudentData(studentData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format student data
      const formattedData = apiService.siswa.formatStudentData(studentData);
      
      const response = await apiService.siswa.createStudent(formattedData, token);
      console.log('Create student response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Create student error:', errorResponse);
      return errorResponse;
    }
  },

  // Update student
  async updateStudent(studentId) {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const studentData = {
        name: 'Jane Smith Updated',
        phone: '081234567890',
        nisns: '1234567890',
        hobbies: [1, 2, 4] // Updated hobby IDs
      };
      
      // Validate student data
      const validationErrors = apiService.siswa.validateStudentData(studentData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format student data
      const formattedData = apiService.siswa.formatStudentData(studentData);
      
      const response = await apiService.siswa.updateStudent(studentId, formattedData, token);
      console.log('Update student response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Update student error:', errorResponse);
      return errorResponse;
    }
  },

  // Delete student
  async deleteStudent(studentId) {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.siswa.deleteStudent(studentId, token);
      console.log('Delete student response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Delete student error:', errorResponse);
      return errorResponse;
    }
  }
};

// Hobby Examples
export const hobbyExamples = {
  // Get all hobbies
  async getAllHobbies() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.hobby.getAllHobbies(token);
      console.log('All hobbies:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Get hobbies error:', errorResponse);
      return errorResponse;
    }
  },

  // Create new hobby
  async createHobby() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const hobbyData = {
        name: 'Swimming'
      };
      
      // Validate hobby data
      const validationErrors = apiService.hobby.validateHobbyData(hobbyData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format hobby data
      const formattedData = apiService.hobby.formatHobbyData(hobbyData);
      
      const response = await apiService.hobby.createHobby(formattedData, token);
      console.log('Create hobby response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Create hobby error:', errorResponse);
      return errorResponse;
    }
  }
};

// User Management Examples
export const userExamples = {
  // Get all users
  async getAllUsers(page = 1) {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.user.getAllUsers(token, page);
      console.log('All users:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Get users error:', errorResponse);
      return errorResponse;
    }
  },

  // Create new user
  async createUser() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      };
      
      // Validate user data
      const validationErrors = apiService.user.validateUserData(userData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format user data
      const formattedData = apiService.user.formatUserData(userData);
      
      const response = await apiService.user.createUser(formattedData, token);
      console.log('Create user response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Create user error:', errorResponse);
      return errorResponse;
    }
  },

  // Search users
  async searchUsers(query) {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.user.searchUsers(query, token);
      console.log('Search users response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Search users error:', errorResponse);
      return errorResponse;
    }
  }
};

// Profile Examples
export const profileExamples = {
  // Get current user profile
  async getCurrentProfile() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const response = await apiService.profile.getCurrentProfile(token);
      console.log('Current profile:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Get profile error:', errorResponse);
      return errorResponse;
    }
  },

  // Update profile
  async updateProfile() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const profileData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        alamat: 'Jl. Contoh No. 456',
        kota: 'Bandung'
      };
      
      // Validate profile data
      const validationErrors = apiService.profile.validateProfileData(profileData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format profile data
      const formattedData = apiService.profile.formatProfileData(profileData);
      
      const response = await apiService.profile.updateProfile(formattedData, token);
      console.log('Update profile response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Update profile error:', errorResponse);
      return errorResponse;
    }
  },

  // Change password
  async changePassword() {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      const passwordData = {
        current_password: 'oldpassword123',
        new_password: 'newpassword123',
        new_password_confirmation: 'newpassword123'
      };
      
      // Validate password change data
      const validationErrors = apiService.profile.validatePasswordChangeData(passwordData);
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return createErrorResponse('Validation failed', validationErrors);
      }
      
      // Format password change data
      const formattedData = apiService.profile.formatPasswordChangeData(passwordData);
      
      const response = await apiService.profile.changePassword(formattedData, token);
      console.log('Change password response:', response);
      return response;
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error('Change password error:', errorResponse);
      return errorResponse;
    }
  }
};

// Complete workflow example
export const completeWorkflow = async () => {
  console.log('=== Starting Complete API Workflow ===');
  
  try {
    // 1. Register a new user
    console.log('\n1. Registering new user...');
    const registerResponse = await authExamples.registerUser();
    if (!registerResponse.success) {
      console.error('Registration failed, stopping workflow');
      return;
    }
    
    // 2. Get current user
    console.log('\n2. Getting current user...');
    const currentUserResponse = await apiService.auth.getCurrentUser(apiService.getToken());
    console.log('Current user:', currentUserResponse);
    
    // 3. Create a hobby
    console.log('\n3. Creating a hobby...');
    const hobbyResponse = await hobbyExamples.createHobby();
    if (hobbyResponse.success) {
      const hobbyId = hobbyResponse.data.id;
      
      // 4. Create a student with the hobby
      console.log('\n4. Creating a student...');
      const studentData = {
        name: 'Alice Johnson',
        phone: '081234567890',
        nisns: '1234567890',
        hobbies: [hobbyId]
      };
      
      const studentResponse = await apiService.siswa.createStudent(
        apiService.siswa.formatStudentData(studentData),
        apiService.getToken()
      );
      console.log('Student created:', studentResponse);
      
      // 5. Get all students
      console.log('\n5. Getting all students...');
      const allStudentsResponse = await siswaExamples.getAllStudents();
      console.log('All students:', allStudentsResponse);
      
      // 6. Update profile
      console.log('\n6. Updating profile...');
      const profileResponse = await profileExamples.updateProfile();
      console.log('Profile updated:', profileResponse);
      
      // 7. Logout
      console.log('\n7. Logging out...');
      const logoutResponse = await authExamples.logoutUser();
      console.log('Logout:', logoutResponse);
    }
    
    console.log('\n=== Complete API Workflow Finished ===');
    
  } catch (error) {
    console.error('Workflow error:', error);
  }
};

// Export all examples
export default {
  auth: authExamples,
  siswa: siswaExamples,
  hobby: hobbyExamples,
  user: userExamples,
  profile: profileExamples,
  completeWorkflow
}; 