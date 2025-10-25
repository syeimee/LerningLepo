'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CommandBlock } from './CommandBlock';
import type { Command } from '@/types/programming';

export interface ProgramAreaProps {
  commands: Command[];
  onCommandsChange: (commands: Command[]) => void;
}

export const ProgramArea: React.FC<ProgramAreaProps> = ({
  commands,
  onCommandsChange,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'program-area',
  });

  const handleRemoveCommand = (id: string) => {
    onCommandsChange(commands.filter((cmd) => cmd.id !== id));
  };

  const handleLoopCountChange = (commandId: string, newCount: number) => {
    const updatedCommands = commands.map((cmd) => {
      if (cmd.id === commandId) {
        return {
          ...cmd,
          params: {
            ...cmd.params,
            count: newCount,
          },
        };
      }
      return cmd;
    });
    onCommandsChange(updatedCommands);
  };

  // Handler for removing child commands from a parent
  const handleRemoveChildCommand = (parentId: string, childId: string) => {
    const updatedCommands = commands.map((cmd) => {
      if (cmd.id === parentId && cmd.params?.children) {
        return {
          ...cmd,
          params: {
            ...cmd.params,
            children: cmd.params.children.filter((child) => child.id !== childId),
          },
        };
      }
      return cmd;
    });
    onCommandsChange(updatedCommands);
  };

  // Recursively render child commands
  const renderChildCommands = (parentId: string, childCommands: Command[]): React.ReactNode => {
    if (!childCommands || childCommands.length === 0) return null;

    return childCommands.map((child) => (
      <CommandBlock
        key={child.id}
        id={child.id}
        type={child.type}
        isDraggable={true}
        isInPalette={false}
        loopCount={child.params?.count}
        onRemove={() => handleRemoveChildCommand(parentId, child.id)}
      >
        {child.params?.children && renderChildCommands(child.id, child.params.children)}
      </CommandBlock>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-[var(--color-gray-100)] rounded-[24px] p-4 min-h-[200px] shadow-inner"
    >
      {commands.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <div className="text-[24px] font-bold text-[var(--color-gray-500)]">
            ブロックをここにおいてね！
          </div>
        </div>
      ) : (
        <SortableContext
          items={commands.map((cmd) => cmd.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {commands.map((command) => (
              <CommandBlock
                key={command.id}
                id={command.id}
                type={command.type}
                isDraggable={true}
                isInPalette={false}
                onRemove={() => handleRemoveCommand(command.id)}
                loopCount={command.params?.count}
                onLoopCountChange={(newCount) => handleLoopCountChange(command.id, newCount)}
              >
                {command.params?.children && renderChildCommands(command.id, command.params.children)}
              </CommandBlock>
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
};
