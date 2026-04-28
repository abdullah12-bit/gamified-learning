import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getArray, getText } from '../data/uiText';
import FeedbackOverlay from '../components/FeedbackOverlay';
import './QuizInteraction.css';

export default function QuizInteraction() {
  const { currentNodeId, getNodeData, getNodeState, answerQuestion, completeNode, setGuideMessage, saveActivityState } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);
  const nodeState = getNodeState(currentNodeId);
  const questions = node?.activity?.questions || [];

  const savedState = nodeState?.activityState || {};
  const [currentQ, setCurrentQ] = useState(savedState.currentQ || 0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(savedState.attempts || {});
  const [correctFirstTry, setCorrectFirstTry] = useState(savedState.correctFirstTry || 0);

  const question = questions[currentQ];
  const qAttempts = attempts[question?.id] || 0;

  useEffect(() => {
    saveActivityState(currentNodeId, { currentQ, attempts, correctFirstTry });
  }, [currentQ, attempts, correctFirstTry, currentNodeId, saveActivityState]);

  const handleSelect = useCallback((optionIndex) => {
    if (feedback) return;
    setSelected(optionIndex);
    const isCorrect = optionIndex === question.correct;
    const isFirstTry = qAttempts === 0;

    setAttempts(prev => ({ ...prev, [question.id]: (prev[question.id] || 0) + 1 }));
    answerQuestion(currentNodeId, question.id, isCorrect, isFirstTry);

    if (isCorrect) {
      if (isFirstTry) setCorrectFirstTry(prev => prev + 1);
      setGuideMessage(t('feedback.correctTitle'));
      setFeedback({ type: 'correct', message: getText(question, 'explanation', lang) });
    } else {
      setGuideMessage(t('feedback.incorrectTitle'));
      if (qAttempts === 0) {
        setFeedback({ type: 'hint', message: getText(question, 'hint', lang) });
      } else {
        setFeedback({ type: 'incorrect', message: getText(question, 'explanation', lang) });
      }
    }
  }, [feedback, question, qAttempts, currentNodeId, answerQuestion, setGuideMessage, lang, t]);

  const handleContinue = useCallback(() => {
    if (feedback.type === 'correct') {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
        setFeedback(null);
      } else {
        completeNode(currentNodeId, questions.length, correctFirstTry);
      }
    } else {
      setSelected(null);
      setFeedback(null);
    }
  }, [feedback, currentQ, questions.length, currentNodeId, completeNode, correctFirstTry, qAttempts]);

  if (!question) return null;

  return (
    <div className="quiz screen">
      <div className="screen-content quiz__content">
        <div className="quiz__header">
          <span className="quiz__node-label">{node.icon} {getText(node, 'title', lang)}</span>
          <span className="quiz__progress">{t('quiz.progress', { current: currentQ + 1, total: questions.length })}</span>
        </div>

        <div className="progress-dots">
          {questions.map((_, i) => (
            <div key={i} className={`progress-dot ${i === currentQ ? 'active' : i < currentQ ? 'completed' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            className="quiz__question-card glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="quiz__question">{getText(question, 'question', lang)}</h3>

            <div className="quiz__options">
              {getArray(question, 'options', lang).map((option, i) => (
                <motion.button
                  key={i}
                  className={`quiz__option ${selected === i ? (i === question.correct ? 'quiz__option--correct' : 'quiz__option--wrong') : ''}`}
                  onClick={() => handleSelect(i)}
                  disabled={feedback !== null}
                  aria-label={t('quiz.optionLabel', { letter: String.fromCharCode(65 + i), text: option })}
                  whileHover={!feedback ? { scale: 1.01 } : {}}
                  whileTap={!feedback ? { scale: 0.99 } : {}}
                >
                  <span className="quiz__option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                  <span className="quiz__option-text">{option}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

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
