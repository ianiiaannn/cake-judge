import { Schema } from 'mongoose';
import { Roles } from '../enums/roles';
import { Submit } from '../interfaces/submit-interface';

export interface Users {
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
  import?: { any: any };
}

export const UsersSchema = new Schema<Users>();
