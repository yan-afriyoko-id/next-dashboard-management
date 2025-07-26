import API_CONFIG, { getApiUrl, getAuthHeaders } from '../config/api.js';

class SiswaApiService {
  // Get all students
  async getAllStudents(token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.SISWA.GET_ALL), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get students: ' + error.message);
    }
  }

  // Get single student by ID
  async getStudentById(id, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.SISWA.GET_BY_ID(id)), {
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get student: ' + error.message);
    }
  }

  // Create new student
  async createStudent(studentData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.SISWA.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(studentData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to create student: ' + error.message);
    }
  }

  // Update student
  async updateStudent(id, studentData, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.SISWA.UPDATE(id)), {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(studentData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update student: ' + error.message);
    }
  }

  // Delete student
  async deleteStudent(id, token) {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.SISWA.DELETE(id)), {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete student: ' + error.message);
    }
  }

  // Helper method to validate student data
  validateStudentData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }
    
    if (!data.phone || data.phone.trim() === '') {
      errors.push('Phone number is required');
    }
    
    if (!data.nisns || data.nisns.trim() === '') {
      errors.push('NISN is required');
    }
    
    if (!data.hobbies || !Array.isArray(data.hobbies) || data.hobbies.length === 0) {
      errors.push('At least one hobby is required');
    }
    
    return errors;
  }

  // Helper method to format student data for API
  formatStudentData(data) {
    return {
      name: data.name?.trim(),
      phone: data.phone?.trim(),
      nisns: data.nisns?.trim(),
      hobbies: Array.isArray(data.hobbies) ? data.hobbies : []
    };
  }
}

export default new SiswaApiService(); 