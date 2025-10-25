import type { Command } from '@/types/programming';
import type { CharacterPosition } from '@/types/character';

export interface ExecutionStep {
  position: CharacterPosition;
  rotation: number;
  animation: 'idle' | 'walk' | 'celebrate' | 'sad';
  duration: number; // milliseconds
}

export class ProgramExecutor {
  private currentPosition: CharacterPosition;
  private currentRotation: number; // in radians

  constructor(
    initialPosition: CharacterPosition = { x: 0, y: 0, z: 0 },
    initialRotation: number = 0
  ) {
    this.currentPosition = { ...initialPosition };
    this.currentRotation = initialRotation;
  }

  /**
   * Execute all commands and return animation steps
   */
  execute(commands: Command[]): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    for (const command of commands) {
      const commandSteps = this.executeCommand(command);
      steps.push(...commandSteps);
    }

    // Add final idle step
    steps.push({
      position: { ...this.currentPosition },
      rotation: this.currentRotation,
      animation: 'idle',
      duration: 500,
    });

    return steps;
  }

  /**
   * Execute a single command and return animation steps
   */
  private executeCommand(command: Command): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    switch (command.type) {
      case 'forward':
        // Move up (positive Z)
        steps.push(...this.moveUp());
        break;
      case 'backward':
        // Move down (negative Z)
        steps.push(...this.moveDown());
        break;
      case 'left':
        // Move left (negative X)
        steps.push(...this.moveLeft());
        break;
      case 'right':
        // Move right (positive X)
        steps.push(...this.moveRight());
        break;
      case 'loop':
        // TODO: Implement loop logic
        if (command.params?.children && command.params?.count) {
          for (let i = 0; i < command.params.count; i++) {
            for (const child of command.params.children) {
              steps.push(...this.executeCommand(child));
            }
          }
        }
        break;
      case 'if':
        // TODO: Implement conditional logic
        break;
    }

    return steps;
  }

  /**
   * Move up (positive Z direction)
   */
  private moveUp(): ExecutionStep[] {
    const newZ = this.currentPosition.z + 1;

    // Check if out of bounds (grid is -2 to 2)
    if (newZ > 2) {
      return []; // Don't move if out of bounds
    }

    const newPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y,
      z: newZ,
    };

    this.currentPosition = newPosition;

    return [
      {
        position: { ...newPosition },
        rotation: 0, // Facing up
        animation: 'walk',
        duration: 1000,
      },
    ];
  }

  /**
   * Move down (negative Z direction)
   */
  private moveDown(): ExecutionStep[] {
    const newZ = this.currentPosition.z - 1;

    // Check if out of bounds (grid is -2 to 2)
    if (newZ < -2) {
      return []; // Don't move if out of bounds
    }

    const newPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y,
      z: newZ,
    };

    this.currentPosition = newPosition;

    return [
      {
        position: { ...newPosition },
        rotation: Math.PI, // Facing down
        animation: 'walk',
        duration: 1000,
      },
    ];
  }

  /**
   * Move left (negative X direction)
   */
  private moveLeft(): ExecutionStep[] {
    const newX = this.currentPosition.x - 1;

    // Check if out of bounds (grid is -2 to 2)
    if (newX < -2) {
      return []; // Don't move if out of bounds
    }

    const newPosition = {
      x: newX,
      y: this.currentPosition.y,
      z: this.currentPosition.z,
    };

    this.currentPosition = newPosition;

    return [
      {
        position: { ...newPosition },
        rotation: Math.PI / 2, // Facing left
        animation: 'walk',
        duration: 1000,
      },
    ];
  }

  /**
   * Move right (positive X direction)
   */
  private moveRight(): ExecutionStep[] {
    const newX = this.currentPosition.x + 1;

    // Check if out of bounds (grid is -2 to 2)
    if (newX > 2) {
      return []; // Don't move if out of bounds
    }

    const newPosition = {
      x: newX,
      y: this.currentPosition.y,
      z: this.currentPosition.z,
    };

    this.currentPosition = newPosition;

    return [
      {
        position: { ...newPosition },
        rotation: -Math.PI / 2, // Facing right
        animation: 'walk',
        duration: 1000,
      },
    ];
  }

  /**
   * Check if character reached goal
   */
  static isAtGoal(
    currentPosition: CharacterPosition,
    goalPosition: CharacterPosition,
    tolerance: number = 0.5
  ): boolean {
    const dx = currentPosition.x - goalPosition.x;
    const dz = currentPosition.z - goalPosition.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    return distance <= tolerance;
  }
}
