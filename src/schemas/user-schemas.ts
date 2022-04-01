/* eslint-disable object-curly-spacing */
import { Schema, model } from 'mongoose';
import { Roles } from '../enums/roles';
import { Submit } from './submit-interface';

interface User {
  account: string;// login name
  authHost?: string;
  username: string;// display name
  salt?: string;
  hash?: string;
  schoolID?: number;
  vclassID?: number;// ?
  email: string;
  picture?: string; // pic url?
  comment?: string; // status bar?
  role: Roles;
  registerTime?: Date;
  lastLogin?: Date;
  ipSet?: [string];
  userLanguage?: string;
  ac?: number;
  wa?: number;
  tle?: number;
  mle?: number;
  ole?: number;
  re?: number;
  ce?: number;
  se?: number;
  submit?: [Submit];
  import?: { any: any};
}

const UserSchema = new Schema<User>();

export const UserModel = model<User>('User', UserSchema);
