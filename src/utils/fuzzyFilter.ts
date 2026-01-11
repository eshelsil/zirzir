import type { Node } from '../types';

/**
 * PyCharm-style fuzzy matching: characters must appear in order but not consecutively.
 * "trp" matches "Trapezius" (t...r...p)
 * "fcp" matches "Flexor carpi radialis"
 */
export function fuzzyMatch(query: string, text: string): boolean {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  let queryIndex = 0;
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }

  return queryIndex === lowerQuery.length;
}

/**
 * Filter nodes by fuzzy matching against their names
 */
export function filterNodes(nodes: Node[], query: string): Node[] {
  if (!query.trim()) {
    return nodes;
  }
  return nodes.filter((node) => fuzzyMatch(query, node.name));
}
