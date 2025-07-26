# Siswa Management System

A comprehensive student management system built with Next.js, featuring a modern responsive UI and full API integration.

## 🚀 Features

### Authentication System
- **User Registration & Login**: Secure authentication with Laravel Sanctum
- **Password Management**: Change password and password reset functionality
- **Email Verification**: Email verification system
- **Session Management**: Automatic token handling and session persistence

### Student Management
- **CRUD Operations**: Create, read, update, and delete student records
- **Search & Filter**: Advanced search and filtering capabilities
- **Data Validation**: Client-side and server-side validation
- **Responsive Cards**: Modern card-based student display

### Hobby Management
- **Hobby Categories**: Organized hobby management with categories
- **Difficulty Levels**: Easy, medium, and hard difficulty settings
- **Rich Descriptions**: Detailed hobby descriptions and metadata

### User Management (Admin)
- **User Administration**: Manage system users and permissions
- **User Search**: Advanced user search functionality
- **Pagination**: Efficient data pagination
- **Role Management**: User role and permission management

### Profile Management
- **Profile Settings**: Update personal information
- **Password Changes**: Secure password modification
- **Account Security**: Account deletion and security settings

### Dashboard & Analytics
- **Statistics Overview**: Real-time system statistics
- **Quick Actions**: Fast access to common operations
- **System Status**: API and database connection monitoring
- **Recent Activity**: Activity tracking and history

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects
- **Responsive Design**: Mobile-first responsive design

### API Integration
- **RESTful APIs**: Full CRUD operations
- **Laravel Sanctum**: Authentication system
- **Error Handling**: Comprehensive error management
- **Data Validation**: Client-side validation utilities

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Modern JavaScript**: ES6+ features

## 📁 Project Structure

```
nextsis/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and themes
│   │   ├── layout.js            # Root layout component
│   │   └── page.js              # Main application entry point
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.js     # User login component
│   │   │   └── RegisterForm.js  # User registration component
│   │   ├── Dashboard/
│   │   │   ├── DashboardLayout.js    # Main dashboard layout
│   │   │   ├── DashboardOverview.js  # Dashboard overview
│   │   │   ├── Header.js        # Application header
│   │   │   └── Sidebar.js       # Navigation sidebar
│   │   ├── Students/
│   │   │   ├── StudentsList.js  # Student management
│   │   │   └── StudentForm.js   # Student form component
│   │   ├── Hobbies/
│   │   │   ├── HobbiesList.js   # Hobby management
│   │   │   └── HobbyForm.js     # Hobby form component
│   │   ├── Users/
│   │   │   └── UsersList.js     # User administration
│   │   └── Profile/
│   │       └── ProfileSettings.js # Profile management
│   ├── services/
│   │   ├── apiService.js        # Main API service
│   │   ├── authApi.js           # Authentication API
│   │   ├── siswaApi.js          # Student API
│   │   ├── hobbyApi.js          # Hobby API
│   │   ├── phoneApi.js          # Phone API
│   │   ├── userApi.js           # User API
│   │   └── profileApi.js        # Profile API
│   ├── config/
│   │   └── api.js               # API configuration
│   ├── utils/
│   │   └── apiUtils.js          # Utility functions
│   └── examples/
│       └── apiUsage.js          # API usage examples
├── public/                      # Static assets
├── API_DOCUMENTATION.md         # API documentation
├── src/README_API.md           # API services documentation
└── README.md                   # This file
```

## 🎨 UI Features

### Design System
- **Dark Mode Support**: Automatic dark/light theme switching
- **Responsive Layout**: Mobile-first responsive design
- **Modern UI**: Clean, modern interface with smooth animations
- **Accessibility**: WCAG compliant design patterns

### Components
- **Authentication Forms**: Secure login and registration
- **Dashboard Cards**: Statistics and quick action cards
- **Data Tables**: Responsive data display
- **Modal Dialogs**: Form modals for data entry
- **Navigation**: Collapsible sidebar navigation
- **Search & Filter**: Advanced search functionality

### User Experience
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation
- **Success Feedback**: Confirmation messages
- **Responsive Design**: Works on all device sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Laravel backend with API endpoints

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextsis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API settings**
   - Update `src/config/api.js` with your API base URL
   - Ensure your Laravel backend is running

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will load with the authentication screen

## 📱 Usage

### Authentication
1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Session**: Automatic session management and token handling

### Dashboard
- **Overview**: View system statistics and quick actions
- **Navigation**: Use the sidebar to navigate between sections
- **Search**: Global search functionality in the header

### Student Management
1. **View Students**: Browse all student records
2. **Add Student**: Click "Add Student" to create new records
3. **Edit Student**: Click the edit button on any student card
4. **Delete Student**: Click the delete button to remove records
5. **Search & Filter**: Use search and hobby filters

### Hobby Management
1. **View Hobbies**: Browse all available hobbies
2. **Add Hobby**: Create new hobbies with categories and descriptions
3. **Edit Hobby**: Modify existing hobby information
4. **Search**: Find hobbies by name or description

### User Administration
1. **View Users**: Browse system users (admin only)
2. **Search Users**: Advanced user search functionality
3. **User Details**: View user information and status

### Profile Settings
1. **Update Profile**: Modify personal information
2. **Change Password**: Update account password
3. **Security Settings**: Account deletion options

## 🔧 Configuration

### API Configuration
Edit `src/config/api.js` to configure your API endpoints:

```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  // ... other configurations
};
```

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Siswa Manager
```

## 🧪 Testing

### Manual Testing
1. **Authentication Flow**: Test registration and login
2. **CRUD Operations**: Test all create, read, update, delete operations
3. **Responsive Design**: Test on different screen sizes
4. **Error Handling**: Test error scenarios and edge cases

### API Testing
Use the provided examples in `src/examples/apiUsage.js` to test API functionality.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
1. Configure production API endpoints
2. Set up environment variables
3. Configure CORS settings on your Laravel backend

## 📚 API Documentation

For detailed API documentation, see:
- `API_DOCUMENTATION.md` - Complete API specification
- `src/README_API.md` - API services implementation guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation
2. Review the API documentation
3. Open an issue on GitHub

---

**Siswa Management System** - A modern, responsive student management solution with full API integration and beautiful UI.
