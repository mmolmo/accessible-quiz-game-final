import React from 'react';
import { Timer, Brain, PlayCircle, SkipForward } from 'lucide-react';
import { timerOptions } from '../data/questions';

interface GameSetupProps {
  onStart: (settings: { timeLimit: number; practiceMode: boolean }) => void;
  onSkip: () => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onStart, onSkip }) => {
  const [selectedTime, setSelectedTime] = React.useState(timerOptions[1].value);
  const [practiceMode, setPracticeMode] = React.useState(false);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Brain className="w-8 h-8 text-indigo-600" />
        Game Settings
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Select Time Limit
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            aria-label="Time limit selection"
          >
            {timerOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="practice-mode"
            type="checkbox"
            checked={practiceMode}
            onChange={(e) => setPracticeMode(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="practice-mode" className="ml-2 block text-sm text-gray-700">
            Enable Practice Mode (No Time Limit)
          </label>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => onStart({ timeLimit: selectedTime, practiceMode })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlayCircle className="w-5 h-5" />
            Start Quiz
          </button>

          <button
            onClick={onSkip}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <SkipForward className="w-5 h-5" />
            Skip Quiz
          </button>
        </div>
      </div>
    </div>
  );
};