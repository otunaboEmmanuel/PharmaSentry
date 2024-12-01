import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from './components/Auth';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import "./styles/main.css"
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Resources from './pages/Resources';
import Settings from "./pages/Settings";
import Profile from "./pages/Profile"

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/reports" element={<Reports sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/settings" element={<Settings sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/profile" element={<Profile sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/notifications" element={<Notifications sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/resources" element={<Resources sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;