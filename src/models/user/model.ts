import { model } from "mongoose";
import { UserSchema } from "./schema";
import { User } from "./type";

export const UserModel = model<User>('User', UserSchema);