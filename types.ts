
export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER'
}

export interface GameObject {
  id: number;
  type: 'STRAP' | 'LIFTING_BELT' | 'KNEE_SLEEVES' | 'WRIST_GUARD' | 'SOFA' | 'PHONE';
  x: number;
  y: number;
  speed: number;
}

export interface ScoreMilestone {
  score: number;
  reward: string;
}
