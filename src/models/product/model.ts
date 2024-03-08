import { model } from 'mongoose';
import { ProductSchema } from './schema';
import { Product } from './type';

export const ProductModel = model<Product>('Product', ProductSchema);