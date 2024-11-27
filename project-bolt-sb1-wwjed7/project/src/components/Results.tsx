import React from 'react';
import { Trophy, RefreshCw, Award } from 'lucide-react';
import { rewardImages } from '../data/questions';

interface ResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  onRestart,
}) => {
  const getRewardImage = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage === 100) return rewardImages.perfect;
    if (percentage >= 80) return rewardImages.great;
    return rewardImages.good;
  };

  const getMessage = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage === 100) return "Perfect Score! You're a riddle master!";
    if (percentage >= 80) return "Great job! You're really good at this!";
    return "Good effort! Keep practicing to improve!";
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800">{getMessage()}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Final Score:</span>
          <span className="text-2xl font-bold text-indigo-600">{score}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Correct Answers:</span>
          <span className="text-2xl font-bold text-green-600">
            {correctAnswers} / {totalQuestions}
          </span>
        </div>
      </div>

      <div className="relative">
        <img
          src={getRewardImage()}
          alt="Achievement reward"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4">
          <Award className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
};