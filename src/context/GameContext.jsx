import { createContext, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';
import { clearProgress, fetchNodes, loadProgress, saveProgress } from '../services/learningApi';
import { createInitialGameState, gameReducer, mergeSavedState } from '../state/gameReducer';
import {
  NODE_DATA_BY_ID,
  selectCurrentNodeData,
  selectCurrentNodeState,
  selectNodeStateById,
} from '../state/gameSelectors';

const GameContext = createContext(null);
const initialState = createInitialGameState(fetchNodes());

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      return mergeSavedState(initial, loadProgress());
    }
    return initial;
  });

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const nodeStateById = useMemo(() => selectNodeStateById(state), [state]);

  const navigate = useCallback((screen) => dispatch({ type: 'NAVIGATE', screen }), []);
  const startMission = useCallback(() => dispatch({ type: 'START_MISSION' }), []);
  const beginJourney = useCallback(() => dispatch({ type: 'BEGIN_JOURNEY' }), []);
  const selectNode = useCallback((nodeId) => dispatch({ type: 'SELECT_NODE', nodeId }), []);
  const startActivity = useCallback(() => dispatch({ type: 'START_ACTIVITY' }), []);
  const answerQuestion = useCallback((nodeId, questionId, isCorrect, isFirstTry) =>
    dispatch({ type: 'ANSWER_QUESTION', nodeId, questionId, isCorrect, isFirstTry }), []);
  const completeNode = useCallback((nodeId, totalQuestions, correctFirstTry) =>
    dispatch({ type: 'COMPLETE_NODE', nodeId, totalQuestions, correctFirstTry }), []);
  const completeReflection = useCallback((nodeId) =>
    dispatch({ type: 'COMPLETE_REFLECTION', nodeId }), []);
  const useHint = useCallback((nodeId) =>
    dispatch({ type: 'USE_HINT', nodeId }), []);
  const returnToMap = useCallback(() => dispatch({ type: 'RETURN_TO_MAP' }), []);
  const resetGame = useCallback(() => {
    clearProgress();
    dispatch({ type: 'RESET' });
  }, []);
  const setGuideMessage = useCallback((message, tone) => dispatch({ type: 'SET_GUIDE_MESSAGE', message, tone }), []);
  const selectClassifyItem = useCallback((itemId) => dispatch({ type: 'SELECT_CLASSIFY_ITEM', itemId }), []);
  const clearSelectedItem = useCallback(() => dispatch({ type: 'CLEAR_SELECTED_ITEM' }), []);
  const saveActivityState = useCallback((nodeId, activityState) => dispatch({ type: 'SAVE_ACTIVITY_STATE', nodeId, activityState }), []);
  const getNodeData = useCallback((id) => (id == null ? null : NODE_DATA_BY_ID.get(id) ?? null), []);
  const getNodeState = useCallback((id) => (id == null ? null : nodeStateById.get(id) ?? null), [nodeStateById]);

  const currentNodeData = selectCurrentNodeData(state);
  const currentNodeState = selectCurrentNodeState(state);

  const value = {
    ...state,
    currentNodeData,
    currentNodeState,
    navigate, startMission, beginJourney, selectNode, startActivity,
    answerQuestion, completeNode, completeReflection, useHint, returnToMap, resetGame, setGuideMessage,
    selectClassifyItem, clearSelectedItem, saveActivityState, dispatch,
    getNodeData,
    getNodeState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
