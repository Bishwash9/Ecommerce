import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 2,
            unique: true
        },


    },
    {
        timestamps: true
    }
);

export const Category = mongoose.model('Category', categorySchema);