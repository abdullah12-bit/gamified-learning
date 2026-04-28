import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Lightbulb, MapPin, Sparkles } from 'lucide-react';
import { getArray, getText } from '../data/uiText';
import './LessonPanel.css';

export default function LessonPanel() {
  const { currentNodeData, startActivity } = useGame();
  const { lang, t } = useLanguage();
  const node = currentNodeData;
  if (!node) return null;

  const { lesson } = node;

  return (
    <div className="lesson screen">
      <div className="screen-content lesson__content">
        <motion.div
          className="lesson__header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="lesson__node-icon">{node.icon}</span>
          <span className="lesson__node-label">{t('lesson.zone', { id: node.id, zone: getText(node, 'zone', lang) })}</span>
        </motion.div>

        {node.objective && (
          <motion.div
            className="lesson__objective"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            role="note"
            aria-label={t('lesson.objectiveLabel')}
          >
            <span className="lesson__objective-icon" aria-hidden="true">🎯</span>
            <span className="lesson__objective-text">{getText(node, 'objective', lang)}</span>
          </motion.div>
        )}

        <motion.div
          className="lesson__card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="lesson__card-header">
            <BookOpen size={20} className="lesson__card-icon" aria-hidden="true" />
            <h3>{getText(lesson, 'title', lang)}</h3>
            <span className="lesson__action-chip" aria-label={t('lesson.actionLabel')}>
              <Sparkles size={14} aria-hidden="true" />
              {getText(node, 'studentAction', lang)}
            </span>
          </div>

          <div className="lesson__paragraphs">
            {getArray(lesson, 'paragraphs', lang).map((para, i) => (
              <motion.p
                key={i}
                className="lesson__paragraph"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {node.uaeLink && (
            <motion.div
              className="lesson__uae-link"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.4 }}
              role="note"
              aria-label={t('lesson.uaeLinkLabel')}
            >
              <MapPin size={18} aria-hidden="true" />
              <div>
                <strong>{t('lesson.uaeLinkLabel')}</strong>
                <span>{getText(node, 'uaeLink', lang)}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            className="lesson__key-point"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <Lightbulb size={18} aria-hidden="true" />
            <span>{getText(lesson, 'keyPoint', lang)}</span>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="btn-primary lesson__cta"
          onClick={startActivity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('lesson.startActivity')} <ArrowRight size={18} aria-hidden="true" className="rtl-mirror" />
        </motion.button>
      </div>
    </div>
  );
}
