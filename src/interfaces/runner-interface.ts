import { ObjectId } from 'mongoose';

import { Submit } from './submit-interface';
import { Test } from './test-interface';

export interface Runner{
  code: Submit;
  questions: Test[];
  userID: ObjectId;
  problemId: ObjectId;
};
