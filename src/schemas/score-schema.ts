import { Schema } from 'mongoose';
import { CodeResult } from '../enums/code-result';
import { Output } from '../interfaces/output-interface';
import { Submit } from '../interfaces/submit-interface';

export interface Score{
  submit: Submit;
  score: number;
  output: Output[],
  finalScore: number;
  finalStatus: CodeResult;
};

export const ScoreSchema = new Schema<Score>();
