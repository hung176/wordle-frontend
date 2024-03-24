export enum STATUS {
  PLAYING = 'PLAYING',
  SUCCESS = 'SUCCESS',
  // FAILED means the user has no attempt remaining
  FAILED = 'FAILED',
  // ENDED means the session is expired or user end the game
  ENDED = 'ENDED',
}

export enum LetterAnimationType {
  FLIP,
  TYPING,
  INITIAL,
  SHAKE,
}

export type Letter = {
  letter?: string;
  position?: number;
  green?: boolean;
  yellow?: boolean;
  gray?: boolean;
  animation?: LetterAnimationType;
};

export type Attempt = Letter[];

export type SessionType = {
  sessionId: string;
  userId: string;
  wordToGuess: string;
  attemptsRemaining: number;
  attempts: Attempt[];
  status: STATUS;
  keyboardColor: KeyboardColor;
  hints: string[];
};

export type KeyboardColor = {
  [key: string]: string;
};

export type SessionResponse = Partial<SessionType>;
