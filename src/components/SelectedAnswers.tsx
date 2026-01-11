import { nodeMap } from '../data/nodes';

interface SelectedAnswersProps {
  selectedCodes: string[];
  onRemove: (code: string) => void;
}

export function SelectedAnswers({
  selectedCodes,
  onRemove,
}: SelectedAnswersProps) {
  if (selectedCodes.length === 0) {
    return <div className="selected-answers empty">No answers selected</div>;
  }

  return (
    <div className="selected-answers">
      <div className="selected-label">Selected:</div>
      <div className="selected-chips">
        {selectedCodes.map((code) => {
          const node = nodeMap.get(code);
          return (
            <span key={code} className="chip">
              {node?.name || code}
              <button
                className="chip-remove"
                onClick={() => onRemove(code)}
                aria-label={`Remove ${node?.name || code}`}
              >
                x
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
