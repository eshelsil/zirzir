import type { QuestionResult } from '../types';

/**
 * Calculate the score for a single question
 * score = (correct / (totalCorrect + incorrect)) * 5
 * Max score per question: 5
 */
export function calculateQuestionScore(
  userAnswers: string[],
  correctAnswers: string[]
): QuestionResult {
  const correctSet = new Set(correctAnswers);
  const userSet = new Set(userAnswers);

  const correct: string[] = [];
  const incorrect: string[] = [];
  const missing: string[] = [];

  // Find correct and incorrect user answers
  userAnswers.forEach((answer) => {
    if (correctSet.has(answer)) {
      correct.push(answer);
    } else {
      incorrect.push(answer);
    }
  });

  // Find missing answers
  correctAnswers.forEach((answer) => {
    if (!userSet.has(answer)) {
      missing.push(answer);
    }
  });

  // Calculate score
  const totalCorrect = correctAnswers.length;
  const numCorrect = correct.length;
  const numIncorrect = incorrect.length;

  let score = 0;
  if (totalCorrect + numIncorrect > 0) {
    score = (numCorrect / (totalCorrect + numIncorrect)) * 5;
  }

  return {
    correct,
    incorrect,
    missing,
    score,
  };
}

/**
 * Calculate the total score from the last N questions
 * Max total score: N * 5 (e.g., 20 * 5 = 100)
 */
export function calculateTotalScore(scores: number[]): number {
  return scores.reduce((sum, score) => sum + score, 0);
}

/**
 * Add a new score to the history, keeping only the last N scores
 */
export function addScoreToHistory(
  history: number[],
  newScore: number,
  maxHistory: number = 20
): number[] {
  const updated = [...history, newScore];
  if (updated.length > maxHistory) {
    return updated.slice(-maxHistory);
  }
  return updated;
}
