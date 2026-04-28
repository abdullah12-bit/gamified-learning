import { useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useLanguage } from './context/LanguageContext';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { getText } from './data/uiText';
import ProgressHeader from './components/ProgressHeader';
import GuideCharacter from './components/GuideCharacter';
import WelcomeHero from './screens/WelcomeHero';
import StoryIntro from './screens/StoryIntro';
import LearningPathMap from './screens/LearningPathMap';
import LessonPanel from './screens/LessonPanel';
import ReflectionCheck from './screens/ReflectionCheck';

import QuizInteraction from './screens/QuizInteraction';
import ClassificationInteraction from './screens/ClassificationInteraction';
import RepairChallenge from './screens/RepairChallenge';
import FinalMission from './screens/FinalMission';
import CompletionSummary from './screens/CompletionSummary';
import CircuitBuilder from './screens/CircuitBuilder';
import CircuitLab from './screens/CircuitLab';

const ACTIVITY_SCREENS = {
  builder: CircuitBuilder,
  quiz: QuizInteraction,
  classify: ClassificationInteraction,
  lab: CircuitLab,
  repair: RepairChallenge,
  final: FinalMission,
};

function AppContent() {
  const { currentScreen, currentPhase, currentNodeId, currentNodeData } = useGame();
  const { lang, t } = useLanguage();
  const ActivityScreen = currentNodeData
    ? ACTIVITY_SCREENS[currentNodeData.activity.type] ?? QuizInteraction
    : null;

  const screenKey = currentPhase === 'reflection' ? `reflection-${currentNodeId}` :
    currentPhase === 'activity' ? `activity-${currentNodeId}` : currentScreen;

  // Dynamic document title per screen
  useEffect(() => {
    const nodeTitle = getText(currentNodeData, 'title', lang);
    const dynamicTitle = nodeTitle
      ? currentScreen === 'activity'
        ? t('app.activityTitle', { title: nodeTitle })
        : t('app.lessonTitle', { title: nodeTitle })
      : null;

    const staticTitleKey = {
      welcome: 'app.welcomeTitle',
      story: 'app.storyTitle',
      map: 'app.mapTitle',
      reflection: 'app.reflectionTitle',
      complete: 'app.completeTitle',
    }[currentScreen];

    document.title = dynamicTitle ?? (staticTitleKey ? t(staticTitleKey) : t('app.defaultTitle'));
  }, [currentScreen, currentNodeData, lang, t]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">{t('app.skipLink')}</a>
      <div className="bg-pattern" />
      <ProgressHeader />

      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {currentScreen === 'welcome' && <WelcomeHero />}
            {currentScreen === 'story' && <StoryIntro />}
            {currentScreen === 'map' && <LearningPathMap />}
            {currentScreen === 'lesson' && currentPhase === 'lesson' && <LessonPanel />}
            {currentScreen === 'activity' && currentPhase === 'activity' && ActivityScreen && <ActivityScreen />}
            {currentScreen === 'reflection' && currentPhase === 'reflection' && <ReflectionCheck />}
            {currentScreen === 'complete' && <CompletionSummary />}
          </motion.div>
        </AnimatePresence>
      </main>

      <GuideCharacter />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
