import { NODES } from '../data/nodes';

export const PROGRESS_STORAGE_KEY = 'inte_game_state';
export const PROGRESS_SCHEMA_VERSION = 1;

export function fetchNodes() {
  return NODES;
}

export function migrateProgress(savedProgress) {
  if (!savedProgress || typeof savedProgress !== 'object') return null;

  if (
    savedProgress.schemaVersion === PROGRESS_SCHEMA_VERSION &&
    savedProgress.state &&
    typeof savedProgress.state === 'object'
  ) {
    return savedProgress.state;
  }

  if (Array.isArray(savedProgress.nodes) && typeof savedProgress.currentScreen === 'string') {
    return savedProgress;
  }

  return null;
}

export function loadProgress(storage = localStorage) {
  try {
    const saved = storage.getItem(PROGRESS_STORAGE_KEY);
    if (!saved) return null;
    return migrateProgress(JSON.parse(saved));
  } catch (error) {
    console.error('Failed to parse saved progress', error);
    return null;
  }
}

export function saveProgress(state, storage = localStorage) {
  storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    state,
  }));
}

export function clearProgress(storage = localStorage) {
  storage.removeItem(PROGRESS_STORAGE_KEY);
}
