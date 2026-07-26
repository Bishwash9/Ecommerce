import mongoose, { Types } from 'mongoose';
const {Schema} = mongoose;

//define the shape of populated category
export interface ICategory {
    _id: mongoose.Types.ObjectId;
    name: string;
}

interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId | ICategory; // can be either before/after populate
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productsSchema = new Schema<IProduct>( 
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

