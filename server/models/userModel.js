import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true, // This ensures no two people can have the same username
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Model from the Schema
const User = mongoose.model("User", userSchema);

export default User;