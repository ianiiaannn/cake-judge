// Test in problems

export interface Test {
  input: string[];
  output: string[];
  altOutput?: string[];
  timeLimit: number; // ms
  memoryLimit: number;
  score: number;
  required: boolean;
}
