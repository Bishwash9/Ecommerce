import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema(
    {
   name : {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
        match: /^[a-zA-Z\s]+$/
   },
   email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        
   },
   password : {
        type: String,
        required: true
   },
   role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
   },
   
},
{
    timestamps: true
}

);

export const User = mongoose.model('User', userSchema);