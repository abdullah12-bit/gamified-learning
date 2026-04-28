import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { getText } from '../data/uiText';
import './StoryIntro.css';

const STORY_CARDS = [
  {
    title: 'The Lab Has Gone Dark',
    titleAr: 'انطفأ المختبر',
    text: 'The UAE Future Energy Lab — a cutting-edge research facility in Masdar City — has lost power across all its zones just hours before a global clean-energy showcase. Systems are down.',
    textAr: 'فقد مختبر الطاقة المستقبلي في الإمارات - وهو مركز بحثي متقدم في مدينة مصدر - الطاقة في جميع مناطقه قبل ساعات من عرض عالمي للطاقة النظيفة. الأنظمة متوقفة.',
    icon: '🏙️',
  },
  {
    title: 'Your Mission / المهمة',
    titleAr: 'مهمتك / Mission',
    text: 'You\'ll progress through 5 zones, each with a unique electricity challenge. Learn the concepts, complete the activities, and bring each zone back online — one by one.',
    textAr: 'ستتقدم عبر 5 مناطق، في كل منطقة تحد كهربائي مختلف. تعلم المفاهيم، أكمل الأنشطة، وأعد كل منطقة للعمل واحدة تلو الأخرى.',
    icon: '🎯',
  },
  {
    title: 'Meet Zap, Your Assistant',
    titleAr: 'تعرف إلى زاب، مساعدك',
    text: 'Zap is a friendly AI bot who\'ll guide you through each challenge. If you get stuck, Zap will offer hints. Earn energy points and badges as you go. Ready?',
    textAr: 'زاب مساعد ذكي وودود سيرشدك في كل تحد. إذا احتجت مساعدة، سيقدم لك تلميحات. اجمع نقاط الطاقة والشارات أثناء تقدمك. هل أنت جاهز؟',
    icon: '🤖',
  },
];

export default function StoryIntro() {
  const { beginJourney } = useGame();
  const { lang, t } = useLanguage();
  const [currentCard, setCurrentCard] = useState(0);
  const isLast = currentCard === STORY_CARDS.length - 1;
  const storyProgressLabel = t('story.progress', { current: currentCard + 1, total: STORY_CARDS.length });

  const handleNext = () => {
    if (isLast) {
      beginJourney();
    } else {
      setCurrentCard(c => c + 1);
    }
  };

  const card = STORY_CARDS[currentCard];

  return (
    <div className="story screen">
      <div className="screen-content story__content">
        <div className="progress-dots" role="status" aria-label={storyProgressLabel}>
          {STORY_CARDS.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i === currentCard ? 'active' : i < currentCard ? 'completed' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            className="story__card glass-panel"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <div className="story__icon">{card.icon}</div>
            <h2 className="story__title">{getText(card, 'title', lang)}</h2>
            <p className="story__text">{getText(card, 'text', lang)}</p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          type="button"
          className="btn-primary story__cta"
          onClick={handleNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLast ? (
            <>{t('story.begin')} <ArrowRight size={18} aria-hidden="true" className="rtl-mirror" /></>
          ) : (
            <>{t('common.next')} <ChevronRight size={18} aria-hidden="true" className="rtl-mirror" /></>
          )}
        </motion.button>
      </div>
    </div>
  );
}
