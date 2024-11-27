export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: number;
}

export interface GameSettings {
  timeLimit: number;
  practiceMode: boolean;
  requiredScore: number;
}

export interface GameState {
  score: number;
  currentQuestion: number;
  correctAnswers: number;
  isGameOver: boolean;
  timeRemaining: number;
}

export type TimerOption = {
  label: string;
  value: number;
};