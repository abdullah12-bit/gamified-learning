import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, MapPin, ArrowLeft, RotateCcw, Languages, Flame } from 'lucide-react';
import { getText } from '../data/uiText';
import './ProgressHeader.css';

export default function ProgressHeader() {
  const { currentScreen, totalEnergy, totalStars, currentStreak, nodes, currentNodeData, returnToMap, resetGame } = useGame();
  const { lang, isArabic, languageMeta, toggleLanguage, t } = useLanguage();

  const completedCount = nodes.filter(n => n.status === 'completed' || n.status === 'mastered').length;
  const currentNode = currentNodeData;
  const isCompact = currentScreen === 'welcome';

  return (
    <motion.header
      className={`progress-header ${isCompact ? 'progress-header--compact' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="banner"
    >
      <div className="uae-stripe" aria-hidden="true" />
      <div className="progress-header__inner">
        <div className="progress-header__left">
          <div className="progress-header__logo">
            <span className="progress-header__logo-icon" aria-hidden="true">⚡</span>
            <span className="progress-header__logo-text">TaqahQuest</span>
          </div>
          {currentNode && (
            <div className="progress-header__zone">
              <MapPin size={14} aria-hidden="true" />
              <span>{getText(currentNode, 'zone', lang)}</span>
            </div>
          )}
        </div>

        <div className="progress-header__right">
          {!isCompact && (
            <>
              <div className="progress-header__actions">
                {currentScreen !== 'map' && currentScreen !== 'story' && currentScreen !== 'complete' && (
                  <button type="button" className="header-btn" onClick={returnToMap} title={t('header.backToMap')} aria-label={t('header.backToMap')}>
                    <ArrowLeft size={16} aria-hidden="true" className="rtl-mirror" />
                    <span className="header-btn-text">{t('header.map')}</span>
                  </button>
                )}
                {currentScreen === 'map' && (
                  <button type="button" className="header-btn danger" onClick={resetGame} title={t('header.resetProgress')} aria-label={t('header.resetProgress')}>
                    <RotateCcw size={16} aria-hidden="true" />
                    <span className="header-btn-text">{t('common.reset')}</span>
                  </button>
                )}
              </div>
              <div className="progress-header__stat" title={t('completion.energy')} role="status" aria-label={t('header.energyPoints', { value: totalEnergy })}>
                <Zap size={16} className="stat-icon energy" aria-hidden="true" />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={totalEnergy}
                    className="stat-value mono"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {totalEnergy}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="progress-header__stat" title={t('completion.stars')} role="status" aria-label={t('header.starsEarned', { value: totalStars })}>
                <Star size={16} className="stat-icon star" aria-hidden="true" />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={totalStars}
                    className="stat-value mono"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {totalStars}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className={`progress-header__stat progress-header__stat--streak ${currentStreak > 0 ? 'is-active' : ''}`} title={t('map.currentStreak')} role="status" aria-label={t('header.streak', { value: currentStreak })}>
                <Flame size={16} className="stat-icon streak" aria-hidden="true" />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentStreak}
                    className="stat-value mono"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {currentStreak}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="progress-header__progress">
                <div className="progress-header__bar">
                  <motion.div
                    className="progress-header__bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / 5) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className="progress-header__bar-label" role="status" aria-label={t('header.zonesCompleted', { completed: completedCount, total: 5 })}>
                  {t('header.progressText', { completed: completedCount, total: 5 })}
                </span>
              </div>
            </>
          )}
          <button
            type="button"
            className="header-btn header-btn--language"
            onClick={toggleLanguage}
            title={t('language.toggle')}
            aria-label={t('language.current', { language: languageMeta.label })}
            aria-pressed={isArabic}
          >
            <Languages size={16} aria-hidden="true" />
            <span className="header-btn-text">{isArabic ? 'EN' : 'AR'}</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
