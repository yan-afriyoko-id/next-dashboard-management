# API Services Documentation

This document explains how to use the API services for the Siswa Management System.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Authentication](#authentication)
5. [API Services](#api-services)
6. [Usage Examples](#usage-examples)
7. [Error Handling](#error-handling)
8. [Validation](#validation)

## Overview

The API services are organized into modules that correspond to different parts of the system:

- **Authentication** (`authApi.js`) - User registration, login, logout, password reset
- **Siswa Management** (`siswaApi.js`) - Student CRUD operations
- **Hobby Management** (`hobbyApi.js`) - Hobby CRUD operations
- **Phone Management** (`phoneApi.js`) - Phone number operations
- **User Management** (`userApi.js`) - Admin user management
- **Profile Management** (`profileApi.js`) - User profile operations

## Installation

The API services are built using vanilla JavaScript and don't require additional dependencies. Simply import the services you need:

```javascript
import apiService from './services/apiService.js';
import { handleApiError } from './utils/apiUtils.js';
```

## Configuration

The API configuration is centralized in `src/config/api.js`. The base URL is set to `http://localhost:8000/api` by default.

### Changing Base URL

To change the base URL for different environments:

```javascript
// In src/config/api.js
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com/api'
    : 'http://localhost:8000/api',
  // ... rest of config
};
```

## Authentication

All API services use Laravel Sanctum for authentication. The token is automatically managed by the `apiService`.

### Login Flow

```javascript
import apiService from './services/apiService.js';

// Login user
const loginData = {
  email: 'user@example.com',
  password: 'password123'
};

try {
  const response = await apiService.auth.login(loginData);
  
  if (response.success) {
    // Token is automatically saved to localStorage
    console.log('Login successful:', response.data.user);
  } else {
    console.error('Login failed:', response.message);
  }
} catch (error) {
  console.error('Login error:', error);
}
```

### Token Management

The `apiService` automatically handles token storage:

```javascript
// Get current token
const token = apiService.getToken();

// Check if user is authenticated
const isAuthenticated = apiService.isAuthenticated();

// Remove token (logout)
apiService.removeToken();
```

## API Services

### 1. Authentication Service (`authApi.js`)

**Available Methods:**
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout(token)` - Logout user
- `forgotPassword(email)` - Send password reset email
- `resetPassword(resetData)` - Reset password with token
- `getCurrentUser(token)` - Get current user info
- `sendVerificationEmail(token)` - Send email verification
- `verifyEmail(token)` - Verify email
- `verifyEmailLink(id, hash)` - Verify email via link
- `resendEmailVerification(token)` - Resend verification email

**Example:**
```javascript
// Register new user
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
};

const response = await apiService.auth.register(userData);
```

### 2. Siswa Service (`siswaApi.js`)

**Available Methods:**
- `getAllStudents(token)` - Get all students
- `getStudentById(id, token)` - Get single student
- `createStudent(studentData, token)` - Create new student
- `updateStudent(id, studentData, token)` - Update student
- `deleteStudent(id, token)` - Delete student
- `validateStudentData(data)` - Validate student data
- `formatStudentData(data)` - Format student data for API

**Example:**
```javascript
// Create new student
const studentData = {
  name: 'Alice Johnson',
  phone: '081234567890',
  nisns: '1234567890',
  hobbies: [1, 2, 3] // Array of hobby IDs
};

// Validate data
const validationErrors = apiService.siswa.validateStudentData(studentData);
if (validationErrors.length > 0) {
  console.error('Validation errors:', validationErrors);
  return;
}

// Format and send data
const formattedData = apiService.siswa.formatStudentData(studentData);
const response = await apiService.siswa.createStudent(formattedData, apiService.getToken());
```

### 3. Hobby Service (`hobbyApi.js`)

**Available Methods:**
- `getAllHobbies(token)` - Get all hobbies
- `createHobby(hobbyData, token)` - Create new hobby
- `validateHobbyData(data)` - Validate hobby data
- `formatHobbyData(data)` - Format hobby data for API

**Example:**
```javascript
// Create new hobby
const hobbyData = {
  name: 'Swimming'
};

const validationErrors = apiService.hobby.validateHobbyData(hobbyData);
if (validationErrors.length === 0) {
  const formattedData = apiService.hobby.formatHobbyData(hobbyData);
  const response = await apiService.hobby.createHobby(formattedData, apiService.getToken());
}
```

### 4. Phone Service (`phoneApi.js`)

**Available Methods:**
- `getAllPhones(token)` - Get all phone numbers
- `validatePhoneData(data)` - Validate phone data
- `formatPhoneData(data)` - Format phone data for API

### 5. User Management Service (`userApi.js`)

**Available Methods:**
- `getAllUsers(token, page)` - Get all users (paginated)
- `getUserById(id, token)` - Get single user
- `createUser(userData, token)` - Create new user
- `updateUser(id, userData, token)` - Update user
- `deleteUser(id, token)` - Delete user
- `searchUsers(query, token, page)` - Search users
- `validateUserData(data, isUpdate)` - Validate user data
- `formatUserData(data)` - Format user data for API

**Example:**
```javascript
// Search users
const response = await apiService.user.searchUsers('john', apiService.getToken(), 1);
console.log('Search results:', response.data);
```

### 6. Profile Service (`profileApi.js`)

**Available Methods:**
- `getCurrentProfile(token)` - Get current user profile
- `updateProfile(profileData, token)` - Update profile
- `changePassword(passwordData, token)` - Change password
- `deleteAccount(password, token)` - Delete account
- `getUserStatistics(token)` - Get user statistics
- `validateProfileData(data)` - Validate profile data
- `validatePasswordChangeData(data)` - Validate password change data
- `formatProfileData(data)` - Format profile data for API
- `formatPasswordChangeData(data)` - Format password change data for API

**Example:**
```javascript
// Update profile
const profileData = {
  name: 'John Updated',
  email: 'john.updated@example.com',
  alamat: 'Jl. Contoh No. 456',
  kota: 'Bandung'
};

const validationErrors = apiService.profile.validateProfileData(profileData);
if (validationErrors.length === 0) {
  const formattedData = apiService.profile.formatProfileData(profileData);
  const response = await apiService.profile.updateProfile(formattedData, apiService.getToken());
}
```

## Usage Examples

### Complete Workflow Example

```javascript
import apiService from './services/apiService.js';
import { handleApiError } from './utils/apiUtils.js';

async function completeWorkflow() {
  try {
    // 1. Register and login
    const registerResponse = await apiService.auth.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    });

    if (!registerResponse.success) {
      console.error('Registration failed');
      return;
    }

    // 2. Create a hobby
    const hobbyResponse = await apiService.hobby.createHobby({
      name: 'Reading'
    }, apiService.getToken());

    if (hobbyResponse.success) {
      const hobbyId = hobbyResponse.data.id;

      // 3. Create a student with the hobby
      const studentResponse = await apiService.siswa.createStudent({
        name: 'Alice Johnson',
        phone: '081234567890',
        nisns: '1234567890',
        hobbies: [hobbyId]
      }, apiService.getToken());

      console.log('Student created:', studentResponse);
    }

    // 4. Get all students
    const studentsResponse = await apiService.siswa.getAllStudents(apiService.getToken());
    console.log('All students:', studentsResponse);

    // 5. Update profile
    const profileResponse = await apiService.profile.updateProfile({
      name: 'John Updated',
      alamat: 'Jl. Contoh No. 123',
      kota: 'Jakarta'
    }, apiService.getToken());

    // 6. Logout
    await apiService.auth.logout(apiService.getToken());

  } catch (error) {
    const errorResponse = handleApiError(error);
    console.error('Workflow error:', errorResponse);
  }
}
```

### React Component Example

```javascript
import React, { useState, useEffect } from 'react';
import apiService from './services/apiService.js';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await apiService.siswa.getAllStudents(apiService.getToken());
      
      if (response.success) {
        setStudents(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData) => {
    try {
      const validationErrors = apiService.siswa.validateStudentData(studentData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return;
      }

      const formattedData = apiService.siswa.formatStudentData(studentData);
      const response = await apiService.siswa.createStudent(formattedData, apiService.getToken());
      
      if (response.success) {
        setStudents([...students, response.data]);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to create student');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Students</h2>
      {students.map(student => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Phone: {student.phone?.map(p => p.number_phone).join(', ')}</p>
          <p>NISN: {student.nisns?.map(n => n.nisns).join(', ')}</p>
          <p>Hobbies: {student.hobbies?.map(h => h.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

All API services include comprehensive error handling:

```javascript
import { handleApiError } from './utils/apiUtils.js';

try {
  const response = await apiService.auth.login(credentials);
  // Handle success
} catch (error) {
  const errorResponse = handleApiError(error);
  
  switch (errorResponse.status) {
    case 401:
      // Handle unauthorized
      apiService.removeToken();
      break;
    case 422:
      // Handle validation errors
      console.error('Validation errors:', errorResponse.data);
      break;
    default:
      // Handle other errors
      console.error('API error:', errorResponse.message);
  }
}
```

## Validation

All services include built-in validation methods:

```javascript
// Validate student data
const studentData = {
  name: 'John Doe',
  phone: '081234567890',
  nisns: '1234567890',
  hobbies: [1, 2, 3]
};

const errors = apiService.siswa.validateStudentData(studentData);
if (errors.length > 0) {
  console.error('Validation errors:', errors);
  return;
}

// Validate user data
const userData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'password123',
  password_confirmation: 'password123'
};

const userErrors = apiService.user.validateUserData(userData);
if (userErrors.length > 0) {
  console.error('User validation errors:', userErrors);
  return;
}
```

## Utility Functions

The `apiUtils.js` file provides useful utility functions:

```javascript
import { 
  isValidEmail, 
  isStrongPassword, 
  formatPhoneNumber,
  validateRequired,
  validateLength,
  debounce,
  throttle 
} from './utils/apiUtils.js';

// Email validation
if (!isValidEmail('user@example.com')) {
  console.error('Invalid email format');
}

// Password strength check
if (!isStrongPassword('password123')) {
  console.error('Password is not strong enough');
}

// Phone number formatting
const formattedPhone = formatPhoneNumber('081234567890');
console.log(formattedPhone); // (081) 234-5678

// Required field validation
const errors = validateRequired(userData, ['name', 'email', 'password']);
if (Object.keys(errors).length > 0) {
  console.error('Missing required fields:', errors);
}

// Debounced API call
const debouncedSearch = debounce(async (query) => {
  const response = await apiService.user.searchUsers(query, apiService.getToken());
  // Handle response
}, 300);
```

## Best Practices

1. **Always validate data** before sending to API
2. **Handle errors gracefully** with proper user feedback
3. **Use the token management** functions provided by `apiService`
4. **Format data** using the provided formatting functions
5. **Use debouncing** for search operations
6. **Check authentication** before making protected API calls
7. **Handle loading states** in your UI components
8. **Use the utility functions** for common operations

## Environment Configuration

For different environments, you can modify the base URL in `src/config/api.js`:

```javascript
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com/api'
    : process.env.NODE_ENV === 'staging'
    ? 'https://your-staging-api.com/api'
    : 'http://localhost:8000/api',
  // ... rest of config
};
```

This completes the API services implementation for the Siswa Management System. All services are fully functional and ready to use with proper error handling, validation, and utility functions. 