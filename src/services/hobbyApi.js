import API_CONFIG, { getApiUrl, getAuthHeaders, getDefaultHeaders } from '../config/api.js';

class HobbyApiService {
  // Get all hobbies
  async getAllHobbies(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.HOBBY.GET_ALL), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get hobbies: ' + error.message);
    }
  }

  // Create new hobby
  async createHobby(hobbyData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.HOBBY.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(hobbyData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to create hobby: ' + error.message);
    }
  }

  // Update hobby
  async updateHobby(hobbyId, hobbyData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.HOBBY.UPDATE(hobbyId)), {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(hobbyData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update hobby: ' + error.message);
    }
  }

  // Delete hobby
  async deleteHobby(hobbyId, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.HOBBY.DELETE(hobbyId)), {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete hobby: ' + error.message);
    }
  }

  // Helper method to validate hobby data
  validateHobbyData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Hobby name is required');
    }
    
    if (data.name && data.name.length > 255) {
      errors.push('Hobby name must be less than 255 characters');
    }
    
    return errors;
  }

  // Helper method to format hobby data for API
  formatHobbyData(data) {
    return {
      name: data.name?.trim()
    };
  }
}

export default new HobbyApiService(); 