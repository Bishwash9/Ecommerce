
import { User } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//helper function to generate JWT tokens
export const generateTokens = (user: any) => {
    const accessToken = jwt.sign(
        {id: user._id,role: user.role},
        process.env.JWT_ACCESS_KEY!,
        {expiresIn: '15m'}  
    );

    const refreshToken = jwt.sign(
        {id: user._id},
        process.env.JWT_REFRESH_KEY!,
        {expiresIn: '7d'}
    );

    return {accessToken, refreshToken};
}

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

    const {accessToken, refreshToken} = generateTokens(user);

    user.refreshToken = user.refreshToken || [];
    user.refreshToken.push(refreshToken);
    await user.save();

    return {
       user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
       },
         accessToken,
         refreshToken
    };
};

// new service function to refresh access token
export const refreshAccessToken = async (incomingRefreshToken: string) => {
    
    //verify jwt using refresh key
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_KEY!) as {id: string};

    //find user by id
    const user = await User.findById(decoded.id);
    if(!user || !user.refreshToken.includes(incomingRefreshToken)) {
        throw new Error('Invalid refresh token');
    }

    //remove the used token 
    user.refreshToken = user.refreshToken.filter(token => token !== incomingRefreshToken);

    //generate new tokens
    const tokens = generateTokens(user);

    //save the new refresh token
    user.refreshToken.push(tokens.refreshToken);
    await user.save();

    return tokens; //return the new access token and refresh token
};

export const logoutUser = async (activeRefreshToken: string, userID: string) => {
    const user = await User.findById(userID);
    if(!user) {
        throw new Error('User not found');
    }

    user.refreshToken = user.refreshToken.filter(token => token !== activeRefreshToken);
    await user.save();

    return {message: 'Logged out successfully'};
}


