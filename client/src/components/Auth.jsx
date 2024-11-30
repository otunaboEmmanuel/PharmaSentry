import React, { createContext, useContext, useState } from 'react';

// Create an Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ role: 'Admin' }); // Default role for example

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};