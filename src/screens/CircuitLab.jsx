import { useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleLeft, ToggleRight, ArrowRight } from 'lucide-react';
import { getArray, getText } from '../data/uiText';
import './CircuitLab.css';

/*
  LIVE CIRCUIT LAB — Node 3 Innovative Interaction
  Students toggle switches on series vs parallel circuits
  and see bulbs light up / go dark in real-time.
  They observe the difference, THEN answer questions.
*/

const EXPERIMENTS = [
  {
    id: 'exp1',
    title: 'Experiment 1: Series Circuit',
    titleAr: 'التجربة 1: دائرة التوالي (Series)',
    instruction: 'This circuit has 3 bulbs in SERIES (one path). Try toggling each switch to see what happens!',
    instructionAr: 'هذه الدائرة فيها 3 مصابيح على التوالي (مسار واحد). جرّب تبديل كل مفتاح ولاحظ ما يحدث.',
    type: 'series',
    bulbs: [
      { id: 'b1', label: 'Bulb A', labelAr: 'المصباح أ', x: 120, y: 80 },
      { id: 'b2', label: 'Bulb B', labelAr: 'المصباح ب', x: 220, y: 80 },
      { id: 'b3', label: 'Bulb C', labelAr: 'المصباح ج', x: 320, y: 80 },
    ],
    // In series: removing ANY bulb breaks the whole circuit
    getActiveBulbs: (switches) => {
      const allOn = switches.b1 && switches.b2 && switches.b3;
      return { b1: allOn, b2: allOn, b3: allOn };
    },
    observation: 'In series, if ANY switch is off, ALL bulbs go dark — there\'s only one path!',
    observationAr: 'في التوالي، إذا أُطفئ أي مفتاح تنطفئ كل المصابيح، لأن هناك مساراً واحداً فقط.',
  },
  {
    id: 'exp2',
    title: 'Experiment 2: Parallel Circuit',
    titleAr: 'التجربة 2: دائرة التوازي (Parallel)',
    instruction: 'Now the SAME 3 bulbs are in PARALLEL (separate paths). Toggle switches again!',
    instructionAr: 'الآن المصابيح الثلاثة نفسها موصلة على التوازي (مسارات منفصلة). بدّل المفاتيح مرة أخرى.',
    type: 'parallel',
    bulbs: [
      { id: 'b1', label: 'Bulb A', labelAr: 'المصباح أ', x: 120, y: 60 },
      { id: 'b2', label: 'Bulb B', labelAr: 'المصباح ب', x: 220, y: 160 },
      { id: 'b3', label: 'Bulb C', labelAr: 'المصباح ج', x: 320, y: 260 },
    ],
    // In parallel: each bulb is independent
    getActiveBulbs: (switches) => ({
      b1: switches.b1,
      b2: switches.b2,
      b3: switches.b3,
    }),
    observation: 'In parallel, each bulb works independently — turning one off doesn\'t affect the others!',
    observationAr: 'في التوازي، يعمل كل مصباح بشكل مستقل، وإطفاء واحد لا يؤثر في الآخرين.',
  },
  {
    id: 'exp3',
    title: 'Challenge: Which Setup?',
    titleAr: 'التحدي: أي توصيل؟',
    instruction: 'The hospital needs lights that stay on even if one breaks. Which circuit should they use?',
    instructionAr: 'يحتاج المستشفى إلى أضواء تبقى مضاءة حتى لو تعطل مصباح واحد. أي دائرة يجب استخدامها؟',
    type: 'challenge',
    question: 'Based on what you observed, which circuit type should a hospital use for critical lights?',
    questionAr: 'بناءً على ما لاحظته، أي نوع دائرة يجب أن يستخدمه المستشفى لأضواء السلامة المهمة؟',
    options: ['Series — so all lights are equally bright', 'Parallel — so lights work independently'],
    optionsAr: ['التوالي (Series) - حتى تكون كل الأضواء بنفس السطوع', 'التوازي (Parallel) - حتى تعمل الأضواء بشكل مستقل'],
    correct: 1,
    explanation: 'Hospitals use parallel circuits for critical systems. If one light fails, the others keep working — exactly what you saw in Experiment 2!',
    explanationAr: 'تستخدم المستشفيات دوائر التوازي للأنظمة المهمة. إذا تعطل مصباح واحد تستمر المصابيح الأخرى في العمل، تماماً كما رأيت في التجربة الثانية.',
  },
];

export default function CircuitLab() {
  const { currentNodeId, getNodeData, answerQuestion, completeNode, setGuideMessage } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);

  const [currentExp, setCurrentExp] = useState(0);
  const [switches, setSwitches] = useState({ b1: true, b2: true, b3: true });
  const [hasToggled, setHasToggled] = useState(false);
  const [showObservation, setShowObservation] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState(null);
  const [challengeFeedback, setChallengeFeedback] = useState(null);
  const [experimentsScore, setExperimentsScore] = useState(0);

  const experiment = EXPERIMENTS[currentExp];
  const activeBulbs = experiment.getActiveBulbs ? experiment.getActiveBulbs(switches) : {};

  const handleToggle = useCallback((bulbId) => {
    setSwitches(prev => ({ ...prev, [bulbId]: !prev[bulbId] }));
    setHasToggled(true);
  }, []);

  const handleShowObservation = useCallback(() => {
    setShowObservation(true);
    answerQuestion(currentNodeId, experiment.id, true, true);
    setGuideMessage(getText(experiment, 'observation', lang));
  }, [currentNodeId, experiment, answerQuestion, setGuideMessage, lang]);

  const handleNextExperiment = useCallback(() => {
    const nextIdx = currentExp + 1;
    setExperimentsScore(prev => prev + 1);
    setCurrentExp(nextIdx);
    setSwitches({ b1: true, b2: true, b3: true });
    setHasToggled(false);
    setShowObservation(false);
  }, [currentExp]);

  const handleChallengeAnswer = useCallback((idx) => {
    if (challengeFeedback) return;
    setChallengeAnswer(idx);
    const isCorrect = idx === experiment.correct;
    answerQuestion(currentNodeId, 'challenge', isCorrect, true);
    
    if (isCorrect) {
      setChallengeFeedback('correct');
      setGuideMessage(t('lab.correctGuide'));
    } else {
      setChallengeFeedback('wrong');
      setGuideMessage(t('lab.wrongGuide'));
    }
  }, [challengeFeedback, experiment, currentNodeId, answerQuestion, setGuideMessage, t]);

  const handleComplete = useCallback(() => {
    const totalCorrect = experimentsScore + (challengeFeedback === 'correct' ? 1 : 0);
    completeNode(currentNodeId, EXPERIMENTS.length, totalCorrect);
  }, [experimentsScore, challengeFeedback, currentNodeId, completeNode]);

  return (
    <div className="lab screen">
      <div className="screen-content lab__content">
        <div className="lab__header">
          <span className="lab__label">{node?.icon} {t('lab.label')}</span>
          <span className="lab__progress">{t('lab.progress', { current: currentExp + 1, total: EXPERIMENTS.length })}</span>
        </div>

        <div className="progress-dots">
          {EXPERIMENTS.map((_, i) => (
            <div key={i} className={`progress-dot ${i === currentExp ? 'active' : i < currentExp ? 'completed' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={experiment.id}
            className="lab__workspace card-elevated"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="lab__title">{getText(experiment, 'title', lang)}</h4>
            <p className="lab__instruction">{getText(experiment, 'instruction', lang)}</p>

            {experiment.type !== 'challenge' ? (
              <>
                {/* Interactive circuit diagram */}
                <div className="lab__diagram">
                  <div className={`lab__circuit lab__circuit--${experiment.type}`}>
                    {/* Battery indicator */}
                    <div className="lab__battery-indicator">🔋 {t('lab.battery')}</div>

                    {/* Bulbs with switches */}
                    <div className={`lab__bulbs lab__bulbs--${experiment.type}`}>
                      {experiment.bulbs.map(bulb => (
                        <motion.div
                          key={bulb.id}
                          className="lab__bulb-unit"
                          layout
                        >
                          {/* Bulb */}
                          <motion.div
                            className={`lab__bulb-visual ${activeBulbs[bulb.id] ? 'lab__bulb-visual--on' : ''}`}
                            animate={{
                              scale: activeBulbs[bulb.id] ? 1 : 0.9,
                              opacity: activeBulbs[bulb.id] ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="lab__bulb-glow" />
                            <span className="lab__bulb-emoji">💡</span>
                          </motion.div>
                          <span className="lab__bulb-label">{getText(bulb, 'label', lang)}</span>

                          {/* Switch toggle */}
                          <button
                            className={`lab__switch ${switches[bulb.id] ? 'lab__switch--on' : ''}`}
                            onClick={() => handleToggle(bulb.id)}
                          >
                            {switches[bulb.id] ?
                              <ToggleRight size={28} /> :
                              <ToggleLeft size={28} />
                            }
                            <span>{switches[bulb.id] ? t('common.on') : t('common.off')}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Circuit type badge */}
                    <div className="lab__type-badge">
                      {experiment.type === 'series' ? `→ → → ${t('lab.seriesBadge')}` : `↕ ↕ ↕ ${t('lab.parallelBadge')}`}
                    </div>
                  </div>
                </div>

                {/* Observation button */}
                {hasToggled && !showObservation && (
                  <motion.button
                    className="btn-primary lab__observe-btn"
                    onClick={handleShowObservation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t('lab.notice')} 🔍
                  </motion.button>
                )}

                {/* Observation card */}
                <AnimatePresence>
                  {showObservation && (
                    <motion.div
                      className="lab__observation"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="lab__observation-icon">📝</span>
                      <p>{getText(experiment, 'observation', lang)}</p>
                      <button className="btn-primary" onClick={handleNextExperiment}>
                        {t('lab.nextExperiment')} <ArrowRight size={16} className="rtl-mirror" aria-hidden="true" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Challenge question */
              <div className="lab__challenge">
                <h4 className="lab__challenge-q">{getText(experiment, 'question', lang)}</h4>
                <div className="lab__challenge-options">
                  {getArray(experiment, 'options', lang).map((opt, i) => (
                    <motion.button
                      key={i}
                      className={`lab__challenge-option ${
                        challengeAnswer === i
                          ? i === experiment.correct
                            ? 'lab__challenge-option--correct'
                            : 'lab__challenge-option--wrong'
                          : ''
                      }`}
                      onClick={() => handleChallengeAnswer(i)}
                      disabled={challengeFeedback !== null}
                      whileHover={!challengeFeedback ? { scale: 1.01 } : {}}
                    >
                      <span className="lab__challenge-letter">{i === 0 ? 'A' : 'B'}</span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>

                {challengeFeedback && (
                  <motion.div
                    className={`lab__challenge-feedback lab__challenge-feedback--${challengeFeedback}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>{getText(experiment, 'explanation', lang)}</p>
                    <button className="btn-primary" onClick={handleComplete}>
                      {t('lab.completeZone')} <ArrowRight size={16} className="rtl-mirror" aria-hidden="true" />
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
