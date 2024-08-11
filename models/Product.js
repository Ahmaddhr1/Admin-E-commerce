import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: { type: String , required:true },
    quantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
 })

 export const Product = mongoose.model("Product", productSchema);
