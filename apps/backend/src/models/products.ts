import mongoose from 'mongoose';
const {Schema} = mongoose;

const productsSchema = new Schema( 
    {
        name: {
            type: String,
            required: true,
            maxlength: 100,
            minlength: 2
        },

        description: {
            type: String,
            required: true,
            maxlength: 1000,
            minlength: 10
        },

        price: {
            type: Number,
            required: true,
            validate: {
                validator: (value:number) => value > 0,
                message: 'Price must be a greater than 0' // we can also user min: 1 a built in validator but hehe lets be flexible
            }
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },

        stock: {
            type: Number,
            required: true,
            validate: {
                validator: (value:number) => value >= 0,
                message: 'Stock must be a non-negative number'
            }
        },

        images: [
            {
                type: String,
            },
        ],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const Products = mongoose.model('Products', productsSchema);

