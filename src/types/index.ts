export type NodeType = 'A' | 'B' | 'C' | 'D';

export interface Node {
  code: string;
  name: string;
  type: NodeType;
}

export interface Question {
  questionText: string;
  targetNodeType: NodeType;
  sourceNode: Node;
  correctAnswers: string[]; // node codes
}

export interface QuestionResult {
  correct: string[];    // user selected and was correct
  incorrect: string[];  // user selected but was wrong
  missing: string[];    // user didn't select but should have
  score: number;
}

export const NODE_TYPE_NAMES: Record<NodeType, string> = {
  A: 'muscle',
  B: 'bone',
  C: 'nerve',
  D: 'action',
};

export const NODE_TYPE_NAMES_PLURAL: Record<NodeType, string> = {
  A: 'muscles',
  B: 'bones',
  C: 'nerves',
  D: 'actions',
};
