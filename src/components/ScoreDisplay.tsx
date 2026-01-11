interface ScoreDisplayProps {
  totalScore: number;
  questionCount: number;
}

export function ScoreDisplay({ totalScore, questionCount }: ScoreDisplayProps) {
  const maxPossible = Math.min(questionCount, 20) * 5;

  return (
    <div className="score-display">
      <span className="score-value">{totalScore.toFixed(1)}</span>
      <span className="score-separator">/</span>
      <span className="score-max">{maxPossible}</span>
      <span className="score-label">
        (last {Math.min(questionCount, 20)} of {questionCount} questions)
      </span>
    </div>
  );
}
