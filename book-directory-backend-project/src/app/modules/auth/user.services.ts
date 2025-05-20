import { User } from "./user.model"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { config } from "../../config";

export const registerNewUser = async (username: string, email: string, password: string) => {
    const existingUser = await User.findOne({ $or: [{email}, {username}]});
    if(existingUser) {
        throw new Error("User with this email or username already exists.")
    }

    const hasededPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({
        username,
        email,
        password: hasededPassword
    })
    await user.save();
    return user;

}


export const loggedInUser = async (email:string, password: string) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Invalid email or password. User not found!")
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid password")
    }

    const token = jwt.sign({
       userId: user._id,
       role: user.role
      }, config.jwt_secret as string, { expiresIn: '1h' });

      return {
        user, token
      }
}
