import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { GUIDE_MESSAGES, GUIDE_MESSAGES_AR } from '../data/nodes';
import { getText, UI_TEXT } from '../data/uiText';
import { motion, AnimatePresence } from 'framer-motion';
import './GuideCharacter.css';

export default function GuideCharacter() {
  const { currentScreen, guideMessage, guideTone, currentPhase, currentNodeData } = useGame();
  const { lang, t } = useLanguage();

  if (currentScreen === 'welcome' || currentScreen === 'complete') return null;

  const guideMessages = lang === 'ar' ? GUIDE_MESSAGES_AR : GUIDE_MESSAGES;
  const screenKey = currentPhase === 'activity' ? getActivityKey(currentScreen) : currentScreen;
  const fallbackMessage = guideMessages[screenKey] || guideMessages[currentScreen] || guideMessages.map;
  const contextualMessage = getContextualGuideMessage(currentNodeData, currentScreen, currentPhase, lang);
  const message = getLocalizedGuideMessage(guideMessage, lang) || contextualMessage || fallbackMessage;

  return (
    <motion.div
      className={`guide-character guide-character--${guideTone || 'idle'}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      role="complementary"
      aria-label={t('app.guideLabel')}
    >
      <div className="guide-avatar" aria-hidden="true">
        <div className="guide-avatar__face">
          <div className="guide-avatar__eyes">
            <span className="guide-avatar__eye" />
            <span className="guide-avatar__eye" />
          </div>
          <div className="guide-avatar__mouth" />
          <div className="guide-avatar__antenna">
            <div className="guide-avatar__antenna-ball" />
          </div>
        </div>
        <div className="guide-avatar__status" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          className="guide-bubble"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="guide-name">Zap</span>
          <p className="guide-text">{message}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function getActivityKey(screen) {
  if (screen === 'activity') return 'quiz';
  return screen;
}

function getContextualGuideMessage(node, screen, phase, lang) {
  if (!node) return null;
  if (phase === 'activity' || screen === 'activity') return getText(node, 'activityGuide', lang);
  if (phase === 'lesson' || screen === 'lesson') return getText(node, 'guidePrompt', lang);
  return null;
}

function getLocalizedGuideMessage(message, lang) {
  if (!message) return null;

  const targetGuideMessages = lang === 'ar' ? GUIDE_MESSAGES_AR : GUIDE_MESSAGES;
  const guideKey = findMessageKey(message, GUIDE_MESSAGES) || findMessageKey(message, GUIDE_MESSAGES_AR);
  if (guideKey) return targetGuideMessages[guideKey] || message;

  const targetUiText = UI_TEXT[lang] || UI_TEXT.en;
  const uiKey = findMessageKey(message, UI_TEXT.en) || findMessageKey(message, UI_TEXT.ar);
  if (uiKey) return targetUiText[uiKey] || message;

  if (lang === 'ar' && isEnglishOnly(message)) return null;
  if (lang === 'en' && isArabicOnly(message)) return null;

  return message;
}

function findMessageKey(message, table) {
  return Object.entries(table).find(([, value]) => value === message)?.[0];
}

function isEnglishOnly(message) {
  return /[A-Za-z]/.test(message) && !/[\u0600-\u06FF]/.test(message);
}

function isArabicOnly(message) {
  return /[\u0600-\u06FF]/.test(message) && !/[A-Za-z]/.test(message);
}
