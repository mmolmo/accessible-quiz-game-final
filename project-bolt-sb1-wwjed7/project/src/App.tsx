import React, { useState, useEffect } from 'react';
import { GameSetup } from './components/GameSetup';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { questions } from './data/questions';
import { GameState, GameSettings } from './types';
import { Brain } from 'lucide-react';

const REQUIRED_SCORE = 5;

function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentQuestion: 0,
    correctAnswers: 0,
    isGameOver: false,
    timeRemaining: 0,
  });

  useEffect(() => {
    if (gameSettings && !gameSettings.practiceMode && !gameState.isGameOver) {
      const timer = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeRemaining <= 0) {
            clearInterval(timer);
            return { ...prev, isGameOver: true };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameSettings, gameState.isGameOver]);

  const handleGameStart = (settings: { timeLimit: number; practiceMode: boolean }) => {
    setGameSettings({
      ...settings,
      requiredScore: REQUIRED_SCORE,
    });
    setGameState({
      score: 0,
      currentQuestion: 0,
      correctAnswers: 0,
      isGameOver: false,
      timeRemaining: settings.timeLimit,
    });
  };

  const handleSkip = () => {
    setGameState({
      ...gameState,
      isGameOver: true,
      score: 0,
      correctAnswers: REQUIRED_SCORE,
    });
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[gameState.currentQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeBonus = gameSettings?.practiceMode ? 0 : Math.ceil(gameState.timeRemaining / 10);

    setGameState((prev) => ({
      ...prev,
      score: prev.score + (isCorrect ? 100 + timeBonus : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      currentQuestion: prev.currentQuestion + 1,
      isGameOver:
        prev.currentQuestion + 1 >= questions.length ||
        prev.correctAnswers + (isCorrect ? 1 : 0) >= REQUIRED_SCORE,
    }));
  };

  const handleRestart = () => {
    setGameSettings(null);
    setGameState({
      score: 0,
      currentQuestion: 0,
      correctAnswers: 0,
      isGameOver: false,
      timeRemaining: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-800">Riddle Quest</h1>
        </div>
        <p className="text-gray-600">Test your wit with these brain-teasing riddles!</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {!gameSettings && (
          <GameSetup onStart={handleGameStart} onSkip={handleSkip} />
        )}

        {gameSettings && !gameState.isGameOver && (
          <Quiz
            question={questions[gameState.currentQuestion]}
            timeRemaining={gameSettings.practiceMode ? null : gameState.timeRemaining}
            onAnswer={handleAnswer}
            practiceMode={gameSettings.practiceMode}
          />
        )}

        {gameState.isGameOver && (
          <Results
            score={gameState.score}
            correctAnswers={gameState.correctAnswers}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;