import { ObjectId, Schema } from 'mongoose';

import { CodeResult } from '../enums/code-result';
import { Output } from '../interfaces/output-interface';
import { Submit } from '../interfaces/submit-interface';

export interface Score{
  problemID: ObjectId;
  userID: ObjectId;
  submit: Submit;
  output: Output[],
  finalScore: number;
  finalStatus: CodeResult;
};

export const ScoreSchema = new Schema<Score>();
