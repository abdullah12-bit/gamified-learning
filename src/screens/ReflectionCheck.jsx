import { useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { getArray, getText } from '../data/uiText';
import './ReflectionCheck.css';

/*
  REFLECTION CHECK — Shown after every activity, before returning to map.
  Presents a real-world UAE-contextual transfer question.
*/
export default function ReflectionCheck() {
  const { currentNodeId, getNodeData, completeReflection, setGuideMessage } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);
  const reflection = node?.reflection;

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = useCallback((idx) => {
    if (feedback) return;
    setSelected(idx);
    const isCorrect = idx === reflection.correct;
    if (isCorrect) {
      setFeedback('correct');
      setGuideMessage(t('reflection.correctGuide'));
    } else {
      setFeedback('wrong');
      setGuideMessage(t('reflection.wrongGuide'));
    }
  }, [feedback, reflection, setGuideMessage, t]);

  const handleContinue = useCallback(() => {
    completeReflection(currentNodeId);
  }, [currentNodeId, completeReflection]);

  if (!reflection) return null;

  return (
    <div className="reflection screen">
      <div className="screen-content reflection__content">
        <motion.div
          className="reflection__header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="reflection__badge">🌍 {t('reflection.badge')}</span>
        </motion.div>

        <motion.div
          className="reflection__card card-elevated"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="reflection__question">{getText(reflection, 'question', lang)}</h3>

          <div className="reflection__options" role="radiogroup" aria-label={t('reflection.answerChoices')}>
            {getArray(reflection, 'options', lang).map((opt, i) => (
              <motion.button
                key={i}
                className={`reflection__option ${
                  selected === i
                    ? i === reflection.correct
                      ? 'reflection__option--correct'
                      : 'reflection__option--wrong'
                    : ''
                }`}
                onClick={() => handleSelect(i)}
                disabled={feedback !== null}
                role="radio"
                aria-checked={selected === i}
                aria-label={t('quiz.optionLabel', { letter: String.fromCharCode(65 + i), text: opt })}
                whileHover={!feedback ? { scale: 1.01 } : {}}
              >
                <span className="reflection__option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                <span className="reflection__option-text">{opt}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                className={`reflection__feedback reflection__feedback--${feedback}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {feedback === 'correct' ? (
                  <CheckCircle size={20} className="reflection__feedback-icon" />
                ) : (
                  <XCircle size={20} className="reflection__feedback-icon" />
                )}
                <p>{getText(reflection, 'explanation', lang)}</p>
                <button className="btn-primary" onClick={handleContinue}>
                  {t('reflection.continue')} <ArrowRight size={16} className="rtl-mirror" aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
