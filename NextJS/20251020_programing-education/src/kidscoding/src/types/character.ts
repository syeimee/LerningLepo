// Character types for KidsCoding app

export interface Character {
  id: string;
  name: string;
  modelPath: string;
  animations: {
    idle: string;
    walk: string;
    celebrate: string;
    sad: string;
  };
}

export interface CharacterPosition {
  x: number;
  y: number;
  z: number;
}
