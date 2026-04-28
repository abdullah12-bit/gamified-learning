import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FeedbackOverlay.css';

export default function FeedbackOverlay({ type, message, explanation, onContinue }) {
  const { t } = useLanguage();
  const isCorrect = type === 'correct';
  const isHint = type === 'hint';

  return (
    <motion.div
      className="feedback-overlay"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`feedback-card feedback-card--${type}`}
        role="dialog"
        aria-live="polite"
        aria-modal="true"
        aria-labelledby="feedback-title"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="feedback-icon">
          {isCorrect && <CheckCircle size={40} aria-hidden="true" />}
          {type === 'incorrect' && <XCircle size={40} aria-hidden="true" />}
          {isHint && <Lightbulb size={40} aria-hidden="true" />}
        </div>
        <h4 className="feedback-title" id="feedback-title">
          {isCorrect ? t('feedback.correctTitle') : isHint ? t('feedback.hintTitle') : t('feedback.incorrectTitle')}
        </h4>
        <p className="feedback-message" aria-atomic="true">{message || explanation}</p>
        <button type="button" className="btn-primary feedback-btn" onClick={onContinue}>
          {isCorrect ? t('common.continue') : t('common.tryAgain')}
        </button>
      </motion.div>
    </motion.div>
  );
}
