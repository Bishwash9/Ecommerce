
import { User } from "../models/users.js";
import bcrypt from 'bcrypt';

export const registerUser = async (
  data:  {
     name: string;
     email: string;
     password: string;
    }
) => {
    const {name, email, password} = data;
    
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(password,10)

    const newUser = new User({
        name,
        email,
        password: hash
    });

    await newUser.save();
    
    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };

};

export const loginUser = async (
    data: {
        email: string;
        password: string;
    }
) => {
    const {email, password} = data;

    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Invalid email or password');
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};
