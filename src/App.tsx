import { useState, useCallback } from 'react';
import type { Question, QuestionResult } from './types';
import { generateQuestion } from './utils/questionGenerator';
import {
  calculateQuestionScore,
  calculateTotalScore,
  addScoreToHistory,
} from './utils/scoring';
import { AnswerSelect } from './components/AnswerSelect';
import { SelectedAnswers } from './components/SelectedAnswers';
import { Feedback } from './components/Feedback';
import { ScoreDisplay } from './components/ScoreDisplay';
import './App.css';

type AppState = 'answering' | 'feedback';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() =>
    generateQuestion()
  );
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [appState, setAppState] = useState<AppState>('answering');
  const [lastResult, setLastResult] = useState<QuestionResult | null>(null);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]);

  const handleSelectAnswer = useCallback((code: string) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(code)) return prev;
      return [...prev, code];
    });
  }, []);

  const handleRemoveAnswer = useCallback((code: string) => {
    setSelectedAnswers((prev) => prev.filter((c) => c !== code));
  }, []);

  const handleSubmit = useCallback(() => {
    const result = calculateQuestionScore(
      selectedAnswers,
      currentQuestion.correctAnswers
    );
    setLastResult(result);
    setScoreHistory((prev) => addScoreToHistory(prev, result.score));
    setAppState('feedback');
  }, [selectedAnswers, currentQuestion.correctAnswers]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswers([]);
    setLastResult(null);
    setAppState('answering');
  }, []);

  const totalScore = calculateTotalScore(scoreHistory);

  return (
    <div className="app">
      <ScoreDisplay
        totalScore={totalScore}
        questionCount={scoreHistory.length}
      />

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.questionText}</h2>
      </div>

      {appState === 'answering' ? (
        <>
          <AnswerSelect
            targetType={currentQuestion.targetNodeType}
            selectedCodes={selectedAnswers}
            onSelect={handleSelectAnswer}
          />

          <SelectedAnswers
            selectedCodes={selectedAnswers}
            onRemove={handleRemoveAnswer}
          />

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0}
          >
            Submit Answer
          </button>
        </>
      ) : (
        <>
          {lastResult && <Feedback result={lastResult} />}
          <button className="next-btn" onClick={handleNextQuestion}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default App;
