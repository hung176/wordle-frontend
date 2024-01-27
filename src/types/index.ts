export enum STATUS {
  PLAYING = "PLAYING",
  SUCCESS = "SUCCESS",
  // FAILED means the user has no attempt remaining
  FAILED = "FAILED",
  // ENDED means the session is expired or user end the game
  ENDED = "ENDED",
}

export type Letter = {
  letter?: string;
  position?: number;
  green?: boolean;
  yellow?: boolean;
  black?: boolean;
  className?: string;
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
};

export type KeyboardColor = {
  [key: string]: string;
};

export type SessionResponse = Partial<SessionType>;
