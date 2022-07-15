import { ObjectId, Schema } from 'mongoose';

import { Language } from '../enums/languages';
import { Roles } from '../enums/roles';

export interface Users {
  username: string;// login name
  authHost?: string;
  displayName: string;// display name
  salt?: string;
  hash?: string; // hashed password
  schoolID?: number;
  vclassID?: number;// ?
  email: string;
  picture?: string; // pic url?
  comment?: string; // status bar?
  role: Roles;
  registerTime?: Date;
  registerIP?: string;
  lastLogin?: Date;
  ipSet?: string[];
  userLanguage?: string;
  codeLanguage?: Language;
  ac?: number;
  wa?: number;
  tle?: number;
  mle?: number;
  ole?: number;
  re?: number;
  ce?: number;
  se?: number;
  acList?: string[];
  triedList?: string[];
  submitList?: ObjectId[];
  import?: { any: any };
}

export const UsersSchema = new Schema<Users>();
