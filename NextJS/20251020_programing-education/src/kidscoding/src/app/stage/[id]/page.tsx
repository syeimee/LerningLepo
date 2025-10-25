'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { SimpleHeader } from '@/components/ui/SimpleHeader';
import { CommandPalette } from '@/components/programming/CommandPalette';
import { ProgramArea } from '@/components/programming/ProgramArea';
import { GridBoard } from '@/components/game/GridBoard';
import { CelebrationModal } from '@/components/ui/CelebrationModal';
import { IdleGuidanceOverlay } from '@/components/tutorial/IdleGuidanceOverlay';
import { ProgramExecutor } from '@/lib/programming/ProgramExecutor';
import { getStageConfig, STAGES } from '@/config/stages';
import { completeStage } from '@/lib/progress';
import type { Command, CommandType } from '@/types/programming';
import type { CharacterPosition } from '@/types/character';

// Generate goal position based on stage distance (minimum steps required)
const generateGoalForStage = (minSteps: number): CharacterPosition => {
  // Pre-defined goal positions based on minimum steps
  const goalsByDistance: Record<number, CharacterPosition[]> = {
    1: [
      { x: 1, y: 0, z: 0 },   // 1 step right
      { x: -1, y: 0, z: 0 },  // 1 step left
      { x: 0, y: 0, z: 1 },   // 1 step forward
      { x: 0, y: 0, z: -1 },  // 1 step backward
    ],
    2: [
      { x: 2, y: 0, z: 0 },   // 2 steps right
      { x: 1, y: 0, z: 1 },   // right + forward
      { x: 1, y: 0, z: -1 },  // right + backward
      { x: -1, y: 0, z: 1 },  // left + forward
      { x: -1, y: 0, z: -1 }, // left + backward
    ],
    3: [
      { x: 2, y: 0, z: 1 },   // 2 right + 1 forward
      { x: 2, y: 0, z: -1 },  // 2 right + 1 backward
      { x: 1, y: 0, z: 2 },   // 1 right + 2 forward
      { x: -1, y: 0, z: 2 },  // 1 left + 2 forward
      { x: -2, y: 0, z: 1 },  // 2 left + 1 forward
    ],
  };

  // Get available goals for this distance
  const availableGoals = goalsByDistance[minSteps] || goalsByDistance[1];

  // Pick a random goal from available options
  const randomIndex = Math.floor(Math.random() * availableGoals.length);
  return availableGoals[randomIndex];
};

export default function StagePage() {
  const params = useParams();
  const stageId = params?.id as string;
  const router = useRouter();
  const stageConfig = getStageConfig(stageId);
  const [commands, setCommands] = useState<Command[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [characterPosition, setCharacterPosition] = useState<CharacterPosition>({ x: 0, y: 0, z: 0 });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [goalPosition, setGoalPosition] = useState<CharacterPosition>({ x: 0, y: 0, z: 0 });
  const [showIdleGuidance, setShowIdleGuidance] = useState<boolean>(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectsRef = useRef<{
    walk?: HTMLAudioElement;
    drop?: HTMLAudioElement;
    buttonClick?: HTMLAudioElement;
    celebrate?: HTMLAudioElement;
    fail?: HTMLAudioElement;
  }>({});

  // Generate initial goal position based on stage config
  useEffect(() => {
    const config = getStageConfig(stageId);
    if (config) {
      setGoalPosition(generateGoalForStage(config.goalDistance));
    } else {
      // Fallback to stage 1 if config not found
      setGoalPosition(generateGoalForStage(1));
    }
  }, [stageId]);

  // Helper function to play sound effects (prevents overlapping)
  const playSound = (soundName: 'walk' | 'drop' | 'buttonClick' | 'celebrate' | 'fail', volume: number = 0.5) => {
    try {
      // If sound doesn't exist, create it
      if (!soundEffectsRef.current[soundName]) {
        const soundPaths = {
          walk: '/sounds/walk.mp3',
          drop: '/sounds/drop.mp3',
          buttonClick: '/sounds/button-click.mp3',
          celebrate: '/sounds/celebrate.mp3',
          fail: '/sounds/fail.mp3',
        };
        const audio = new Audio(soundPaths[soundName]);
        audio.volume = volume;
        soundEffectsRef.current[soundName] = audio;
      }

      const audio = soundEffectsRef.current[soundName];
      if (audio) {
        // Stop and reset if already playing
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(() => {});
      }
    } catch {}
  };

  // Setup and play background music
  useEffect(() => {
    // Create audio element for BGM
    const bgm = new Audio('/sounds/bgm-stage.mp3');
    bgm.loop = true;
    bgm.volume = 0.3; // Set volume to 30%
    bgmRef.current = bgm;

    // Play BGM (with error handling for autoplay restrictions)
    const playBGM = () => {
      bgm.play().catch((error) => {
        console.log('BGM autoplay prevented:', error);
        // Add click listener to start BGM on first user interaction
        const startBGM = () => {
          bgm.play().catch(() => {});
          document.removeEventListener('click', startBGM);
        };
        document.addEventListener('click', startBGM);
      });
    };

    playBGM();

    // Cleanup: stop BGM when component unmounts
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  // Reset idle timer - called on any user interaction
  const resetIdleTimer = () => {
    // Hide guidance if it's showing
    if (showIdleGuidance) {
      setShowIdleGuidance(false);
    }

    // Clear existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Start new timer for 3 seconds
    idleTimerRef.current = setTimeout(() => {
      // Only show if not executing and no modals are open
      if (!isExecuting && !showCelebration) {
        setShowIdleGuidance(true);
      }
    }, 3000);
  };

  // Start idle timer on mount and when dependencies change
  useEffect(() => {
    resetIdleTimer();

    // Cleanup on unmount
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [isExecuting, showCelebration]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
    resetIdleTimer();
  };

  // Helper function to find a command by ID in nested structure
  const findCommandInTree = (commandId: string, commandsList: Command[]): { command: Command; parent: Command | null } | null => {
    for (const cmd of commandsList) {
      if (cmd.id === commandId) {
        return { command: cmd, parent: null };
      }
      if (cmd.params?.children) {
        const found = findCommandInTree(commandId, cmd.params.children);
        if (found) {
          return { command: found.command, parent: cmd };
        }
      }
    }
    return null;
  };

  // Helper function to remove a command from nested structure
  const removeCommandFromTree = (commandId: string, commandsList: Command[]): Command[] => {
    return commandsList
      .filter(cmd => cmd.id !== commandId)
      .map(cmd => {
        if (cmd.params?.children) {
          return {
            ...cmd,
            params: {
              ...cmd.params,
              children: removeCommandFromTree(commandId, cmd.params.children),
            },
          };
        }
        return cmd;
      });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    resetIdleTimer();

    if (!over) return;

    // Check if dragging from palette
    const isPaletteItem = typeof active.id === 'string' && active.id.startsWith('palette-');

    // Check if dropping into a loop block's children area
    const isDropIntoLoop = typeof over.id === 'string' && over.id.endsWith('-children');

    // Check if dropping into main program area
    const isDropIntoMainArea = over.id === 'program-area';

    if (isPaletteItem) {
      // Add new block from palette
      const commandType = active.data.current?.type as CommandType;
      if (commandType) {
        const newCommand: Command = {
          id: `cmd-${Date.now()}-${Math.random()}`,
          type: commandType,
          // Set default params for loop blocks
          ...(commandType === 'loop' && {
            params: {
              count: 2, // Default: repeat 2 times
              children: [],
            },
          }),
          // Set default params for if blocks
          ...(commandType === 'if' && {
            params: {
              condition: 'obstacle', // Default condition
              children: [],
            },
          }),
        };

        if (isDropIntoLoop) {
          // Extract parent loop command ID from over.id (format: "cmd-xxx-children")
          const parentId = (over.id as string).replace('-children', '');

          // Add block to parent loop's children
          const updatedCommands = commands.map((cmd) => {
            if (cmd.id === parentId) {
              return {
                ...cmd,
                params: {
                  ...cmd.params,
                  children: [...(cmd.params?.children || []), newCommand],
                },
              };
            }
            return cmd;
          });
          setCommands(updatedCommands);
        } else if (isDropIntoMainArea) {
          // Dropping into empty main program area
          setCommands([...commands, newCommand]);
        } else {
          // Dropping near an existing block in main area
          const overIndex = commands.findIndex((cmd) => cmd.id === over.id);
          if (overIndex !== -1) {
            // Insert after the block we're hovering over
            const newCommands = [...commands];
            newCommands.splice(overIndex + 1, 0, newCommand);
            setCommands(newCommands);
          } else {
            // Fallback: add to end
            setCommands([...commands, newCommand]);
          }
        }

        // Play sound effect
        playSound('drop', 0.4);
      }
    } else {
      // Moving existing block
      // First, try to find the block in the tree (could be nested)
      const foundBlock = findCommandInTree(active.id as string, commands);

      if (!foundBlock) return;

      if (isDropIntoLoop) {
        // Moving block into a loop's children
        const parentId = (over.id as string).replace('-children', '');

        // Remove from current position
        const commandsWithoutMoved = removeCommandFromTree(active.id as string, commands);

        // Add to parent loop's children
        const updatedCommands = commandsWithoutMoved.map((cmd) => {
          if (cmd.id === parentId) {
            return {
              ...cmd,
              params: {
                ...cmd.params,
                children: [...(cmd.params?.children || []), foundBlock.command],
              },
            };
          }
          return cmd;
        });

        setCommands(updatedCommands);
        playSound('drop', 0.4);
      } else if (isDropIntoMainArea) {
        // Moving block to main area (possibly from inside a loop)
        if (foundBlock.parent) {
          // Block is coming from inside a loop - move it out
          const commandsWithoutMoved = removeCommandFromTree(active.id as string, commands);
          setCommands([...commandsWithoutMoved, foundBlock.command]);
          playSound('drop', 0.4);
        }
        // If parent is null, block is already in main area, no-op
      } else if (active.id !== over.id) {
        // Reorder existing blocks in main area
        const oldIndex = commands.findIndex((cmd) => cmd.id === active.id);
        const newIndex = commands.findIndex((cmd) => cmd.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newCommands = [...commands];
          const [movedItem] = newCommands.splice(oldIndex, 1);
          newCommands.splice(newIndex, 0, movedItem);

          setCommands(newCommands);

          // Play sound effect
          playSound('drop', 0.4);
        }
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleReset = () => {
    // Play button click sound
    playSound('buttonClick', 0.5);

    // Clear any ongoing animations
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setCommands([]);
    setCharacterPosition({ x: 0, y: 0, z: 0 });
    setIsExecuting(false);
    setShowCelebration(false);
    // Generate new goal position based on stage config
    const config = getStageConfig(stageId);
    if (config) {
      setGoalPosition(generateGoalForStage(config.goalDistance));
    }
    resetIdleTimer();
  };

  const handleExecute = async () => {
    if (isExecuting || commands.length === 0) return;

    // Play button click sound
    playSound('buttonClick', 0.5);

    setIsExecuting(true);
    resetIdleTimer();

    // Reset character to start position before executing
    setCharacterPosition({ x: 0, y: 0, z: 0 });

    // Wait a frame for the position reset to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create executor instance with start position
    const executor = new ProgramExecutor({ x: 0, y: 0, z: 0 }, 0);

    // Get execution steps
    const steps = executor.execute(commands);

    // Execute each step with animation
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      // Update character state
      setCharacterPosition(step.position);

      // Play sound effect for movement
      if (step.animation === 'walk') {
        playSound('walk', 0.4);
      }

      // Wait for animation duration
      await new Promise<void>((resolve) => {
        animationTimeoutRef.current = setTimeout(() => {
          resolve();
        }, step.duration);
      });
    }

    // Check if goal reached (get final position from last step)
    const finalPosition = steps.length > 0 ? steps[steps.length - 1].position : characterPosition;
    const reachedGoal = ProgramExecutor.isAtGoal(finalPosition, goalPosition);

    if (reachedGoal) {
      // Calculate stars based on programming concepts used
      const earnedStars = calculateStars(commands);

      // Save progress with earned stars
      completeStage(stageId, earnedStars);

      // Show celebration modal
      setShowCelebration(true);
      playSound('celebrate', 0.6);
    } else {
      playSound('fail', 0.5);
    }

    setIsExecuting(false);
  };

  // Calculate stars based on programming concepts used
  const calculateStars = (usedCommands: Command[]): number => {
    const commandTypes = new Set(usedCommands.map(cmd => cmd.type));

    let stars = 0;

    // ⭐1: 順次処理 (Basic sequential commands)
    const hasSequential = commandTypes.has('forward') ||
                         commandTypes.has('backward') ||
                         commandTypes.has('left') ||
                         commandTypes.has('right');
    if (hasSequential) {
      stars = 1;
    }

    // ⭐2: 繰り返し (Loop)
    if (commandTypes.has('loop')) {
      stars = 2;
    }

    // ⭐3: 条件分岐 (Conditional)
    if (commandTypes.has('if')) {
      stars = 3;
    }

    return stars;
  };

  const handleNextStage = () => {
    const currentStageIndex = STAGES.findIndex((s) => s.id === stageId);
    if (currentStageIndex >= 0 && currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1];
      router.push(`/stage/${nextStage.id}`);
    }
  };

  const hasNextStage = () => {
    const currentStageIndex = STAGES.findIndex((s) => s.id === stageId);
    return currentStageIndex >= 0 && currentStageIndex < STAGES.length - 1;
  };

  return (
    <div className="h-screen bg-[var(--color-gray-50)] flex flex-col overflow-hidden">
      <SimpleHeader
        showBackButton
        onBackClick={() => router.push('/')}
      />

      {/* Idle Guidance Overlay */}
      <IdleGuidanceOverlay isVisible={showIdleGuidance} />

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onRetry={handleReset}
        onNextStage={handleNextStage}
        hasNextStage={hasNextStage()}
      />

      <DndContext
        id="stage-dnd-context"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Main content area - 左右分割レイアウト */}
        <main className="flex-1 flex flex-row pt-16 md:pt-20 pb-4 px-4 gap-3 overflow-hidden">
          {/* Left: Game Board (2D Grid) */}
          <div className="flex-[2] bg-gradient-to-b from-purple-100 to-purple-50 rounded-[24px] shadow-inner relative overflow-hidden p-4">
            <GridBoard
              characterPosition={characterPosition}
              goalPosition={goalPosition}
              gridSize={5}
              cellSize={80}
            />

            {/* Control buttons overlay */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 15 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4"
            >
              {/* Play/Pause Button */}
              <motion.button
                onClick={handleExecute}
                disabled={commands.length === 0 || isExecuting}
                whileHover={commands.length > 0 && !isExecuting ? { scale: 1.15, rotate: 5 } : {}}
                whileTap={commands.length > 0 && !isExecuting ? { scale: 0.9 } : {}}
                animate={isExecuting ? { scale: [1, 1.05, 1] } : {}}
                transition={isExecuting ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 300, damping: 15 }}
                className={`
                  w-20 h-20 md:w-24 md:h-24
                  rounded-full
                  flex items-center justify-center
                  shadow-[0_8px_16px_rgba(0,0,0,0.2),0_4px_8px_rgba(33,150,243,0.3)]
                  ${commands.length === 0 || isExecuting
                    ? 'bg-gradient-to-b from-gray-300 to-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-b from-[var(--color-primary-400)] to-[var(--color-primary-600)] hover:from-[var(--color-primary-500)] hover:to-[var(--color-primary-700)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(33,150,243,0.5)]'
                  }
                `}
              >
                <motion.span
                  animate={!isExecuting && commands.length > 0 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[48px] md:text-[56px] text-white drop-shadow-lg"
                >
                  {isExecuting ? '⏸' : '▶'}
                </motion.span>
              </motion.button>

              {/* Reset Button */}
              <motion.button
                onClick={handleReset}
                disabled={isExecuting}
                whileHover={!isExecuting ? { scale: 1.15, rotate: -180 } : {}}
                whileTap={!isExecuting ? { scale: 0.9 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`
                  w-16 h-16 md:w-20 md:h-20
                  rounded-full
                  flex items-center justify-center
                  shadow-[0_6px_12px_rgba(0,0,0,0.15)]
                  ${isExecuting
                    ? 'bg-gradient-to-b from-gray-300 to-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-b from-white to-gray-100 border-4 border-[var(--color-primary-500)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]'
                  }
                `}
              >
                <span className="text-[36px] md:text-[40px] text-[var(--color-primary-600)] drop-shadow-sm">
                  ↺
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Command Selection Area */}
          <div className="flex-[1] flex flex-col gap-3 overflow-hidden">
            {/* Command Palette */}
            <div className="flex-shrink-0">
              <CommandPalette availableCommands={stageConfig?.availableCommands || ['forward', 'backward', 'left', 'right']} />
            </div>

            {/* Program Area */}
            <div className="flex-1 overflow-y-auto">
              <ProgramArea commands={commands} onCommandsChange={setCommands} />
            </div>
          </div>
        </main>

        <DragOverlay>
          {activeId ? (
            <div className="min-w-[80px] min-h-[80px] rounded-[16px] border-4 bg-white shadow-lg flex items-center justify-center text-[48px] opacity-90">
              {/* Drag preview */}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
