import type { NodeType } from '../types';

// Raw edges from data.txt (excluding A-A connections)
const rawEdges: [string, string][] = [
  ['A1', 'B1'], ['A1', 'B2'], ['A1', 'B3'], ['A1', 'B4'], ['A1', 'B5'], ['A1', 'B6'],
  ['A1', 'C1'], ['A1', 'D1'], ['A1', 'D2'], ['A1', 'D3'], ['A1', 'D5'],
  ['A2', 'B3'], ['A2', 'B7'], ['A2', 'B8'], ['A2', 'B9'], ['A2', 'B10'], ['A2', 'B18'],
  ['A2', 'C2'], ['A2', 'D8'], ['A2', 'D10'], ['A2', 'D11'],
  ['A3', 'B11'], ['A3', 'C3'], ['A3', 'D1'], ['A3', 'D6'],
  ['A4', 'B11'], ['A4', 'B3'], ['A4', 'C3'], ['A4', 'D3'], ['A4', 'D6'],
  ['A5', 'B11'], ['A5', 'B3'], ['A5', 'C3'],
  ['A6', 'B4'], ['A6', 'B13'], ['A6', 'B18'], ['A6', 'C4'], ['A6', 'C5'],
  ['A6', 'D8'], ['A6', 'D9'], ['A6', 'D11'],
  ['A7', 'B14'], ['A7', 'B12'], ['A7', 'C4'], ['A7', 'D4'], ['A7', 'D2'],
  ['A9', 'B13'], ['A9', 'B11'], ['A9', 'C7'], ['A9', 'D4'], ['A9', 'D5'],
  ['A10', 'B4'], ['A10', 'B5'], ['A10', 'B6'], ['A10', 'B19'],
  ['A10', 'C8'], ['A10', 'D7'], ['A10', 'D9'], ['A10', 'D10'],
  ['A11', 'B22'], ['A11', 'B16'], ['A11', 'C9'], ['A11', 'D7'],
  ['A12', 'B23'], ['A12', 'B16'], ['A12', 'C9'], ['A12', 'D12'],
  ['A13', 'B25'], ['A13', 'B16'], ['A13', 'C8'], ['A13', 'D12'],
  ['A15', 'B24'], ['A15', 'B17'], ['A15', 'C10'], ['A15', 'C11'], ['A15', 'D11'],
  ['A17', 'B20'], ['A17', 'B12'], ['A17', 'B28'], ['A17', 'C12'], ['A17', 'D13'], ['A17', 'D15'],
  ['A18', 'B31'], ['A18', 'C12'], ['A18', 'D13'],
  ['A19', 'B21'], ['A19', 'B29'], ['A19', 'C13'], ['A19', 'D14'],
  ['A21', 'B26'], ['A21', 'B30'], ['A21', 'C14'], ['A21', 'D16'],
  ['A22', 'B26'], ['A22', 'B37'], ['A22', 'C14'], ['A22', 'D17'], ['A22', 'D19'],
  ['A24', 'B26'], ['A24', 'B41'], ['A24', 'C15'], ['A24', 'D17'], ['A24', 'D20'],
  ['A25', 'B26'], ['A25', 'B35'], ['A25', 'C14'], ['A25', 'D21'],
  ['A26', 'B31'], ['A26', 'B34'], ['A26', 'C15'], ['A26', 'C16'], ['A26', 'D21'],
  ['A29', 'B27'], ['A29', 'B32'], ['A29', 'C13'], ['A29', 'D13'],
  ['A30', 'B27'], ['A30', 'B37'], ['A30', 'C13'], ['A30', 'D18'], ['A30', 'D19'],
  ['A32', 'B27'], ['A32', 'B47'], ['A32', 'C17'], ['A32', 'D22'],
  ['A34', 'B27'], ['A34', 'B37'], ['A34', 'C17'], ['A34', 'D18'], ['A34', 'D20'],
  ['A40', 'B42'], ['A40', 'B46'], ['A40', 'B36'], ['A40', 'C19'], ['A40', 'D25'],
  ['A42', 'B42'], ['A42', 'B37'], ['A42', 'C19'], ['A42', 'D29'],
  ['A44', 'B41'], ['A44', 'B36'], ['A44', 'C18'], ['A44', 'D23'],
  ['A47', 'B47'], ['A47', 'C14'], ['A47', 'C18'], ['A47', 'D21'],
  ['A48', 'B37'], ['A48', 'B47'], ['A48', 'C18'], ['A48', 'D23'],
];

// Adjacency lists for quick lookup
// Key: node code, Value: Set of connected node codes
export const adjacencyList: Map<string, Set<string>> = new Map();

// Initialize adjacency list with bidirectional edges
rawEdges.forEach(([from, to]) => {
  if (!adjacencyList.has(from)) {
    adjacencyList.set(from, new Set());
  }
  if (!adjacencyList.has(to)) {
    adjacencyList.set(to, new Set());
  }
  adjacencyList.get(from)!.add(to);
  adjacencyList.get(to)!.add(from);
});

// Get all connected nodes of a specific type
export function getConnectedNodesOfType(
  nodeCode: string,
  targetType: NodeType
): string[] {
  const connections = adjacencyList.get(nodeCode);
  if (!connections) return [];
  return Array.from(connections).filter((code) => code.startsWith(targetType));
}

// Get valid target types for a given node type
// Based on the data: A connects to B, C, D
export function getValidTargetTypes(sourceType: NodeType): NodeType[] {
  if (sourceType === 'A') {
    return ['B', 'C', 'D'];
  }
  // B, C, D only connect to A in the data
  return ['A'];
}

// Check if there are any connections between a node and a target type
export function hasConnectionsToType(
  nodeCode: string,
  targetType: NodeType
): boolean {
  return getConnectedNodesOfType(nodeCode, targetType).length > 0;
}
