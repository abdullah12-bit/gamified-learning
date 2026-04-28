import { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getArray, getText } from '../data/uiText';
import FeedbackOverlay from '../components/FeedbackOverlay';
import './FinalMission.css';

export default function FinalMission() {
  const { currentNodeId, getNodeData, getNodeState, answerQuestion, completeNode, setGuideMessage, saveActivityState } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);
  const nodeState = getNodeState(currentNodeId);
  const questions = node?.activity?.questions || [];
  const timeLimit = node?.activity?.timeLimit || 90;

  const savedState = nodeState?.activityState || {};
  const [currentQ, setCurrentQ] = useState(savedState.currentQ || 0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correctFirstTry, setCorrectFirstTry] = useState(savedState.correctFirstTry || 0);
  const [attempts, setAttempts] = useState(savedState.attempts || {});
  const [timeLeft, setTimeLeft] = useState(savedState.timeLeft ?? timeLimit);
  const [isComplete, setIsComplete] = useState(savedState.isComplete || false);
  const [powerSystems, setPowerSystems] = useState(savedState.powerSystems || 0);

  useEffect(() => {
    saveActivityState(currentNodeId, { currentQ, attempts, correctFirstTry, timeLeft, isComplete, powerSystems });
  }, [currentQ, attempts, correctFirstTry, timeLeft, isComplete, powerSystems, currentNodeId, saveActivityState]);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (isComplete) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isComplete]);

  const question = questions[currentQ];
  const qAttempts = attempts[question?.id] || 0;
  const timerPercent = (timeLeft / timeLimit) * 100;
  const handleSelect = useCallback((optionIndex) => {
    if (feedback) return;
    setSelected(optionIndex);
    const isCorrect = optionIndex === question.correct;
    const isFirstTry = qAttempts === 0;

    setAttempts(prev => ({ ...prev, [question.id]: (prev[question.id] || 0) + 1 }));
    answerQuestion(currentNodeId, question.id, isCorrect, isFirstTry);

    if (isCorrect) {
      if (isFirstTry) setCorrectFirstTry(prev => prev + 1);
      setPowerSystems(prev => prev + 1);
      setGuideMessage(t('final.onlineGuide'));
      setFeedback({ type: 'correct', message: getText(question, 'explanation', lang) });
    } else {
      setGuideMessage(t('final.hintGuide'));
      setFeedback({
        type: qAttempts === 0 ? 'hint' : 'incorrect',
        message: qAttempts === 0 ? t('final.hint') : getText(question, 'explanation', lang)
      });
    }
  }, [feedback, question, qAttempts, currentNodeId, answerQuestion, setGuideMessage, lang, t]);

  const handleContinue = useCallback(() => {
    if (feedback.type === 'correct') {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
        setFeedback(null);
      } else {
        setIsComplete(true);
        clearInterval(timerRef.current);
        setGuideMessage(t('final.completeGuide'));
        setTimeout(() => {
          completeNode(currentNodeId, questions.length, correctFirstTry);
        }, 2000);
      }
    } else {
      setSelected(null);
      setFeedback(null);
    }
  }, [feedback, currentQ, questions.length, currentNodeId, completeNode, correctFirstTry, setGuideMessage, t]);

  if (!question && !isComplete) return null;

  return (
    <div className="final screen">
      <div className="screen-content final__content">
        {/* Header */}
        <div className="final__header">
          <span className="final__label">🚀 {t('final.label')}</span>
        </div>

        {/* Timer bar */}
        <div className="final__timer">
          <div className="final__timer-bar">
            <motion.div
              className={`final__timer-fill ${timerPercent < 25 ? 'final__timer-fill--low' : ''}`}
              animate={{ width: `${timerPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="final__timer-label">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
        </div>

        {/* Power restoration progress */}
        <div className="final__systems">
          <span className="final__systems-label">{t('final.systemsRestored')}</span>
          <div className="final__systems-grid">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className={`final__system-dot ${i < powerSystems ? 'final__system-dot--on' : ''}`}
                animate={i < powerSystems ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <span className="final__systems-count">{powerSystems}/{questions.length}</span>
        </div>

        {/* Power-on celebration */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="final__power-on"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="final__burst"
                initial={{ scale: 0 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <motion.div
                className="final__success-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <div className="final__success-icon">⚡</div>
                <h2>{t('final.completeTitle')}</h2>
                <p>{t('final.completeMessage')}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question */}
        {!isComplete && (
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              className="final__question-card glass-panel"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="final__q-number">{t('final.questionNumber', { current: currentQ + 1, total: questions.length })}</div>
              
              <fieldset className="final__fieldset">
                <legend className="final__question">{getText(question, 'question', lang)}</legend>
                <div className="final__options">
                  {getArray(question, 'options', lang).map((option, i) => {
                    const isSelected = selected === i;
                    let optionStateClass = '';
                    if (isSelected) {
                      optionStateClass = i === question.correct ? 'final__option--correct' : 'final__option--wrong';
                    }

                    return (
                      <motion.button
                        key={i}
                        type="button"
                        className={`final__option ${optionStateClass}`}
                        onClick={() => handleSelect(i)}
                        disabled={feedback !== null}
                        aria-pressed={isSelected}
                        whileHover={!feedback ? { scale: 1.01 } : {}}
                        whileTap={!feedback ? { scale: 0.99 } : {}}
                      >
                        <span className="final__option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                        <span className="final__option-text">{option}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </fieldset>
            </motion.div>
          </AnimatePresence>
        )}

        <AnimatePresence>
          {feedback && (
            <FeedbackOverlay
              type={feedback.type}
              message={feedback.message}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
