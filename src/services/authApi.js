import API_CONFIG, { getApiUrl, getAuthHeaders, getDefaultHeaders } from '../config/api.js';

class AuthApiService {
  // Register new user
  async register(userData) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.REGISTER), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.LOGIN), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(credentials)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  // Logout user
  async logout(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.LOGOUT), {
        method: 'POST',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Logout failed: ' + error.message);
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.FORGOT_PASSWORD), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({ email })
      });
      return await response.json();
    } catch (error) {
      throw new Error('Forgot password request failed: ' + error.message);
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.RESET_PASSWORD), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(resetData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Password reset failed: ' + error.message);
    }
  }

  // Get current user
  async getCurrentUser(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.GET_CURRENT_USER), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get current user: ' + error.message);
    }
  }

  // Send verification email
  async sendVerificationEmail(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.SEND_VERIFICATION_EMAIL), {
        method: 'POST',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to send verification email: ' + error.message);
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.VERIFY_EMAIL), {
        method: 'POST',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Email verification failed: ' + error.message);
    }
  }

  // Email verification link (public endpoint)
  async verifyEmailLink(id, hash) {
    try {
      const response = await fetch(getApiUrl(`${API_CONFIG.AUTH.EMAIL_VERIFICATION_LINK}/${id}/${hash}`));
      return await response.json();
    } catch (error) {
      throw new Error('Email verification link failed: ' + error.message);
    }
  }

  // Resend email verification
  async resendEmailVerification(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.AUTH.RESEND_EMAIL_VERIFICATION), {
        method: 'POST',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to resend verification email: ' + error.message);
    }
  }
}

export default new AuthApiService(); 