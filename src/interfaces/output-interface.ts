import { CodeResult } from '../enums/code-result';

export interface Output{
  status: CodeResult;
  memoryUsage: number;
  timeUsage: number;
  outputDiff?: string;
}
