import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import MyApplications from './pages/MyApplications';
import About from './pages/About';
import Contact from './pages/Contact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
            <Route path="/jobs/:id" element={<MainLayout><JobDetails /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
            
            {/* Public Routes (redirect if authenticated) */}
            <Route path="/login" element={<PublicRoute><MainLayout><Login /></MainLayout></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><MainLayout><Register /></MainLayout></PublicRoute>} />
            
            {/* Protected Routes (require authentication) */}
            <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            <Route path="/jobs/create" element={<ProtectedRoute><MainLayout><CreateJob /></MainLayout></ProtectedRoute>} />
            <Route path="/jobs/:id/edit" element={<ProtectedRoute><MainLayout><EditJob /></MainLayout></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute><MainLayout><MyApplications /></MainLayout></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
