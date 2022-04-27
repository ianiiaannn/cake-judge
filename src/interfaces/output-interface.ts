import { CodeResult } from '../enums/code-result';

export interface Output{
  status: CodeResult;
  memoryUseage: number;
  timeUseage: number;
}
