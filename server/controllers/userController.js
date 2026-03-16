import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Registration
const register = async (req, res) => {
    console.log("Register hit with body:", req.body)
    try {
        const { name, username, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: "Username already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Successfully registered" });
    } catch (error) {
        res.status(500).json({ error: "Server error during registration" });
    }
}

// Log in
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        // Generic error message for security (don't tell them if the user exists or not)
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate token with ONLY the ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Set Cookie
        res.cookie("myToken", token, {
            httpOnly: true,
            secure: false, // Must be false for localhost
            sameSite: "lax", 
            maxAge: 24 * 60 * 60 * 1000 
        })
            .status(200)
            .json({ message: 'Logged in successfully', user });

    } catch (error) {
        res.status(500).json({ error: "Server error during login" });
    }
};

// Log out
const logout = async (req, res) => {
    res.clearCookie("myToken", {
        httpOnly: true,
        sameSite: "strict",
    });
    res.json({ message: "Logout successful!" });
}

export { register, login, logout };