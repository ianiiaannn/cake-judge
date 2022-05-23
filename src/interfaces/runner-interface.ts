import { Submit } from './submit-interface';
import { Test } from './test-interface';

export interface Runner{
  code: Submit;
  questions: Test[];
  user: string;
};
