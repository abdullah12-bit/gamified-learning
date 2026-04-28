import { beforeEach, describe, expect, it } from 'vitest';
import { NODES } from '../data/nodes';
import {
  PROGRESS_SCHEMA_VERSION,
  clearProgress,
  fetchNodes,
  loadProgress,
  migrateProgress,
  saveProgress,
} from '../services/learningApi';
import { createInitialGameState } from '../state/gameReducer';

describe('learningApi service boundary', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the current static learning path', () => {
    expect(fetchNodes()).toBe(NODES);
    expect(fetchNodes()).toHaveLength(5);
  });

  it('saves progress in a versioned envelope', () => {
    const state = {
      ...createInitialGameState(),
      currentScreen: 'map',
      totalEnergy: 45,
    };

    saveProgress(state);

    const stored = JSON.parse(localStorage.getItem('inte_game_state'));
    expect(stored.schemaVersion).toBe(PROGRESS_SCHEMA_VERSION);
    expect(stored.state.currentScreen).toBe('map');
    expect(stored.state.totalEnergy).toBe(45);
  });

  it('loads versioned progress', () => {
    const state = {
      ...createInitialGameState(),
      currentScreen: 'lesson',
      currentNodeId: 2,
    };

    localStorage.setItem('inte_game_state', JSON.stringify({
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      state,
    }));

    expect(loadProgress()).toMatchObject({
      currentScreen: 'lesson',
      currentNodeId: 2,
    });
  });

  it('migrates the previous raw localStorage state shape', () => {
    const legacy = {
      currentScreen: 'activity',
      currentNodeId: 1,
      nodes: [{ id: 1, status: 'in-progress', stars: 0 }],
      totalEnergy: 15,
      totalStars: 0,
      badges: [],
    };

    expect(migrateProgress(legacy)).toMatchObject({
      currentScreen: 'activity',
      currentNodeId: 1,
      totalEnergy: 15,
    });
  });

  it('clears saved progress', () => {
    saveProgress(createInitialGameState());
    clearProgress();
    expect(localStorage.getItem('inte_game_state')).toBeNull();
  });
});
