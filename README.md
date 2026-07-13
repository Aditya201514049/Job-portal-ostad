# Job Portal - Full Stack Application

A complete MERN stack Job Portal website where companies can post jobs and users can browse and apply for them.

## 🌟 Features

### For Job Seekers
- Browse and search job listings
- Filter jobs by type (Full-time, Part-time, Contract, Remote)
- View detailed job information
- Apply for jobs with one click
- Track application status (Pending, Accepted, Rejected)
- Manage user profile

### For Employers
- Post new job listings
- Manage posted jobs (Edit/Delete)
- View job applications
- Update company information

### General Features
- User authentication (Registration/Login)
- JWT-based secure authentication
- Responsive design with Tailwind CSS
- Role-based access control (Jobseeker/Employer)
- Duplicate application prevention
- Real-time application tracking

## 🛠️ Technologies Used

### Frontend
- **React.js** (v19.2.7) - UI Library
- **Tailwind CSS** (v4.3.2) - Styling
- **Zustand** (v5.0.14) - State Management
- **React Router DOM** (v7.18.1) - Routing
- **TanStack Query** (v5.101.2) - Data Fetching & Caching
- **React Hook Form** (v7.81.0) - Form Management
- **Axios** (v1.18.1) - HTTP Client
- **Vite** (v8.1.1) - Build Tool

### Backend
- **Node.js** - Runtime Environment
- **Express.js** (v5.2.1) - Web Framework
- **MongoDB** - Database
- **Mongoose** (v9.7.4) - ODM
- **JWT** (jsonwebtoken v9.0.3) - Authentication
- **bcryptjs** (v3.0.3) - Password Hashing
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing
- **Helmet** (v8.2.0) - Security Headers
- **Morgan** (v1.11.0) - HTTP Logger
- **dotenv** (v17.4.2) - Environment Variables

## 📁 Project Structure

```
Job-portal-ostad/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/       # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── job.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── application.controller.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Job.js
│   │   │   └── Application.js
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── job.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── application.routes.js
│   │   ├── services/           # Business logic
│   │   └── utils/              # Utility functions
│   ├── server.js               # Server entry point
│   ├── package.json
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── api/                # API service functions
│   │   │   ├── auth.api.js
│   │   │   ├── jobs.api.js
│   │   │   ├── users.api.js
│   │   │   └── applications.api.js
│   │   ├── components/
│   │   │   ├── auth/           # Auth components
│   │   │   ├── layout/         # Header, Footer, MainLayout
│   │   │   └── ui/             # Reusable UI components
│   │   ├── context/            # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Page components
│   │   │   ├── Home/
│   │   │   ├── Jobs/
│   │   │   ├── JobDetails/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Dashboard/
│   │   │   ├── Profile/
│   │   │   ├── CreateJob/
│   │   │   ├── EditJob/
│   │   │   ├── MyApplications/
│   │   │   ├── About/
│   │   │   └── Contact/
│   │   ├── store/              # Zustand store
│   │   │   └── authStore.js
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── .env                    # Environment variables
└── README.md                   # This file
```

## 🚀 Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobportal
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (protected)
- `PUT /api/jobs/:id` - Update job (protected)
- `DELETE /api/jobs/:id` - Delete job (protected)
- `GET /api/jobs/my-posts` - Get user's posted jobs (protected)

### Applications
- `POST /api/applications` - Apply for a job (protected)
- `GET /api/applications/my-applications` - Get user's applications (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## 👥 User Roles

### Jobseeker
- Browse and search jobs
- View job details
- Apply for jobs
- Track application status
- Update profile

### Employer
- Post new jobs
- Edit and delete own jobs
- View posted jobs
- Update profile

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid JWT token
- Tokens are sent in Authorization header as Bearer token

## 🎨 Pages

1. **Home** - Hero section, latest jobs, categories, features, statistics
2. **Jobs** - All jobs with search and filter functionality
3. **Job Details** - Complete job information with apply button
4. **Login** - User authentication
5. **Register** - User registration with role selection
6. **Dashboard** - Role-based dashboard (jobs or applications)
7. **Profile** - View and update user profile
8. **Create Job** - Post new job listing (employer only)
9. **Edit Job** - Update existing job (employer only)
10. **My Applications** - Track job applications (jobseeker only)
11. **About** - Information about the platform
12. **Contact** - Contact form and information

## 🌐 Deployment

### Frontend Deployment (Vercel)
1. Push frontend code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL` (your deployed backend URL)
4. Deploy

### Backend Deployment (Render/Railway)
1. Push backend code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `CLIENT_URL` - Your frontend URL
4. Deploy

## 🐛 Known Issues

- Job type filter includes "internship" option but backend schema supports: full-time, part-time, contract, remote
- Contact form currently logs to console (not connected to backend)

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a final assignment for MERN 14 course.

## 🙏 Acknowledgments

- Ostad for the learning opportunity
- The open-source community for the amazing tools and libraries
