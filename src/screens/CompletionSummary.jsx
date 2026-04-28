import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Map } from 'lucide-react';
import { BADGES, NODES } from '../data/nodes';
import { getText } from '../data/uiText';
import StarRating from '../components/StarRating';
import './CompletionSummary.css';

export default function CompletionSummary() {
  const { totalEnergy, totalStars, bestStreak, nodes, badges, resetGame, returnToMap } = useGame();
  const { lang, t } = useLanguage();

  const earnedBadges = BADGES.filter(b => badges.includes(b.id));

  return (
    <div className="completion screen">
      {/* Confetti */}
      <div className="completion__confetti">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="completion__confetti-piece"
            style={{
              '--x': `${Math.random() * 100}vw`,
              '--delay': `${Math.random() * 2}s`,
              '--duration': `${2 + Math.random() * 3}s`,
              '--color': ['#00866E', '#C9963A', '#1E6FD9', '#15803D', '#D97706'][i % 5],
              '--size': `${6 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      <div className="screen-content completion__content">
        <motion.div
          className="completion__hero certificate-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          style={{ borderTop: '4px solid #C8102E', borderBottom: '4px solid #000000', position: 'relative' }}
        >
          <div className="uae-stripe" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
          <div className="completion__trophy">
            <Trophy size={48} color="#C9963A" aria-hidden="true" />
          </div>
          <h1 className="completion__title">{t('completion.title')}</h1>
          <h2 className="completion__certificate-title text-primary font-bold my-2">{t('completion.certificate')}</h2>
          <p className="completion__subtitle">
            {t('completion.subtitle')}
          </p>
        </motion.div>

        {/* Score summary */}
        <motion.div
          className="completion__scores glass-panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="completion__score-item">
            <span className="completion__score-label">{t('completion.energy')}</span>
            <span className="completion__score-value completion__score-value--energy">
              {totalEnergy}
            </span>
          </div>
          <div className="completion__score-divider" />
          <div className="completion__score-item">
            <span className="completion__score-label">{t('completion.stars')}</span>
            <span className="completion__score-value completion__score-value--stars">
              {totalStars}/15
            </span>
          </div>
          <div className="completion__score-divider" />
          <div className="completion__score-item">
            <span className="completion__score-label">{t('completion.zones')}</span>
            <span className="completion__score-value completion__score-value--zones">
              5/5
            </span>
          </div>
          <div className="completion__score-divider" />
          <div className="completion__score-item">
            <span className="completion__score-label">{t('completion.bestStreak')}</span>
            <span className="completion__score-value completion__score-value--streak">
              {bestStreak}
            </span>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="completion__badges"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="completion__section-title">{t('completion.badges')}</h3>
          <div className="completion__badges-grid">
            {earnedBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                className="completion__badge"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 200 }}
              >
                <div className="completion__badge-icon" aria-hidden="true">{badge.icon}</div>
                <span className="completion__badge-label">{getText(badge, 'label', lang)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Zone breakdown */}
        <motion.div
          className="completion__zones"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="completion__section-title">{t('completion.zoneResults')}</h3>
          <div className="completion__zones-list">
            {nodes.map((nodeState, i) => {
              const nodeData = NODES[i];
              return (
                <div key={nodeState.id} className="completion__zone-row">
                  <span className="completion__zone-icon" aria-hidden="true">{nodeData.icon}</span>
                  <span className="completion__zone-name">{getText(nodeData, 'title', lang)}</span>
                  <StarRating stars={nodeState.stars} size={14} animated />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="completion__actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button type="button" className="btn-primary" onClick={resetGame}>
            <RotateCcw size={18} aria-hidden="true" /> {t('completion.replay')}
          </button>
          <button type="button" className="btn-secondary" onClick={returnToMap}>
            <Map size={18} aria-hidden="true" /> {t('completion.returnToMap')}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
