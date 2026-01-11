import { useState, useMemo, useRef, useEffect } from 'react';
import type { NodeType } from '../types';
import { nodesByType } from '../data/nodes';
import { filterNodes } from '../utils/fuzzyFilter';

interface AnswerSelectProps {
  targetType: NodeType;
  selectedCodes: string[];
  onSelect: (code: string) => void;
}

export function AnswerSelect({
  targetType,
  selectedCodes,
  onSelect,
}: AnswerSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableNodes = useMemo(() => {
    const typeNodes = nodesByType[targetType];
    // Filter out already selected nodes
    const unselected = typeNodes.filter(
      (node) => !selectedCodes.includes(node.code)
    );
    // Apply fuzzy filter
    return filterNodes(unselected, query);
  }, [targetType, selectedCodes, query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onSelect(code);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="answer-select" ref={containerRef}>
      <input
        type="text"
        className="answer-input"
        placeholder="Type to filter..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && availableNodes.length > 0 && (
        <ul className="dropdown-list">
          {availableNodes.map((node) => (
            <li
              key={node.code}
              className="dropdown-item"
              onClick={() => handleSelect(node.code)}
            >
              {node.name}
            </li>
          ))}
        </ul>
      )}
      {isOpen && availableNodes.length === 0 && query && (
        <div className="dropdown-empty">No matches found</div>
      )}
    </div>
  );
}
