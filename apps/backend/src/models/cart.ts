import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    validate: {
                        validator: (value:number) => value > 0,
                        message: 'Quantity must be greater than 0'
                    }
                },
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Cart = mongoose.model('Cart', cartSchema);