import { Schema } from 'mongoose';
import { Product } from './type';
export const ProductSchema: Schema<Product> = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    required: false,
    default: 'No description',
  },

  img: {
    type: String,
    required: false,
    default: 'No image',
  }
})