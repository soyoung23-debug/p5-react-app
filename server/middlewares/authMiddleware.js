import jwt from "jsonwebtoken";

// Use this to prevent logged-in users from hitting the Register/Login pages
const isAuthenticated = (req, res, next) => {
    if (req.cookies.myToken) {
        return res.status(400).json({ message: "You are already logged in!" });
    }
    next();
};

// Use this to protect private routes (like a Watchlist)
const isAllowed = (req, res, next) => {
    const token = req.cookies.myToken;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user data to the request so the next function can use it
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

export { isAuthenticated, isAllowed };