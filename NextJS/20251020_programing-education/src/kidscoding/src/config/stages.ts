export interface StageConfig {
  id: string;
  level: number;
  title: string;
  description: string;
  gridSize: number;
  goalDistance: number; // Number of steps required to reach goal
  availableCommands: ('forward' | 'backward' | 'left' | 'right' | 'loop' | 'if')[];
}

export const STAGES: StageConfig[] = [
  {
    id: '1',
    level: 1,
    title: 'ステージ1',
    description: '⭐順次処理 - やじるしでゴールへ！',
    gridSize: 5,
    goalDistance: 1, // 1 step - easy for learning sequential commands
    availableCommands: ['forward', 'backward', 'left', 'right'],
  },
  {
    id: '2',
    level: 2,
    title: 'ステージ2',
    description: '⭐⭐繰り返し - ちょっとむずかしい！',
    gridSize: 5,
    goalDistance: 2, // 2-3 steps - medium difficulty
    availableCommands: ['forward', 'backward', 'left', 'right', 'loop'],
  },
  {
    id: '3',
    level: 3,
    title: 'ステージ3',
    description: '⭐⭐⭐条件分岐 - とってもむずかしい！',
    gridSize: 5,
    goalDistance: 3, // 3-4 steps - harder
    availableCommands: ['forward', 'backward', 'left', 'right', 'loop', 'if'],
  },
];

export const getStageConfig = (stageId: string): StageConfig | undefined => {
  return STAGES.find((stage) => stage.id === stageId);
};
