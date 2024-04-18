export enum STATUS {
  PLAYING = 'PLAYING',
  SUCCESS = 'SUCCESS',
  // FAILED means the user has no attempt remaining
  FAILED = 'FAILED',
  // ENDED means the session is expired or user give up
  ENDED = 'ENDED',
}

export enum LetterAnimationType {
  FLIP,
  TYPING,
  INITIAL,
  SHAKE,
}

export enum ChallengeType {
  DAILY = 'DAILY',
  CHALLENGE = 'CHALLENGE',
  INFINITE = 'INFINITE',
}

export type Letter = {
  letter?: string;
  position?: number;
  green?: boolean;
  yellow?: boolean;
  gray?: boolean;
};

export type Attempt = Letter[];

export type SessionType = {
  sessionId: string;
  // userId: string;
  challengeId?: string;
  challengeType?: ChallengeType;
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
