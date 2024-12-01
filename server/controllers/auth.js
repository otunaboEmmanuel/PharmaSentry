import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
    const { username, email, password, name } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !name) {
        return res.status(400).json("All fields are required.");
    }

    // Check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    
    db.query(checkUserQuery, [username], async (err, data) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json("Internal server error.");
        }
        
        if (data.length) {
            return res.status(409).json("User  already exists!");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const insertUserQuery = "INSERT INTO users (username, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
        const values = [username, email, hashedPassword, name];

        db.query(insertUserQuery, values, (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json("Internal server error.");
            }
            return res.status(201).json("User  has been created.");
        });
    });
};

// Login a user
export const login = (req, res) => {
    const query = "SELECT * FROM users WHERE email = ?";
    
    db.query(query, [req.body.email], (err, data) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json("Internal server error.");
        }
        
        if (data.length === 0) {
            return res.status(404).json("User  not found!");
        }

        const user = data[0];
        console.log("User  data:", user); // Log the user data

        // Check if the password field exists
        if (!user.Password) {
            return res.status(500).json("Password not found in the database.");
        }

        // Compare the provided password with the hashed password
        const checkPassword = bcrypt.compareSync(req.body.password, user.Password);

        if (!checkPassword) {
            return res.status(400).json("Wrong password or username!");
        }

        const token = jwt.sign({ id: user.UserID }, "secretkey", { expiresIn: "1h" });

        const { password, ...others } = user;

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: "none" // Adjust based on your needs
        })
        .status(200)
        .json(others);
    });
};

// Logout a user
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true, // Set to true if using HTTPS
        sameSite: "none" // Adjust based on your needs
    }).status(200).json("User  has been logged out.");
};