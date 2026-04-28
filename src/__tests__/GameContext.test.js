import { describe, expect, it } from 'vitest';
import { createInitialGameState, gameReducer } from '../state/gameReducer';
import {
  selectCompletedCount,
  selectCurrentNodeData,
  selectNodeStateById,
  selectProgressPercent,
} from '../state/gameSelectors';

describe('Game Reducer - State Transitions', () => {
  it('starts with welcome screen and first node available', () => {
    const state = createInitialGameState();

    expect(state.currentScreen).toBe('welcome');
    expect(state.totalEnergy).toBe(0);
    expect(state.totalStars).toBe(0);
    expect(state.currentStreak).toBe(0);
    expect(state.bestStreak).toBe(0);
    expect(state.nodes[0].status).toBe('available');
    expect(state.nodes.slice(1).every(node => node.status === 'locked')).toBe(true);
  });

  it('START_MISSION and BEGIN_JOURNEY navigate the mission intro', () => {
    let state = createInitialGameState();

    state = gameReducer(state, { type: 'START_MISSION' });
    expect(state.currentScreen).toBe('story');

    state = gameReducer(state, { type: 'BEGIN_JOURNEY' });
    expect(state.currentScreen).toBe('map');
  });

  it('SELECT_NODE only opens available nodes and marks them in progress', () => {
    const state = createInitialGameState();

    const selected = gameReducer(state, { type: 'SELECT_NODE', nodeId: 1 });
    expect(selected.currentNodeId).toBe(1);
    expect(selected.currentScreen).toBe('lesson');
    expect(selected.nodes[0].status).toBe('in-progress');

    const locked = gameReducer(state, { type: 'SELECT_NODE', nodeId: 2 });
    expect(locked.currentNodeId).toBeNull();
    expect(locked.currentScreen).toBe('welcome');
  });
});

describe('Game Reducer - Scoring and Streaks', () => {
  it('correct answer on first try gives 15 energy and increments streak', () => {
    const state = createInitialGameState();
    const nextState = gameReducer(state, {
      type: 'ANSWER_QUESTION',
      nodeId: 1,
      questionId: 'q1',
      isCorrect: true,
      isFirstTry: true,
    });

    expect(nextState.totalEnergy).toBe(15);
    expect(nextState.currentStreak).toBe(1);
    expect(nextState.bestStreak).toBe(1);
  });

  it('correct retry gives 10 energy and keeps the current streak unchanged', () => {
    const state = {
      ...createInitialGameState(),
      currentStreak: 2,
      bestStreak: 2,
    };

    const nextState = gameReducer(state, {
      type: 'ANSWER_QUESTION',
      nodeId: 1,
      questionId: 'q1',
      isCorrect: true,
      isFirstTry: false,
    });

    expect(nextState.totalEnergy).toBe(10);
    expect(nextState.currentStreak).toBe(2);
    expect(nextState.bestStreak).toBe(2);
  });

  it('wrong answer gives 0 energy and resets streak', () => {
    const state = {
      ...createInitialGameState(),
      currentStreak: 3,
      bestStreak: 3,
    };

    const nextState = gameReducer(state, {
      type: 'ANSWER_QUESTION',
      nodeId: 1,
      questionId: 'q1',
      isCorrect: false,
      isFirstTry: true,
    });

    expect(nextState.totalEnergy).toBe(0);
    expect(nextState.currentStreak).toBe(0);
    expect(nextState.bestStreak).toBe(3);
  });
});

describe('Game Reducer - Node Completion', () => {
  it('completion sends the learner to reflection, awards stars, unlocks next node, and awards badge', () => {
    const state = createInitialGameState();
    const nextState = gameReducer(state, {
      type: 'COMPLETE_NODE',
      nodeId: 1,
      totalQuestions: 3,
      correctFirstTry: 3,
    });

    expect(nextState.currentScreen).toBe('reflection');
    expect(nextState.currentPhase).toBe('reflection');
    expect(nextState.nodes[0].stars).toBe(3);
    expect(nextState.nodes[0].status).toBe('mastered');
    expect(nextState.nodes[1].status).toBe('available');
    expect(nextState.badges).toContain('circuit_starter');
    expect(nextState.lastBadgeId).toBe('circuit_starter');
  });

  it('66% score gives 2 stars', () => {
    const state = createInitialGameState();
    const nextState = gameReducer(state, {
      type: 'COMPLETE_NODE',
      nodeId: 1,
      totalQuestions: 3,
      correctFirstTry: 2,
    });

    expect(nextState.nodes[0].stars).toBe(2);
  });

  it('does not duplicate badges on replay', () => {
    let state = createInitialGameState();
    state = gameReducer(state, { type: 'COMPLETE_NODE', nodeId: 1, totalQuestions: 3, correctFirstTry: 3 });
    state = gameReducer(state, { type: 'COMPLETE_NODE', nodeId: 1, totalQuestions: 3, correctFirstTry: 3 });

    expect(state.badges.filter(badge => badge === 'circuit_starter')).toHaveLength(1);
  });

  it('COMPLETE_REFLECTION returns to map, or completion for the last node', () => {
    let state = createInitialGameState();
    state = gameReducer(state, { type: 'COMPLETE_NODE', nodeId: 1, totalQuestions: 3, correctFirstTry: 3 });
    state = gameReducer(state, { type: 'COMPLETE_REFLECTION', nodeId: 1 });
    expect(state.currentScreen).toBe('map');
    expect(state.currentPhase).toBeNull();

    state = createInitialGameState();
    state = gameReducer(state, { type: 'COMPLETE_NODE', nodeId: 5, totalQuestions: 5, correctFirstTry: 5 });
    state = gameReducer(state, { type: 'COMPLETE_REFLECTION', nodeId: 5 });
    expect(state.currentScreen).toBe('complete');
  });
});

describe('Game Reducer - Utility Actions and Selectors', () => {
  it('USE_HINT increments hints for the node', () => {
    const state = createInitialGameState();
    const oneHint = gameReducer(state, { type: 'USE_HINT', nodeId: 1 });
    const twoHints = gameReducer(oneHint, { type: 'USE_HINT', nodeId: 1 });

    expect(oneHint.nodes[0].hintsUsed).toBe(1);
    expect(twoHints.nodes[0].hintsUsed).toBe(2);
  });

  it('RESET restores initial state', () => {
    let state = createInitialGameState();
    state = gameReducer(state, { type: 'START_MISSION' });
    state = gameReducer(state, { type: 'BEGIN_JOURNEY' });
    state = gameReducer(state, { type: 'SELECT_NODE', nodeId: 1 });
    state = gameReducer(state, { type: 'RESET' });

    expect(state.currentScreen).toBe('welcome');
    expect(state.totalEnergy).toBe(0);
    expect(state.nodes[0].status).toBe('available');
    expect(state.badges).toHaveLength(0);
  });

  it('selectors expose current node state and mission progress', () => {
    let state = createInitialGameState();
    state = gameReducer(state, { type: 'SELECT_NODE', nodeId: 1 });
    state = gameReducer(state, { type: 'COMPLETE_NODE', nodeId: 1, totalQuestions: 3, correctFirstTry: 3 });

    const nodeStateById = selectNodeStateById(state);

    expect(nodeStateById.get(1).status).toBe('mastered');
    expect(selectCurrentNodeData(state)?.id).toBe(1);
    expect(selectCompletedCount(state)).toBe(1);
    expect(selectProgressPercent(state)).toBe(20);
  });
});
