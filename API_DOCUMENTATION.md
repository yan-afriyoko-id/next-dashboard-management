# API Documentation - Siswa Management System

## Base URL
```
http://localhost:8000/api
```

## Authentication
All endpoints require authentication using Laravel Sanctum. Include the Bearer token in the Authorization header:
```
Authorization: Bearer {your_token}
```

---

## 0. Authentication API Endpoints

### 0.1 Register User
**POST** `/api/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Validation Rules:**
- `name`: required, string, max 255 characters
- `email`: required, string, lowercase, email format, max 255 characters, unique
- `password`: required, confirmed, must meet Laravel password rules
- `password_confirmation`: required, must match password

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "email_verified_at": null,
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    },
    "token": "1|abc123def456..."
  },
  "message": "User berhasil didaftarkan dan email verifikasi telah dikirim"
}
```

### 0.2 Login User
**POST** `/api/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: required, email format
- `password`: required, string

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "1|abc123def456..."
  },
  "message": "Login berhasil"
}
```

### 0.3 Forgot Password
**POST** `/api/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Validation Rules:**
- `email`: required, email format

**Response:**
```json
{
  "success": true,
  "message": "Link reset password telah dikirim ke email Anda",
  "data": {
    "email": "john@example.com"
  }
}
```

### 0.4 Reset Password
**POST** `/api/reset-password`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "email": "john@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

**Validation Rules:**
- `token`: required (from email reset link)
- `email`: required, email format
- `password`: required, confirmed, must meet Laravel password rules
- `password_confirmation`: required, must match password

**Response:**
```json
{
  "success": true,
  "message": "Password berhasil direset. Silakan login dengan password baru Anda.",
  "data": {
    "email": "john@example.com"
  }
}
```

### 0.5 Logout User
**POST** `/api/logout`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### 0.6 Get Current User
**GET** `/api/user`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": "2024-01-01T00:00:00.000000Z"
  },
  "message": "Data user berhasil diambil"
}
```

### 0.7 Send Email Verification
**POST** `/api/send-verification-email`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verifikasi telah dikirim"
}
```

### 0.8 Verify Email
**POST** `/api/verify-email`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Email berhasil diverifikasi"
}
```

### 0.9 Email Verification Link
**GET** `/api/email/verify/{id}/{hash}`

**Description:** Public endpoint for email verification (accessed via email link)

**Response:**
```json
{
  "success": true,
  "message": "Email berhasil diverifikasi"
}
```

### 0.10 Resend Email Verification
**POST** `/api/email/resend`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verifikasi telah dikirim ulang"
}
```

## Database Relationships

### Entity Relationships
- **User** - Authentication entity
  - `hasOne` Profile (One user can have one profile)

- **Profile** - User profile information
  - `belongsTo` User (Each profile belongs to one user)

- **Siswa** (Student) - Main entity
  - `hasMany` Phone (One student can have multiple phone numbers)
  - `hasMany` Nisns (One student can have multiple NISN numbers)
  - `belongsToMany` Hobby (Many-to-many relationship with hobbies)

- **Phone** - Phone numbers
  - `belongsTo` Siswa (Each phone belongs to one student)

- **Nisns** - NISN numbers
  - `belongsTo` Siswa (Each NISN belongs to one student)

- **Hobby** - Hobbies
  - `belongsToMany` Siswa (Many-to-many relationship with students)

### Pivot Table
- **siswa_hobbies** - Junction table for Siswa-Hobby relationship

---

## 1. Siswa API Endpoints

### 1.1 Get All Students
**GET** `/api/siswa`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z",
      "phone": [
        {
          "id": 1,
          "number_phone": "081234567890",
          "siswa_id": 1,
          "created_at": "2024-01-01T00:00:00.000000Z",
          "updated_at": "2024-01-01T00:00:00.000000Z"
        }
      ],
      "nisns": [
        {
          "id": 1,
          "nisns": "1234567890",
          "siswa_id": 1,
          "created_at": "2024-01-01T00:00:00.000000Z",
          "updated_at": "2024-01-01T00:00:00.000000Z"
        }
      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Reading",
          "pivot": {
            "siswa_id": 1,
            "hobby_id": 1,
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
          }
        }
      ]
    }
  ],
  "message": "Data siswa berhasil diambil"
}
```

### 1.2 Get Single Student
**GET** `/api/siswa/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "phone": [...],
    "nisns": [...],
    "hobbies": [...]
  },
  "message": "Data siswa berhasil diambil"
}
```

### 1.3 Create Student
**POST** `/api/siswa`

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "081234567890",
  "nisns": "1234567890",
  "hobbies": [1, 2, 3]
}
```

**Validation Rules:**
- `name`: required, string, max 255 characters
- `phone`: required, string
- `nisns`: required, string
- `hobbies`: required, array of integers (hobby IDs)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "phone": [...],
    "nisns": [...],
    "hobbies": [...]
  },
  "message": "Siswa berhasil ditambahkan"
}
```

### 1.4 Update Student
**PUT** `/api/siswa/{id}`

**Request Body:** (Same as Create)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "phone": [...],
    "nisns": [...],
    "hobbies": [...]
  },
  "message": "Siswa berhasil diperbarui"
}
```

### 1.5 Delete Student
**DELETE** `/api/siswa/{id}`

**Response:**
```json
{
  "success": true,
  "message": "Siswa berhasil dihapus"
}
```

---

## 2. Hobby API Endpoints

### 2.1 Get All Hobbies
**GET** `/api/hobby`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Reading",
      "siswas": [...]
    }
  ],
  "message": "Data hobi berhasil diambil"
}
```

### 2.2 Create Hobby
**POST** `/api/hobby`

**Request Body:**
```json
{
  "name": "Swimming"
}
```

**Validation Rules:**
- `name`: required, string, max 255 characters, unique

---

## 3. Phone API Endpoints

### 3.1 Get All Phones
**GET** `/api/phone`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number_phone": "081234567890",
      "siswa_id": 1,
      "siswa": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "message": "Data telepon berhasil diambil"
}
```

---

## 4. User Management API Endpoints

### 4.1 Get All Users
**GET** `/api/users`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "Users retrieved successfully",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "email_verified_at": "2024-01-01T00:00:00.000000Z",
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
      }
    ],
    "per_page": 10,
    "total": 1
  }
}
```

### 4.2 Create User
**POST** `/api/users`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Validation Rules:**
- `name`: required, string, max 255 characters
- `email`: required, string, email format, max 255 characters, unique
- `password`: required, string, min 8 characters, confirmed

**Response:**
```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "email_verified_at": null,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

### 4.3 Get Single User
**GET** `/api/users/{id}`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": "2024-01-01T00:00:00.000000Z",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

### 4.4 Update User
**PUT** `/api/users/{id}`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

**Validation Rules:**
- `name`: sometimes, required, string, max 255 characters
- `email`: sometimes, required, string, email format, max 255 characters, unique (except current user)
- `password`: sometimes, required, string, min 8 characters, confirmed

**Response:**
```json
{
  "status": "success",
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "email_verified_at": null,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

### 4.5 Delete User
**DELETE** `/api/users/{id}`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```

### 4.6 Search Users
**GET** `/api/users/search?query={search_term}`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "Search results",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "per_page": 10,
    "total": 1
  }
}
```

---

## 5. Profile API Endpoints

### 5.1 Get Current User Profile
**GET** `/api/profile`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": "2024-01-01T00:00:00.000000Z",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "profile": {
      "id": 1,
      "user_id": 1,
      "alamat": "Jl. Contoh No. 123",
      "kota": "Jakarta",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  }
}
```

### 5.2 Update Current User Profile
**PUT** `/api/profile`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "alamat": "Jl. Contoh No. 456",
  "kota": "Bandung"
}
```

**Validation Rules:**
- `name`: sometimes, required, string, max 255 characters
- `email`: sometimes, required, string, email format, max 255 characters, unique (except current user)
- `alamat`: sometimes, nullable, string, max 500 characters
- `kota`: sometimes, nullable, string, max 100 characters

**Response:**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "email_verified_at": null,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "profile": {
      "id": 1,
      "user_id": 1,
      "alamat": "Jl. Contoh No. 456",
      "kota": "Bandung",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  }
}
```

### 5.3 Change Password
**POST** `/api/profile/change-password`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Request Body:**
```json
{
  "current_password": "oldpassword123",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}
```

**Validation Rules:**
- `current_password`: required, string
- `new_password`: required, string, min 8 characters, confirmed
- `new_password_confirmation`: required, must match new_password

**Response:**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

### 5.4 Delete Account
**DELETE** `/api/profile`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Request Body:**
```json
{
  "password": "currentpassword123"
}
```

**Validation Rules:**
- `password`: required, string (current password for confirmation)

**Response:**
```json
{
  "status": "success",
  "message": "Account deleted successfully"
}
```

### 5.5 Get User Statistics
**GET** `/api/profile/statistics`

**Headers:** (Requires Authentication)
```
Authorization: Bearer {your_token}
```

**Response:**
```json
{
  "status": "success",
  "message": "Statistics retrieved successfully",
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified": true,
    "alamat": "Jl. Contoh No. 123",
    "kota": "Jakarta",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "total_logins": 0
  }
}
```

---

## Error Responses

### Authentication Errors

#### Login Failed (401)
```json
{
  "success": false,
  "message": "Email atau password salah"
}
```

#### Email Not Found (404)
```json
{
  "success": false,
  "message": "Email tidak ditemukan dalam sistem"
}
```

#### Email Already Verified (400)
```json
{
  "success": false,
  "message": "Email sudah terverifikasi"
}
```

#### Invalid Reset Token (400)
```json
{
  "success": false,
  "message": "Token reset password tidak valid atau sudah kadaluarsa"
}
```

### Validation Error (422)
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "name": ["The name field is required."],
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Siswa tidak ditemukan"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Terjadi kesalahan: Error message"
}
```

---

## Frontend Usage Examples

### Authentication Examples

#### Register User
```javascript
const response = await fetch('/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    password_confirmation: 'password123'
  })
});
const data = await response.json();
```

#### Login User
```javascript
const response = await fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const data = await response.json();
// Save token to localStorage
localStorage.setItem('token', data.data.token);
```

#### Forgot Password
```javascript
const response = await fetch('/api/forgot-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});
const data = await response.json();
```

#### Reset Password
```javascript
const response = await fetch('/api/reset-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token: 'reset_token_from_email',
    email: 'john@example.com',
    password: 'newpassword123',
    password_confirmation: 'newpassword123'
  })
});
const data = await response.json();
```

#### Logout User
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
// Remove token from localStorage
localStorage.removeItem('token');
```

#### Get Current User
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/user', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### Siswa API Examples

#### Get All Students
```javascript
const response = await fetch('/api/siswa', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

#### Create Student
```javascript
const response = await fetch('/api/siswa', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '081234567890',
    nisns: '1234567890',
    hobbies: [1, 2, 3]
  })
});
const data = await response.json();
```

#### Update Student
```javascript
const response = await fetch(`/api/siswa/${id}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe Updated',
    phone: '081234567890',
    nisns: '1234567890',
    hobbies: [1, 2, 3]
  })
});
const data = await response.json();
```

#### Delete Student
```javascript
const response = await fetch(`/api/siswa/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### User Management API Examples

#### Get All Users
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

#### Create User
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    password_confirmation: 'password123'
  })
});
const data = await response.json();
```

#### Update User
```javascript
const token = localStorage.getItem('token');
const response = await fetch(`/api/users/${id}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Updated',
    email: 'jane.updated@example.com',
    password: 'newpassword123',
    password_confirmation: 'newpassword123'
  })
});
const data = await response.json();
```

#### Delete User
```javascript
const token = localStorage.getItem('token');
const response = await fetch(`/api/users/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

#### Search Users
```javascript
const token = localStorage.getItem('token');
const query = 'john';
const response = await fetch(`/api/users/search?query=${query}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### Profile API Examples

#### Get Current User Profile
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

#### Update Profile
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Updated',
    email: 'john.updated@example.com',
    alamat: 'Jl. Contoh No. 456',
    kota: 'Bandung'
  })
});
const data = await response.json();
```

#### Change Password
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/profile/change-password', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    current_password: 'oldpassword123',
    new_password: 'newpassword123',
    new_password_confirmation: 'newpassword123'
  })
});
const data = await response.json();
```

#### Delete Account
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/profile', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password: 'currentpassword123'
  })
});
const data = await response.json();
```

#### Get User Statistics
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/profile/statistics', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### Axios Examples

#### Register User
```javascript
const response = await axios.post('/api/register', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
});
```

#### Login User
```javascript
const response = await axios.post('/api/login', {
  email: 'john@example.com',
  password: 'password123'
});
// Save token
localStorage.setItem('token', response.data.data.token);
```

#### Forgot Password
```javascript
const response = await axios.post('/api/forgot-password', {
  email: 'john@example.com'
});
```

#### Reset Password
```javascript
const response = await axios.post('/api/reset-password', {
  token: 'reset_token_from_email',
  email: 'john@example.com',
  password: 'newpassword123',
  password_confirmation: 'newpassword123'
});
```

#### Logout User
```javascript
const token = localStorage.getItem('token');
const response = await axios.post('/api/logout', {}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
localStorage.removeItem('token');
```

#### Get Current User
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('/api/user', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### User Management API Examples

#### Get All Users
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Create User
```javascript
const token = localStorage.getItem('token');
const response = await axios.post('/api/users', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'password123',
  password_confirmation: 'password123'
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Update User
```javascript
const token = localStorage.getItem('token');
const response = await axios.put(`/api/users/${id}`, {
  name: 'Jane Updated',
  email: 'jane.updated@example.com',
  password: 'newpassword123',
  password_confirmation: 'newpassword123'
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Delete User
```javascript
const token = localStorage.getItem('token');
const response = await axios.delete(`/api/users/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Search Users
```javascript
const token = localStorage.getItem('token');
const query = 'john';
const response = await axios.get(`/api/users/search?query=${query}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Profile API Examples

#### Get Current User Profile
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Update Profile
```javascript
const token = localStorage.getItem('token');
const response = await axios.put('/api/profile', {
  name: 'John Updated',
  email: 'john.updated@example.com',
  alamat: 'Jl. Contoh No. 456',
  kota: 'Bandung'
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Change Password
```javascript
const token = localStorage.getItem('token');
const response = await axios.post('/api/profile/change-password', {
  current_password: 'oldpassword123',
  new_password: 'newpassword123',
  new_password_confirmation: 'newpassword123'
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Delete Account
```javascript
const token = localStorage.getItem('token');
const response = await axios.delete('/api/profile', {
  data: {
    password: 'currentpassword123'
  },
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Get User Statistics
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('/api/profile/statistics', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Siswa API Examples

#### Get All Students
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('/api/siswa', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Create Student
```javascript
const token = localStorage.getItem('token');
const response = await axios.post('/api/siswa', {
  name: 'John Doe',
  phone: '081234567890',
  nisns: '1234567890',
  hobbies: [1, 2, 3]
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Important Notes

### Authentication
1. **Token Management**: Save token after login, include in all protected requests
2. **Email Verification**: Users must verify email after registration
3. **Password Reset**: Token expires after use, check email for reset link
4. **Logout**: Always remove token from localStorage on logout

### Siswa API
1. **Phone & NISN**: Each student can have multiple phone numbers and NISN numbers
2. **Hobbies**: Many-to-many relationship, use hobby IDs array
3. **Validation**: All fields are required for create/update operations
4. **Cascade Delete**: When deleting a student, all related phone, NISN, and hobby relationships are automatically deleted
5. **Unique Constraints**: Phone numbers and NISN numbers must be unique across the system

### User Management API
1. **Admin Access**: User management endpoints require authentication and are typically used by administrators
2. **Pagination**: User listing is paginated with 10 users per page
3. **Search**: Search functionality works on both name and email fields
4. **Email Verification**: When email is updated, email verification status is reset
5. **Password Updates**: Password changes require confirmation

### Profile API
1. **Current User Only**: Profile endpoints only work for the currently authenticated user
2. **Email Changes**: Changing email will reset email verification status
3. **Password Security**: Password changes require current password verification
4. **Account Deletion**: Account deletion requires password confirmation for security
5. **Statistics**: User statistics provide basic profile information and can be extended for additional metrics
6. **Profile Data**: Profile includes alamat (address) and kota (city) fields that are optional
7. **One-to-One Relationship**: Each user can have one profile, profile is automatically created when first updated

---

## Data Flow

1. **Create Student**: 
   - Create student record
   - Create phone record(s)
   - Create NISN record(s)
   - Attach hobbies via pivot table

2. **Update Student**:
   - Update student name
   - Delete existing phone/NISN records
   - Create new phone/NISN records
   - Detach old hobbies, attach new ones

3. **Delete Student**:
   - Delete all related phone records
   - Delete all related NISN records
   - Detach all hobby relationships
   - Delete student record 