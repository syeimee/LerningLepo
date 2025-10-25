export interface StageProgress {
  stageId: string;
  completed: boolean;
  stars: number; // 0-3 stars
  completedAt?: string;
}

export interface GameProgress {
  stages: Record<string, StageProgress>;
  currentStage: string;
}

const STORAGE_KEY = 'kidscoding_progress';

// Get all progress from localStorage
export const getProgress = (): GameProgress => {
  if (typeof window === 'undefined') {
    return { stages: {}, currentStage: '1' };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress:', error);
  }

  return { stages: {}, currentStage: '1' };
};

// Save progress to localStorage
export const saveProgress = (progress: GameProgress): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Mark a stage as completed
export const completeStage = (stageId: string, stars: number = 1): void => {
  const progress = getProgress();

  // Only update stars if new stars are higher than existing
  const existingStars = progress.stages[stageId]?.stars || 0;
  const finalStars = Math.max(existingStars, stars);

  progress.stages[stageId] = {
    stageId,
    completed: true,
    stars: finalStars,
    completedAt: new Date().toISOString(),
  };

  // Update current stage to next stage
  const nextStageNumber = parseInt(stageId) + 1;
  progress.currentStage = nextStageNumber.toString();

  saveProgress(progress);
};

// Check if a stage is completed
export const isStageCompleted = (stageId: string): boolean => {
  const progress = getProgress();
  return progress.stages[stageId]?.completed || false;
};

// Get stars for a stage
export const getStageStars = (stageId: string): number => {
  const progress = getProgress();
  return progress.stages[stageId]?.stars || 0;
};

// Reset all progress (for testing)
export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};
