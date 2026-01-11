import type { NodeType, Question } from '../types';
import { NODE_TYPE_NAMES_PLURAL } from '../types';
import { nodesByType } from '../data/nodes';
import { getConnectedNodesOfType, hasConnectionsToType } from '../data/edges';

interface ConnectionWord {
  forward: string;  // From source to target
  reverse: string;  // From target to source
}

// Connection words based on edge direction
// Edges are stored as (A, X) where X is B, C, or D
// Format: "What are all the [targets] that [verb] the [source]?"
const connectionWords: Record<string, ConnectionWord> = {
  // Muscle (A) <-> Bone (B)
  // A->B: "What are all the bones that are attached to the [muscle]?"
  // B->A: "What are all the muscles that attach to the [bone]?"
  'A-B': { forward: 'are attached to', reverse: 'attach to' },
  // Muscle (A) <-> Nerve (C)
  // A->C: "What are all the nerves that innervate the [muscle]?"
  // C->A: "What are all the muscles that are innervated by the [nerve]?"
  'A-C': { forward: 'innervate', reverse: 'are innervated by' },
  // Muscle (A) <-> Action (D)
  // A->D: "What are all the actions that are performed by the [muscle]?"
  // D->A: "What are all the muscles that perform the [action]?"
  'A-D': { forward: 'are performed by', reverse: 'perform' },
};

function getConnectionWord(
  sourceType: NodeType,
  targetType: NodeType
): string {
  // Determine the key based on which is the muscle (A)
  if (sourceType === 'A') {
    const key = `A-${targetType}`;
    return connectionWords[key]?.forward || 'connects to';
  } else {
    const key = `A-${sourceType}`;
    return connectionWords[key]?.reverse || 'connected to';
  }
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestion(): Question {
  // Get all node types
  const allTypes: NodeType[] = ['A', 'B', 'C', 'D'];

  // Keep trying until we find a valid question
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    attempts++;

    // Pick a random source type
    const sourceType = getRandomElement(allTypes);

    // Determine valid target types based on source
    let validTargetTypes: NodeType[];
    if (sourceType === 'A') {
      validTargetTypes = ['B', 'C', 'D'];
    } else {
      validTargetTypes = ['A'];
    }

    // Pick a random target type
    const targetType = getRandomElement(validTargetTypes);

    // Get all nodes of the source type
    const sourceNodes = nodesByType[sourceType];

    // Pick a random source node that has connections to the target type
    const validSourceNodes = sourceNodes.filter((node) =>
      hasConnectionsToType(node.code, targetType)
    );

    if (validSourceNodes.length === 0) continue;

    const sourceNode = getRandomElement(validSourceNodes);

    // Get correct answers
    const correctAnswers = getConnectedNodesOfType(sourceNode.code, targetType);

    // Skip if no answers or more than 5 answers
    if (correctAnswers.length === 0 || correctAnswers.length > 5) continue;

    // Build question text
    const connectionWord = getConnectionWord(sourceType, targetType);
    const targetTypeName = NODE_TYPE_NAMES_PLURAL[targetType];

    const questionText = `What are all the ${targetTypeName} that ${connectionWord} the ${sourceNode.name}?`;

    return {
      questionText,
      targetNodeType: targetType,
      sourceNode,
      correctAnswers,
    };
  }

  // Fallback (should never reach here with valid data)
  throw new Error('Could not generate a valid question');
}
