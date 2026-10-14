import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema (
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
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        status: {
            type: String,
            enum:['pending', 'delivered', 'cancelled'],
            default: 'pending'
        }
    },

    {
        timestamps: true
    }
);

export const Order = mongoose.model('Order', orderSchema);