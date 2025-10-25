'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CharacterPosition } from '@/types/character';

interface GridBoardProps {
  characterPosition: CharacterPosition;
  goalPosition: CharacterPosition;
  gridSize?: number;
  cellSize?: number;
}

export const GridBoard: React.FC<GridBoardProps> = ({
  characterPosition,
  goalPosition,
  gridSize = 5,
  cellSize = 80,
}) => {
  // Convert 3D coordinates to grid coordinates (center is 0,0)
  // Z-axis: positive Z = up on screen, negative Z = down on screen
  const charGridX = Math.round(characterPosition.x) + Math.floor(gridSize / 2);
  const charGridZ = Math.floor(gridSize / 2) - Math.round(characterPosition.z);
  const goalGridX = Math.round(goalPosition.x) + Math.floor(gridSize / 2);
  const goalGridZ = Math.floor(gridSize / 2) - Math.round(goalPosition.z);

  // Create grid cells (top to bottom, left to right)
  const cells = [];
  for (let z = 0; z < gridSize; z++) {
    for (let x = 0; x < gridSize; x++) {
      const isCharacter = x === charGridX && z === charGridZ;
      const isGoal = x === goalGridX && z === goalGridZ;

      cells.push(
        <motion.div
          key={`${x}-${z}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (z * gridSize + x) * 0.02, duration: 0.3 }}
          className={`
            relative
            border-4
            transition-all duration-300
            ${isCharacter
              ? 'bg-gradient-to-br from-yellow-200 to-yellow-100 border-yellow-400 shadow-lg'
              : isGoal
              ? 'bg-gradient-to-br from-green-200 to-green-100 border-green-400'
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-blue-300'
            }
          `}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
        >
          {/* Goal indicator */}
          {isGoal && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1, 1.1, 1],
                rotate: [0, 5, -5, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <motion.span
                className="text-[64px] drop-shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                🍎
              </motion.span>
            </motion.div>
          )}

          {/* Character */}
          {isCharacter && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                <Image
                  src="/images/characters/yurei_01.svg"
                  alt="キャラクター"
                  width={cellSize * 0.8}
                  height={cellSize * 0.8}
                  className="drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      );
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="inline-grid gap-0 shadow-2xl rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
};
