// Stage types for KidsCoding app

import type { CommandType } from './programming';
import type { CharacterPosition } from './character';

export interface Stage {
  id: string;
  level: number;
  title: string;
  description: string;
  goalPosition: CharacterPosition;
  obstacles?: CharacterPosition[];
  requiredCommands: CommandType[];
  maxCommands?: number;
}

export interface StageProgress {
  stageId: string;
  completed: boolean;
  stars: number;
  bestCommandsCount?: number;
  attempts: number;
}
