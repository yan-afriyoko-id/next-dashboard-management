import API_CONFIG, { getApiUrl, getAuthHeaders } from '../config/api.js';

class PhoneApiService {
  // Get all phones
  async getAllPhones(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.PHONE.GET_ALL), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get phones: ' + error.message);
    }
  }

  // Helper method to validate phone data
  validatePhoneData(data) {
    const errors = [];
    
    if (!data.number_phone || data.number_phone.trim() === '') {
      errors.push('Phone number is required');
    }
    
    // Basic phone number validation (can be enhanced based on requirements)
    if (data.number_phone && !/^[\d\s\-\+\(\)]+$/.test(data.number_phone)) {
      errors.push('Phone number contains invalid characters');
    }
    
    return errors;
  }

  // Helper method to format phone data for API
  formatPhoneData(data) {
    return {
      number_phone: data.number_phone?.trim()
    };
  }
}

export default new PhoneApiService(); 