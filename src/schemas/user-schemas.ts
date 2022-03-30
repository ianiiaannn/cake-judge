/* eslint-disable object-curly-spacing */
import { Schema, model } from 'mongoose';

interface User {
  name?: string;
  email?: string;
  salt?: string;
  hash?: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true},
});
export const UserModel = model<User>('User', UserSchema);
