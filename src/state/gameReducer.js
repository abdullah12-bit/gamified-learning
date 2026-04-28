import { NODES } from '../data/nodes';

export const BADGE_IDS = [
  'circuit_starter',
  'safety_expert',
  'power_planner',
  'lab_engineer',
  'mission_commander',
];

export function createInitialGameState(nodes = NODES) {
  return {
    currentScreen: 'welcome',
    currentNodeId: null,
    currentPhase: null,
    nodes: nodes.map((node, index) => ({
      id: node.id,
      status: index === 0 ? 'available' : 'locked',
      stars: 0,
      score: 0,
      attempts: 0,
      firstTryCorrect: 0,
      totalQuestions: 0,
      hintsUsed: 0,
    })),
    totalEnergy: 0,
    totalStars: 0,
    currentStreak: 0,
    bestStreak: 0,
    badges: [],
    lastBadgeId: null,
    guideMessage: null,
    guideTone: 'idle',
    selectedItem: null,
  };
}

export function mergeSavedState(initial, saved) {
  if (!saved) return initial;
  const savedNodesById = new Map((saved.nodes ?? []).map((node) => [node.id, node]));

  return {
    ...initial,
    ...saved,
    currentStreak: saved.currentStreak ?? initial.currentStreak,
    bestStreak: saved.bestStreak ?? initial.bestStreak,
    lastBadgeId: saved.lastBadgeId ?? initial.lastBadgeId,
    guideTone: saved.guideTone ?? initial.guideTone,
    nodes: initial.nodes.map(initialNode => {
      const savedNode = savedNodesById.get(initialNode.id);
      return savedNode ? { ...initialNode, ...savedNode } : initialNode;
    }),
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentScreen: action.screen, guideMessage: null, guideTone: 'idle' };

    case 'START_MISSION':
      return { ...state, currentScreen: 'story', guideTone: 'coach' };

    case 'BEGIN_JOURNEY':
      return { ...state, currentScreen: 'map', guideTone: 'coach' };

    case 'SELECT_NODE': {
      const node = state.nodes.find(n => n.id === action.nodeId);
      if (!node || node.status === 'locked') return state;
      return {
        ...state,
        currentNodeId: action.nodeId,
        currentScreen: 'lesson',
        currentPhase: 'lesson',
        guideTone: 'coach',
        nodes: state.nodes.map(n =>
          n.id === action.nodeId && n.status === 'available'
            ? { ...n, status: 'in-progress' }
            : n
        ),
      };
    }

    case 'START_ACTIVITY':
      return { ...state, currentPhase: 'activity', currentScreen: 'activity', guideTone: 'coach' };

    case 'ANSWER_QUESTION': {
      const { nodeId, isCorrect, isFirstTry } = action;
      let energyGain = isCorrect ? 10 : 0;
      if (isCorrect && isFirstTry) energyGain += 5;

      const nextStreak = isCorrect && isFirstTry ? state.currentStreak + 1 : isCorrect ? state.currentStreak : 0;

      return {
        ...state,
        totalEnergy: state.totalEnergy + energyGain,
        currentStreak: nextStreak,
        bestStreak: Math.max(state.bestStreak ?? 0, nextStreak),
        guideTone: isCorrect ? 'success' : 'hint',
        nodes: state.nodes.map(n =>
          n.id === nodeId
            ? {
                ...n,
                attempts: n.attempts + 1,
                score: n.score + energyGain,
                firstTryCorrect: n.firstTryCorrect + (isCorrect && isFirstTry ? 1 : 0),
              }
            : n
        ),
      };
    }

    case 'COMPLETE_NODE': {
      const { nodeId, totalQuestions, correctFirstTry } = action;
      const ratio = correctFirstTry / totalQuestions;
      const stars = ratio >= 1 ? 3 : ratio >= 0.66 ? 2 : 1;
      const badgeId = BADGE_IDS[nodeId - 1];
      const nextNodeId = nodeId + 1;
      const hasBadge = state.badges.includes(badgeId);

      return {
        ...state,
        totalStars: state.totalStars + stars,
        badges: hasBadge ? state.badges : [...state.badges, badgeId],
        lastBadgeId: badgeId,
        currentScreen: 'reflection',
        currentPhase: 'reflection',
        guideTone: 'success',
        nodes: state.nodes.map(n => {
          if (n.id === nodeId) {
            const bestStars = Math.max(n.stars, stars);
            return {
              ...n,
              status: bestStars === 3 ? 'mastered' : 'completed',
              stars: bestStars,
              totalQuestions,
              firstTryCorrect: correctFirstTry,
            };
          }
          if (n.id === nextNodeId && n.status === 'locked') {
            return { ...n, status: 'available' };
          }
          return n;
        }),
      };
    }

    case 'COMPLETE_REFLECTION': {
      const isLastNode = action.nodeId === state.nodes.length;
      return {
        ...state,
        currentScreen: isLastNode ? 'complete' : 'map',
        currentNodeId: isLastNode ? null : state.currentNodeId,
        currentPhase: null,
        guideTone: isLastNode ? 'success' : 'coach',
        nodes: state.nodes.map(n =>
          n.id === action.nodeId ? { ...n, reflectionCompleted: true } : n
        ),
      };
    }

    case 'USE_HINT':
      return {
        ...state,
        guideTone: 'hint',
        nodes: state.nodes.map(n =>
          n.id === action.nodeId ? { ...n, hintsUsed: (n.hintsUsed || 0) + 1 } : n
        ),
      };

    case 'RETURN_TO_MAP':
      return { ...state, currentScreen: 'map', currentNodeId: null, currentPhase: null, guideTone: 'coach' };

    case 'RESET':
      return createInitialGameState();

    case 'SET_GUIDE_MESSAGE':
      return { ...state, guideMessage: action.message, guideTone: action.tone ?? state.guideTone };

    case 'SELECT_CLASSIFY_ITEM':
      return { ...state, selectedItem: action.itemId };

    case 'CLEAR_SELECTED_ITEM':
      return { ...state, selectedItem: null };

    case 'SAVE_ACTIVITY_STATE':
      return {
        ...state,
        nodes: state.nodes.map(n =>
          n.id === action.nodeId
            ? { ...n, activityState: action.activityState }
            : n
        ),
      };

    default:
      return state;
  }
}
