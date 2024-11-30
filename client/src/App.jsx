import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from './components/Auth';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import "./styles/main.css"
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
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;