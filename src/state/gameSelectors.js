import { NODES } from '../data/nodes';

export const NODE_DATA_BY_ID = new Map(NODES.map((node) => [node.id, node]));

export function selectNodeStateById(state) {
  return new Map(state.nodes.map((node) => [node.id, node]));
}

export function selectCurrentNodeData(state) {
  return state.currentNodeId == null ? null : NODE_DATA_BY_ID.get(state.currentNodeId) ?? null;
}

export function selectCurrentNodeState(state) {
  return state.currentNodeId == null
    ? null
    : selectNodeStateById(state).get(state.currentNodeId) ?? null;
}

export function selectCompletedCount(state) {
  return state.nodes.filter(node => node.status === 'completed' || node.status === 'mastered').length;
}

export function selectProgressPercent(state) {
  return Math.round((selectCompletedCount(state) / state.nodes.length) * 100);
}
