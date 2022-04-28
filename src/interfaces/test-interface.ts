// Test in problems

export interface Test {
  input: string[];
  output: string[];
  altOutput?: string[];
  timeLimit: number;
  memoryLimit: number;
  score: number;
  required: boolean;
}
