'use client';

import * as React from 'react';
import { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { CommandType } from '@/types/programming';

const commandIcons: Record<CommandType, { icon: string; label: string }> = {
  forward: { icon: '↑', label: '前' },
  backward: { icon: '↓', label: '後ろ' },
  left: { icon: '←', label: '左' },
  right: { icon: '→', label: '右' },
  loop: { icon: '⟳', label: '繰り返し' },
  if: { icon: '❓', label: 'もし' },
};

const commandColors: Record<CommandType, string> = {
  forward: 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]',
  backward: 'border-[var(--color-primary-300)] bg-[var(--color-primary-50)]',
  left: 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]',
  right: 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]',
  loop: 'border-[var(--color-accent-purple)] bg-purple-50',
  if: 'border-[var(--color-accent-pink)] bg-pink-50',
};

export interface CommandBlockProps {
  id: string;
  type: CommandType;
  isDraggable?: boolean;
  isInPalette?: boolean;
  onRemove?: () => void;
  loopCount?: number;
  onLoopCountChange?: (newCount: number) => void;
  children?: React.ReactNode;
}

export const CommandBlock: React.FC<CommandBlockProps> = ({
  id,
  type,
  isDraggable = true,
  isInPalette = false,
  onRemove,
  loopCount,
  onLoopCountChange,
  children,
}) => {
  const removeAudioRef = useRef<HTMLAudioElement | null>(null);
  const isLoopBlock = type === 'loop' || type === 'if';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable,
  });

  // Create a droppable zone inside loop blocks
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `${id}-children`,
    disabled: !isLoopBlock || isInPalette,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const commandInfo = commandIcons[type];

  const playRemoveSound = () => {
    try {
      if (!removeAudioRef.current) {
        removeAudioRef.current = new Audio('/sounds/block-remove.mp3');
        removeAudioRef.current.volume = 0.5;
      }
      const audio = removeAudioRef.current;
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  };

  // For loop blocks, render as a container
  if (isLoopBlock && !isInPalette) {
    return (
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={clsx(
          'relative',
          'min-w-[280px]',
          'rounded-[20px]',
          'border-4',
          commandColors[type],
          'p-4',
          'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
          isDragging && 'opacity-50 rotate-1 scale-105 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
          !isDragging && 'hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]'
        )}
      >
        {/* Header with icon and loop count controls */}
        <div
          {...listeners}
          className="flex items-center justify-between mb-3 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="text-[36px] leading-none font-black text-[var(--color-gray-900)]"
            >
              {commandInfo.icon}
            </motion.div>
            <span className="text-[20px] font-bold text-[var(--color-gray-700)]">
              {commandInfo.label}
            </span>
          </div>

          {/* Loop counter controls */}
          {type === 'loop' && loopCount !== undefined && onLoopCountChange && (
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border-2 border-[var(--color-gray-300)]">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (loopCount > 1) onLoopCountChange(loopCount - 1);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-[var(--color-accent-orange)] text-white font-bold text-[20px] flex items-center justify-center"
              >
                −
              </motion.button>
              <span className="text-[24px] font-black text-[var(--color-gray-900)] min-w-[32px] text-center">
                {loopCount}
              </span>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (loopCount < 9) onLoopCountChange(loopCount + 1);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-[var(--color-accent-orange)] text-white font-bold text-[20px] flex items-center justify-center"
              >
                +
              </motion.button>
            </div>
          )}
        </div>

        {/* Children container - droppable zone */}
        <div
          ref={setDroppableRef}
          className="min-h-[100px] rounded-xl border-2 border-dashed border-[var(--color-gray-400)] bg-white/50 p-2 flex flex-col gap-2"
        >
          {children || (
            <div className="flex-1 flex items-center justify-center text-[16px] text-[var(--color-gray-500)] font-medium">
              ブロックをここに入れてね
            </div>
          )}
        </div>

        {/* Remove button */}
        {onRemove && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              playRemoveSound();
              onRemove();
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-error)] text-white flex items-center justify-center shadow-md hover:bg-[var(--color-error-dark)]"
            aria-label="削除"
          >
            ×
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Regular command block (or palette block)
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={!isDragging && isDraggable ? { scale: 1.05, y: -4 } : {}}
      whileTap={isDraggable ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        'relative',
        'min-w-[80px] min-h-[80px]',
        'rounded-[16px]',
        'border-4',
        commandColors[type],
        'flex items-center justify-center',
        'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
        isDraggable && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 rotate-2 scale-105 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
        !isDragging && 'hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]'
      )}
    >
      {/* Icon only - no text for 3 year olds */}
      <motion.div
        className="text-[48px] leading-none font-black text-[var(--color-gray-900)]"
        animate={isInPalette ? { rotate: [0, -5, 5, -5, 0] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {commandInfo.icon}
      </motion.div>

      {/* Remove button (only for blocks in program area) */}
      {!isInPalette && onRemove && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            // Play remove sound
            playRemoveSound();
            onRemove();
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-error)] text-white flex items-center justify-center shadow-md hover:bg-[var(--color-error-dark)]"
          aria-label="削除"
        >
          ×
        </motion.button>
      )}
    </motion.div>
  );
};
