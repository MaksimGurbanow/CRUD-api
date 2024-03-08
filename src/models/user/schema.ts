import { Schema } from 'mongoose';
import { User } from './type';

export const UserSchema: Schema<User> = new Schema<User>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },

  age: {
    type: Number,
    required: [true, 'Please confirm you are older than 18'],
    validate: (age: number) => age >= 18,
  },

  email: {
    type: String,
    required: [true, 'Please provide an email'],
  }
})