# Troubleshooting Guide - Siswa Management System

## Common Issues and Solutions

### 1. Phone Number and NISN Unique Constraint Error

**Problem**: When editing a student, you get an error saying the phone number or NISN is already taken, even though you're updating the same student.

**Root Cause**: The backend has unique constraints on phone numbers and NISN, but the validation doesn't exclude the current student being updated.

**Frontend Solution**: 
- The frontend now provides better error handling and user-friendly error messages
- Error messages will clearly indicate which field is causing the conflict
- Users can see exactly which phone number or NISN is already in use

**Backend Solution** (Recommended):
The backend validation should be updated to exclude the current student from unique checks during updates. In Laravel, this can be done using the `Rule::unique()->ignore()` method:

```php
// In the update validation rules
'phone' => ['required', 'string', Rule::unique('phones', 'number_phone')->ignore($student->id, 'siswa_id')],
'nisns' => ['required', 'string', Rule::unique('nisns', 'nisns')->ignore($student->id, 'siswa_id')],
```

### 2. Form Data Not Loading Correctly

**Problem**: When editing a student, the form doesn't show the current data.

**Solution**: 
- Check the browser console for any JavaScript errors
- Verify that the student data is being passed correctly to the form
- Ensure the API is returning the expected data structure

### 3. API Connection Issues

**Problem**: Cannot connect to the backend API.

**Solutions**:
1. **Check if the backend server is running**:
   ```bash
   # In your Laravel project directory
   php artisan serve
   ```

2. **Verify the API base URL** in `src/config/api.js`:
   ```javascript
   const API_CONFIG = {
     BASE_URL: 'http://localhost:8000/api', // Make sure this matches your backend
     // ...
   };
   ```

3. **Check CORS settings** in your Laravel backend:
   ```php
   // In config/cors.php
   'allowed_origins' => ['http://localhost:3000'], // Your frontend URL
   ```

### 4. Authentication Issues

**Problem**: Getting 401 Unauthorized errors.

**Solutions**:
1. **Check if you're logged in** - Make sure you have a valid token
2. **Verify token storage** - Check if the token is being saved correctly
3. **Check token expiration** - Tokens may expire, try logging in again

### 5. Data Format Issues

**Problem**: Data is not being saved in the expected format.

**Expected API Format**:
```json
{
  "name": "Student Name",
  "phone": "081234567890",
  "nisns": "1234567890",
  "hobbies": [1, 2, 3]
}
```

**Frontend Formatting**: The `formatStudentData` method in `siswaApi.js` ensures data is formatted correctly before sending to the API.

## Error Messages

### Common Error Messages and Meanings:

1. **"Phone number '081234567890' is already taken by another student"**
   - Another student already has this phone number
   - Solution: Use a different phone number or update the backend validation

2. **"NISN '1234567890' is already taken by another student"**
   - Another student already has this NISN
   - Solution: Use a different NISN or update the backend validation

3. **"Failed to update student"**
   - General API error
   - Check network connection and backend server status

4. **"Name is required"**
   - Validation error
   - Fill in the required field

## Debugging Tips

1. **Check Browser Console**: Look for JavaScript errors and API response details
2. **Check Network Tab**: See the actual API requests and responses
3. **Check Backend Logs**: Look at Laravel logs for server-side errors
4. **Use Browser DevTools**: Inspect the network requests and responses

## Getting Help

If you're still experiencing issues:

1. Check this troubleshooting guide
2. Look at the browser console for error messages
3. Check the network tab for failed API requests
4. Verify your backend server is running and accessible
5. Check the Laravel logs for backend errors

## Recent Improvements

### Version 1.1.0
- ✅ Improved error handling for unique constraint violations
- ✅ Better user feedback with success/error messages
- ✅ More detailed error messages for phone and NISN conflicts
- ✅ Auto-dismissing notifications
- ✅ Enhanced form validation feedback 