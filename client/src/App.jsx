import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from './components/Auth';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import "./styles/main.css"
import Resources from './pages/Resources';
import Settings from "./pages/Settings";
import Profile from "./pages/Profile"
import PatientManagement from './pages/PatientManagement';
import TreatmentSessions from './pages/TreatmentSessions';
import Emergencies from './pages/Emergencies';

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
          <Route path="/settings" element={<Settings sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/treatments" element={<TreatmentSessions sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/profile" element={<Profile sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/drug-management" element={<Emergencies sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/resources" element={<Resources sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/patient" element={<PatientManagement sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;