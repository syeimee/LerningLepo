'use client';

import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { CommandType } from '@/types/programming';

const commandConfig: Record<CommandType, { icon: string; color: string; bgColor: string }> = {
  forward: {
    icon: '↑',
    color: 'border-[var(--color-primary-400)]',
    bgColor: 'bg-[var(--color-primary-50)]'
  },
  backward: {
    icon: '↓',
    color: 'border-[var(--color-primary-300)]',
    bgColor: 'bg-[var(--color-primary-50)]'
  },
  left: {
    icon: '←',
    color: 'border-[var(--color-primary-400)]',
    bgColor: 'bg-[var(--color-primary-50)]'
  },
  right: {
    icon: '→',
    color: 'border-[var(--color-primary-400)]',
    bgColor: 'bg-[var(--color-primary-50)]'
  },
  loop: {
    icon: '⟳',
    color: 'border-[var(--color-accent-purple)]',
    bgColor: 'bg-purple-50'
  },
  if: {
    icon: '❓',
    color: 'border-[var(--color-accent-pink)]',
    bgColor: 'bg-pink-50'
  },
};

interface PaletteBlockProps {
  type: CommandType;
}

const PaletteBlock: React.FC<PaletteBlockProps> = ({ type }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const command = commandConfig[type];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, y: -8, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`
        min-w-[80px] min-h-[80px]
        rounded-[16px]
        border-4
        ${command.color}
        ${command.bgColor}
        flex items-center justify-center
        shadow-[0_4px_12px_rgba(0,0,0,0.1)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
      `}
    >
      <motion.div
        className="text-[48px] font-black text-[var(--color-gray-900)]"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {command.icon}
      </motion.div>
    </motion.div>
  );
};

interface CommandPaletteProps {
  availableCommands: CommandType[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ availableCommands }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-4"
    >
      <div className="flex gap-3 justify-center flex-wrap">
        {availableCommands.map((commandType, index) => (
          <motion.div
            key={commandType}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
          >
            <PaletteBlock type={commandType} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
