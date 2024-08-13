import mongoose, { models } from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: {
    type: [String],
    required: true,
    default: [],
  },
  quantity: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

export const Product = models.Product || mongoose.model('Product', productSchema);
