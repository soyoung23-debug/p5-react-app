import express from "express";
import { register, login, logout } from "../controllers/userController.js";
import { isAuthenticated, isAllowed } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define your endpoints
router.post("/register", register);
router.post("/login", login);


// Member-only routes 
router.get("/logout", isAllowed, logout);
router.get("/profile", isAllowed, (req, res) => {
    res.json({ message: "Welcome to your private profile!", user: req.user });
}); 

export default router;