import { NextFunction, Request, Response } from "express";
import { loggedInUser, registerNewUser } from "./user.services";

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({message: "All fields are required"})
        }
        const user = await registerNewUser(username, email, password);

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        next(error)
    }
}

// user login

export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!email ||!password ) {
            res.status(400).json({message: "Email and password are required."});
            return;
        }
        const {user, token} = await loggedInUser(email, password);

        res.status(201).json({
            message: "User login successfully done!",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        })

        
    } catch (error) {
        next(error)
    }
}
