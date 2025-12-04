import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // CRITICAL: useLocation is added here
import { DataProvider, useData } from './context/DataContext';
import Layout from './components/Layout';
import Login from './components/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard'; 
import HODDashboard from './pages/HODDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Reservations from './pages/Reservations';
import Forum from './pages/Forum';
import Playground from './pages/Playground';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Ebooks from './pages/Ebooks';
import Schedule from './pages/Schedule';


// 🛑 1. DASHBOARD ROUTING HELPER (The Security Guard)
const DashboardRoute = () => {
  const { currentUser } = useData();
  if (!currentUser) return <Navigate to="/" />;
  
  // CRITICAL FIX: Convert role to lowercase to handle data entry errors (e.g., 'Faculty' instead of 'faculty')
  const role = currentUser.role ? currentUser.role.toLowerCase() : 'student'; 

  switch (role) {
    case 'faculty':
      return <Layout><FacultyDashboard /></Layout>;
    case 'hod':
      return <Layout><HODDashboard /></Layout>; 
    case 'admin':
      return <Layout><AdminDashboard /></Layout>; 
    case 'student':
    default:
      return <Layout><StudentDashboard /></Layout>;
  }
};

// 🛑 2. PROTECTED ROUTE (Global Access Check - Prevents URL Cheating)
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useData();
  const location = useLocation(); // Gets current URL path

  if (!currentUser) {
      return <Navigate to="/" />; // Not logged in
  }
  
  // Logic to block HOD/Admin from student features (Playground, Ebooks)
  const isManagement = currentUser.role === 'hod' || currentUser.role === 'admin';
  const restrictedPaths = ['/ebooks', '/playground']; // Add all student-focused pages here
  
  if (isManagement && restrictedPaths.includes(location.pathname)) {
      // Redirect to their respective dashboard if they try to cheat the URL
      return <Navigate to="/dashboard" replace />; 
  }

  return <Layout>{children}</Layout>;
};


export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Dashboard Route (Uses the specialized guard) */}
          <Route path="/dashboard" element={<DashboardRoute />} /> 
          
          {/* All other routes use the common Protected Guard */}
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path="/playground" element={<ProtectedRoute><Playground /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/ebooks" element={<ProtectedRoute><Ebooks /></ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}