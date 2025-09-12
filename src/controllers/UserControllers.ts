import { User } from "../model/userModel";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../utils/tokengenerator";
import bcrypt from "bcryptjs";

// SIGNUP FUNCTION (Register new user)
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username, userRole } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ 
        message: "Email, password, and username are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userRole: userRole || 'user'
    });

    // Save user to DB first
    await newUser.save();

    // Generate token after user is saved
    try {
      const token = generateAccessToken(newUser);
      newUser.accessToken = token;
      await newUser.save();
    } catch (tokenError) {
      console.log("Token generation failed, but user created successfully");
    }

    // Return success response
    return res.status(201).json({ 
      message: "User created successfully", 
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        userRole: newUser.userRole
      }
    });

  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong during signup" });
  }
};


// // GET ALL USERS FUNCTION
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const users = await User.find();
    
    return res.status(200).json({ 
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      users: users
    });

  } catch (error: any) {
    console.error("Get all users error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Something went wrong while fetching users" 
    });
  }
}