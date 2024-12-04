import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

// Handle POST request for registration
router.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const newUser  = await register(userData); // Assuming register is a function that handles user registration
        return res.status(201).json({ message: "User  successfully registered", user: newUser  });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user", error });
    }
});

// Handle POST request for login
router.post("/login", async (req, res) => {
    const credentials = req.body;

    try {
        const user = login(credentials); // Assuming login is a function that handles user login
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({ message: "User  successfully logged in", user });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
});

// Handle POST request for logout
router.post("/logout", async (req, res) => {
    try {
        logout(req.body); // Assuming logout is a function that handles user logout
        return res.status(200).json({ message: "User  successfully logged out" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out", error });
    }
});

export default router;