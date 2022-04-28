import { Schema } from 'mongoose';
import { Submit } from '../interfaces/submit-interface';
import { Test } from '../interfaces/test-interface';

export interface Problems {
  name: string; // name in url, from problem id
  title: string;
  owner_ID: string|undefined;
  content?: string;
  theInput?: string;
  theOutput?: string;
  sampleInput?: string;
  sampleOutput?: string;
  hint?: string|undefined;
  sampleCode: Submit;
  comment?: string; // ???
  judgeMode: string; // need an enum?
  test: Test[];
  difficulty: number; // need an enum?
  submitSum: number;// How many account tried
  clickSum: number;
  acSum: number;
  reference?: string[];
  tags?: string[];
  display: boolean;
  problemSettings?: {
    waVisible: boolean; // User will get the output.
  };
}

export const ProblemsSchema = new Schema<Problems>();
