// Programming types for KidsCoding app

export type CommandType = 'forward' | 'backward' | 'left' | 'right' | 'loop' | 'if';

export interface Command {
  id: string;
  type: CommandType;
  params?: {
    count?: number;        // Loop iterations
    condition?: string;    // Conditional logic
    children?: Command[];  // Nested commands
  };
}

export interface ProgramState {
  commands: Command[];
  isRunning: boolean;
  currentStep: number;
}
