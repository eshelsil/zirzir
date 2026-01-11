import type { QuestionResult } from '../types';
import { nodeMap } from '../data/nodes';

interface FeedbackProps {
  result: QuestionResult;
}

export function Feedback({ result }: FeedbackProps) {
  const { correct, incorrect, missing, score } = result;

  return (
    <div className="feedback">
      <div className="feedback-score">
        Score: {score.toFixed(2)} / 5 points
      </div>

      {correct.length > 0 && (
        <div className="feedback-section correct">
          <div className="feedback-header">Correct:</div>
          {correct.map((code) => (
            <div key={code} className="feedback-item">
              <span className="icon">+</span>
              {nodeMap.get(code)?.name || code}
            </div>
          ))}
        </div>
      )}

      {incorrect.length > 0 && (
        <div className="feedback-section incorrect">
          <div className="feedback-header">Incorrect:</div>
          {incorrect.map((code) => (
            <div key={code} className="feedback-item">
              <span className="icon">-</span>
              {nodeMap.get(code)?.name || code}
            </div>
          ))}
        </div>
      )}

      {missing.length > 0 && (
        <div className="feedback-section missing">
          <div className="feedback-header">Missing:</div>
          {missing.map((code) => (
            <div key={code} className="feedback-item">
              <span className="icon">?</span>
              {nodeMap.get(code)?.name || code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
