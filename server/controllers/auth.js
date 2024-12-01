import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
    const { username, email, password, name } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !name) {
        return res.status(400).json("All fields are required.");
    }

    // Check if user already exists
    const q = "SELECT * FROM users WHERE username = ?";
    
    db.query(q, [username], async (err, data) => {
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
        const q = "INSERT INTO users (username, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
        const values = [username, email, hashedPassword, name];

        db.query(q, values, (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json("Internal server error.");
            }
            return res.status(201).json("User  has been created.");
        });
    });
};

//LOGIN
export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?"; // Change this line
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User  not found!");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if (!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others);
    });
}

//LOGOUT
export const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.")
}