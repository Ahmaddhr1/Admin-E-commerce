import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    image: {
        type: String,
        required: true,
    }
})

export const Category = mongoose.Model("Category",categorySchema);