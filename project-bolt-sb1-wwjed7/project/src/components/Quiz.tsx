import React, { useEffect, useRef } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';

interface QuizProps {
  question: Question;
  timeRemaining: number | null;
  onAnswer: (index: number) => void;
  practiceMode: boolean;
}

export const Quiz: React.FC<QuizProps> = ({
  question,
  timeRemaining,
  onAnswer,
  practiceMode,
}) => {
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    questionRef.current?.focus();
  }, [question]);

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onAnswer(index);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
      {!practiceMode && timeRemaining !== null && (
        <div className="flex items-center justify-end gap-2 text-lg font-semibold">
          <Clock className="w-6 h-6 text-indigo-600" />
          <span className="text-gray-700">
            Time: {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}

      <div
        ref={questionRef}
        tabIndex={0}
        className="space-y-6"
        role="region"
        aria-label="Current question"
      >
        <h2 className="text-2xl font-bold text-gray-800">{question.text}</h2>

        <div className="space-y-4">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
              role="option"
              aria-selected="false"
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                {choice}
              </span>
            </button>
          ))}
        </div>
      </div>

      {practiceMode && (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Practice Mode: Take your time!
        </div>
      )}
    </div>
  );
};