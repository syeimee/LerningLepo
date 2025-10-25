'use client';

import * as React from 'react';
import type { CommandType } from '@/types/programming';

const availableCommands: CommandType[] = ['forward', 'backward', 'left', 'right'];

const commandIcons: Record<CommandType, { icon: string; color: string }> = {
  forward: { icon: '↑', color: 'bg-[var(--color-primary-400)]' },
  backward: { icon: '↓', color: 'bg-[var(--color-primary-300)]' },
  left: { icon: '←', color: 'bg-[var(--color-primary-400)]' },
  right: { icon: '→', color: 'bg-[var(--color-primary-400)]' },
  loop: { icon: '⟳', color: 'bg-[var(--color-accent-purple)]' },
  if: { icon: '❓', color: 'bg-[var(--color-accent-pink)]' },
};

export interface CommandPanelProps {
  onCommandSelect: (type: CommandType) => void;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({ onCommandSelect }) => {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-4">
      <div className="flex gap-3 justify-center flex-wrap">
        {availableCommands.map((commandType) => {
          const command = commandIcons[commandType];
          return (
            <button
              key={commandType}
              onClick={() => onCommandSelect(commandType)}
              className={`
                min-w-[96px] min-h-[96px]
                rounded-[20px]
                ${command.color}
                text-white
                flex items-center justify-center
                text-[56px]
                shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]
                active:scale-105
                transition-all duration-200
                cursor-pointer
              `}
              aria-label={commandType}
            >
              {command.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};
