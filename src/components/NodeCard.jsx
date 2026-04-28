import { motion } from 'framer-motion';
import { Lock, Check, Crown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getText } from '../data/uiText';
import StarRating from './StarRating';
import './NodeCard.css';

export default function NodeCard({ node, state, index, onSelect }) {
  const { lang, t } = useLanguage();
  const isLocked = state.status === 'locked';
  const isAvailable = state.status === 'available';
  const isCompleted = state.status === 'completed' || state.status === 'mastered';
  const isMastered = state.status === 'mastered';
  const statusLabel = isLocked
    ? t('map.locked')
    : isMastered
      ? t('map.mastered')
      : isCompleted
        ? t('map.completed')
        : state.status === 'in-progress'
          ? t('map.inProgress')
          : t('map.ready');

  return (
    <motion.button
      type="button"
      className={`node-card node-card--${state.status}`}
      onClick={!isLocked ? onSelect : undefined}
      disabled={isLocked}
      aria-label={`${index + 1}. ${getText(node, 'title', lang)}. ${statusLabel}. ${getText(node, 'impact', lang)}`}
      whileHover={!isLocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      style={{ '--node-color': node.color }}
    >
      <div className="node-card__number">
        {isCompleted ? (
          isMastered ? <Crown size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />
        ) : isLocked ? (
          <Lock size={16} aria-hidden="true" />
        ) : (
          <span>{index + 1}</span>
        )}
      </div>

      <div className="node-card__icon" aria-hidden="true">{node.icon}</div>

      <div className="node-card__info">
        <h3 className="node-card__title">{getText(node, 'title', lang)}</h3>
        <div className="node-card__zone">{getText(node, 'zone', lang)}</div>
        <div className="node-card__impact">{getText(node, 'impact', lang)}</div>
      </div>

      <div className="node-card__right">
        {isCompleted && <StarRating stars={state.stars} size={16} />}
        {isAvailable && <span className="node-card__badge">{t('map.ready')}</span>}
        {state.status === 'in-progress' && <span className="node-card__badge node-card__badge--progress">{t('map.inProgress')}</span>}
        {isLocked && <span className="node-card__badge node-card__badge--locked">{t('map.locked')}</span>}
      </div>

      {isAvailable && <div className="node-card__glow" />}
    </motion.button>
  );
}
