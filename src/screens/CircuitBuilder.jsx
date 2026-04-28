import { useState, useCallback, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RotateCcw } from 'lucide-react';
import { getText } from '../data/uiText';
import './CircuitBuilder.css';

/*
  CIRCUIT BUILDER — Node 1 Innovative Interaction
  Students connect wire segments to complete a circuit.
  When the circuit is closed, electricity visibly flows and the bulb lights up.
  3 progressively harder circuits to build.
*/

export const BUILDER_CIRCUITS = [
  {
    id: 'c1',
    title: 'Simple Circuit',
    titleAr: 'دائرة بسيطة',
    instruction: 'Connect the wire to complete the circuit and light the bulb!',
    instructionAr: 'وصل السلك لإكمال الدائرة وإضاءة المصباح.',
    battery: { x: 80, y: 150 },
    bulb: { x: 320, y: 150 },
    slots: [
      { id: 's1', x1: 130, y1: 150, x2: 220, y2: 150, placed: false },
    ],
    wires: [
      { x1: 100, y1: 150, x2: 130, y2: 150 }, // battery to slot
      { x1: 220, y1: 150, x2: 300, y2: 150 }, // slot to bulb
      { x1: 320, y1: 170, x2: 320, y2: 240 }, // bulb down
      { x1: 320, y1: 240, x2: 80, y2: 240 },  // across
      { x1: 80, y1: 240, x2: 80, y2: 180 },   // up to battery
    ],
    hint: 'The circuit needs a complete loop from battery → bulb → back to battery.',
    hintAr: 'تحتاج الدائرة إلى حلقة كاملة من البطارية إلى المصباح ثم العودة إلى البطارية.',
  },
  {
    id: 'c2',
    title: 'Switch Circuit',
    titleAr: 'دائرة بمفتاح',
    instruction: 'Add the missing wires AND close the switch to light both bulbs!',
    instructionAr: 'أضف الأسلاك الناقصة وأغلق المفتاح لإضاءة المصباحين.',
    battery: { x: 80, y: 150 },
    bulb: { x: 240, y: 150 },
    bulb2: { x: 340, y: 150 },
    switchPos: { x: 190, y: 260 },
    slots: [
      { id: 's1', x1: 130, y1: 150, x2: 220, y2: 150, placed: false },
      { id: 's2', x1: 260, y1: 150, x2: 320, y2: 150, placed: false },
    ],
    wires: [
      { x1: 100, y1: 150, x2: 130, y2: 150 },
      { x1: 340, y1: 170, x2: 340, y2: 260 },
      { x1: 340, y1: 260, x2: 198, y2: 260 },
      { x1: 170, y1: 260, x2: 80, y2: 260 },
      { x1: 80, y1: 260, x2: 80, y2: 180 },
    ],
    needsSwitch: true,
    hint: 'Connect both wire gaps and flip the switch to close the circuit.',
    hintAr: 'صل فجوتي السلك ثم حرّك المفتاح لإغلاق الدائرة.',
  },
  {
    id: 'c3',
    title: 'Parallel Branches',
    titleAr: 'فروع متوازية (Parallel)',
    instruction: 'Wire both branches so each bulb has its own path. This is a parallel circuit!',
    instructionAr: 'وصل الفرعين حتى يكون لكل مصباح مساره الخاص. هذه دائرة توازي (Parallel).',
    battery: { x: 80, y: 200 },
    bulb: { x: 250, y: 120 },
    bulb2: { x: 250, y: 280 },
    slots: [
      { id: 's1', x1: 140, y1: 120, x2: 230, y2: 120, placed: false },
      { id: 's2', x1: 140, y1: 280, x2: 230, y2: 280, placed: false },
      { id: 's3', x1: 270, y1: 120, x2: 360, y2: 120, placed: false },
    ],
    wires: [
      { x1: 80, y1: 170, x2: 80, y2: 120 },
      { x1: 80, y1: 120, x2: 140, y2: 120 },
      { x1: 80, y1: 230, x2: 80, y2: 280 },
      { x1: 80, y1: 280, x2: 140, y2: 280 },
      { x1: 360, y1: 120, x2: 360, y2: 280 },
      { x1: 270, y1: 280, x2: 360, y2: 280 },
    ],
    hint: 'Each bulb needs its own wire path from the battery and back — that\'s parallel!',
    hintAr: 'كل مصباح يحتاج إلى مساره الخاص من البطارية والعودة إليها - هذا هو التوازي.',
  },
];

const CIRCUITS = BUILDER_CIRCUITS;

export function getBatteryLabelPosition(circuit) {
  return {
    x: circuit.battery.x - 48,
    y: circuit.battery.y + 4,
  };
}

export function getBulbLabelPosition(bulb) {
  return {
    x: bulb.x,
    y: bulb.y - 34,
  };
}

export default function CircuitBuilder() {
  const { currentNodeId, getNodeData, getNodeState, answerQuestion, completeNode, setGuideMessage, saveActivityState } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);
  const nodeState = getNodeState(currentNodeId);
  const savedState = nodeState?.activityState || {};
  
  const [currentCircuit, setCurrentCircuit] = useState(savedState.currentCircuit ?? 0);
  const [slots, setSlots] = useState(savedState.slots ?? CIRCUITS[savedState.currentCircuit ?? 0].slots.map(s => ({ ...s })));
  const [switchClosed, setSwitchClosed] = useState(savedState.switchClosed ?? false);
  const [isComplete, setIsComplete] = useState(savedState.isComplete ?? false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [circuitsCompleted, setCircuitsCompleted] = useState(savedState.circuitsCompleted ?? 0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    saveActivityState(currentNodeId, { currentCircuit, slots, switchClosed, isComplete, circuitsCompleted });
  }, [currentCircuit, slots, switchClosed, isComplete, circuitsCompleted, currentNodeId, saveActivityState]);

  const circuit = CIRCUITS[currentCircuit];
  const batteryLabel = getBatteryLabelPosition(circuit);
  const bulbLabel = getBulbLabelPosition(circuit.bulb);
  const bulb2Label = circuit.bulb2 ? getBulbLabelPosition(circuit.bulb2) : null;
  const allSlotsPlaced = slots.every(s => s.placed);
  const switchOk = !circuit.needsSwitch || switchClosed;
  const circuitComplete = allSlotsPlaced && switchOk;

  const svgRef = useRef(null);
  const [draggingWire, setDraggingWire] = useState(null);

  const getSvgCoords = useCallback((e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    pt.y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }, []);

  const handlePointerDown = useCallback((e, slot, isStart) => {
    if (isComplete || slot.placed) return;
    e.preventDefault();
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
    const startX = isStart ? slot.x1 : slot.x2;
    const startY = isStart ? slot.y1 : slot.y2;
    const endX = isStart ? slot.x2 : slot.x1;
    const endY = isStart ? slot.y2 : slot.y1;
    setDraggingWire({ slotId: slot.id, startX, startY, endX, endY, currentX: startX, currentY: startY });
    setShowHint(false);
    setGuideMessage(t('builder.dragGuide'));
  }, [isComplete, setGuideMessage, t]);

  const handlePointerMove = useCallback((e) => {
    if (!draggingWire) return;
    e.preventDefault();
    const pt = getSvgCoords(e);
    setDraggingWire(prev => ({ ...prev, currentX: pt.x, currentY: pt.y }));
  }, [draggingWire, getSvgCoords]);

  const handlePointerUp = useCallback((e) => {
    if (!draggingWire) return;
    e.preventDefault();
    const dx = draggingWire.currentX - draggingWire.endX;
    const dy = draggingWire.currentY - draggingWire.endY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 40) {
      setSlots(prev => prev.map(s => s.id === draggingWire.slotId ? { ...s, placed: true } : s));
      setGuideMessage(t('builder.connectedGuide'));
    } else {
      setGuideMessage(t('builder.missGuide'));
    }
    setDraggingWire(null);
  }, [draggingWire, setGuideMessage, t]);



  const handleSwitchToggle = useCallback(() => {
    if (isComplete) return;
    setSwitchClosed(prev => !prev);
  }, [isComplete]);

  // Check circuit completion
  const handleCheckCircuit = useCallback(() => {
    if (circuitComplete) {
      setIsComplete(true);
      setShowCelebration(true);
      answerQuestion(currentNodeId, circuit.id, true, true);
      setGuideMessage(t('builder.completeGuide'));
      
      setTimeout(() => {
        setShowCelebration(false);
        const newCompleted = circuitsCompleted + 1;
        setCircuitsCompleted(newCompleted);
        
        if (currentCircuit < CIRCUITS.length - 1) {
          // Move to next circuit
          const nextIdx = currentCircuit + 1;
          setCurrentCircuit(nextIdx);
          setSlots(CIRCUITS[nextIdx].slots.map(s => ({ ...s })));
          setSwitchClosed(false);
          setIsComplete(false);
          setGuideMessage(t('builder.nextGuide'));
        } else {
          // All circuits done
          completeNode(currentNodeId, CIRCUITS.length, newCompleted);
        }
      }, 2000);
    } else {
      setShowHint(true);
      setGuideMessage(getText(circuit, 'hint', lang));
    }
  }, [circuitComplete, currentCircuit, circuitsCompleted, currentNodeId, answerQuestion, completeNode, setGuideMessage, circuit, lang, t]);

  const handleReset = useCallback(() => {
    setSlots(CIRCUITS[currentCircuit].slots.map(s => ({ ...s, placed: false })));
    setSwitchClosed(false);
    setIsComplete(false);
    setShowHint(false);
    setDraggingWire(null);
  }, [currentCircuit]);

  return (
    <div className="builder screen">
      <div className="screen-content builder__content">
        <div className="builder__header">
          <span className="builder__label">{node?.icon} {t('builder.label')}</span>
          <span className="builder__progress">{t('builder.progress', { current: currentCircuit + 1, total: CIRCUITS.length })}</span>
        </div>

        <div className="progress-dots">
          {CIRCUITS.map((_, i) => (
            <div key={i} className={`progress-dot ${i === currentCircuit ? 'active' : i < currentCircuit ? 'completed' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={circuit.id}
            className="builder__workspace card-elevated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="builder__circuit-title">{getText(circuit, 'title', lang)}</h4>
            <p className="builder__instruction">{getText(circuit, 'instruction', lang)}</p>

            {/* SVG Circuit Diagram */}
            <div className="builder__diagram">
              <svg 
                viewBox="0 0 420 320" 
                className="builder__svg"
                ref={svgRef}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ touchAction: 'none' }}
              >
                {/* Pre-existing wires */}
                {circuit.wires.map((w, i) => (
                  <line
                    key={`w${i}`}
                    x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
                    className="builder__wire"
                  />
                ))}

                {/* Placeable wire slots */}
                {slots.map(slot => (
                  <g key={slot.id} className="builder__slot-group">
                    {slot.placed ? (
                      <motion.line
                        x1={slot.x1} y1={slot.y1}
                        initial={{ x2: slot.x1, y2: slot.y1 }}
                        animate={{ x2: slot.x2, y2: slot.y2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="builder__slot builder__slot--placed"
                      />
                    ) : (
                      <>
                        <circle cx={slot.x1} cy={slot.y1} r="16" className="builder__terminal" onPointerDown={(e) => handlePointerDown(e, slot, true)} />
                        
                        <circle cx={slot.x2} cy={slot.y2} r="16" className="builder__terminal" onPointerDown={(e) => handlePointerDown(e, slot, false)} />
                      </>
                    )}
                  </g>
                ))}

                {/* Dynamic Dragging Wire */}
                {draggingWire && (
                  <line
                    x1={draggingWire.startX}
                    y1={draggingWire.startY}
                    x2={draggingWire.currentX}
                    y2={draggingWire.currentY}
                    className="builder__wire-drag"
                  />
                )}

                {/* Battery */}
                <g className="builder__battery">
                  <rect x={circuit.battery.x - 20} y={circuit.battery.y - 30} width="40" height="60" rx="4"
                    fill="var(--color-bg-warm)" stroke="var(--color-text-muted)" strokeWidth="2" />
                  <text x={circuit.battery.x} y={circuit.battery.y - 8} textAnchor="middle"
                    className="builder__component-label" fontSize="14" fontWeight="bold">+</text>
                  <text x={circuit.battery.x} y={circuit.battery.y + 18} textAnchor="middle"
                    className="builder__component-label" fontSize="14" fontWeight="bold">−</text>
                  <text x={batteryLabel.x} y={batteryLabel.y} textAnchor="middle" dominantBaseline="middle"
                    className="builder__component-text">{t('builder.battery')}</text>
                </g>

                {/* Bulb 1 */}
                <g className={`builder__bulb ${circuitComplete && isComplete ? 'builder__bulb--on' : ''}`}>
                  <circle cx={circuit.bulb.x} cy={circuit.bulb.y} r="20"
                    className="builder__bulb-glass" />
                  <path d={`M${circuit.bulb.x - 6} ${circuit.bulb.y + 3} L${circuit.bulb.x} ${circuit.bulb.y - 8} L${circuit.bulb.x + 6} ${circuit.bulb.y + 3}`}
                    className="builder__bulb-filament" />
                  <text x={bulbLabel.x} y={bulbLabel.y} textAnchor="middle" dominantBaseline="middle"
                    className="builder__component-text">{t('builder.bulb')}</text>
                  {circuitComplete && isComplete && (
                    <>
                      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                        <motion.line
                          key={angle}
                          x1={circuit.bulb.x + Math.cos(angle * Math.PI / 180) * 24}
                          y1={circuit.bulb.y + Math.sin(angle * Math.PI / 180) * 24}
                          x2={circuit.bulb.x + Math.cos(angle * Math.PI / 180) * 32}
                          y2={circuit.bulb.y + Math.sin(angle * Math.PI / 180) * 32}
                          stroke="var(--color-secondary)"
                          strokeWidth="2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: angle / 360 }}
                        />
                      ))}
                    </>
                  )}
                </g>

                {/* Bulb 2 (if exists) */}
                {circuit.bulb2 && (
                  <g className={`builder__bulb ${circuitComplete && isComplete ? 'builder__bulb--on' : ''}`}>
                    <circle cx={circuit.bulb2.x} cy={circuit.bulb2.y} r="20"
                      className="builder__bulb-glass" />
                    <path d={`M${circuit.bulb2.x - 6} ${circuit.bulb2.y + 3} L${circuit.bulb2.x} ${circuit.bulb2.y - 8} L${circuit.bulb2.x + 6} ${circuit.bulb2.y + 3}`}
                      className="builder__bulb-filament" />
                    <text x={bulb2Label.x} y={bulb2Label.y} textAnchor="middle" dominantBaseline="middle"
                      className="builder__component-text">{t('builder.bulb2')}</text>
                  </g>
                )}

                {/* Switch (if exists) */}
                {circuit.switchPos && (
                  <g onClick={handleSwitchToggle} style={{ cursor: 'pointer' }}>
                    <circle cx={circuit.switchPos.x} cy={circuit.switchPos.y} r="8"
                      fill={switchClosed ? 'var(--color-success)' : 'var(--color-bg-warm)'}
                      stroke="var(--color-text-muted)" strokeWidth="2" />
                    <line
                      x1={circuit.switchPos.x - 20} y1={circuit.switchPos.y}
                      x2={switchClosed ? circuit.switchPos.x - 8 : circuit.switchPos.x - 8}
                      y2={switchClosed ? circuit.switchPos.y : circuit.switchPos.y - 15}
                      stroke="var(--color-text-primary)" strokeWidth="3" strokeLinecap="round"
                    />
                    <text x={circuit.switchPos.x} y={circuit.switchPos.y + 24} textAnchor="middle"
                      className="builder__component-text">
                      {switchClosed ? t('builder.switchOn') : t('builder.switchOff')}
                    </text>
                    {/* Hit area */}
                    <rect x={circuit.switchPos.x - 30} y={circuit.switchPos.y - 20} width="60" height="40"
                      fill="transparent" />
                  </g>
                )}

                {/* Electricity flow animation */}
                {circuitComplete && isComplete && (
                  <motion.circle
                    r="4"
                    fill="var(--color-primary)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={`M${circuit.battery.x + 20} ${circuit.battery.y} L${circuit.bulb.x - 20} ${circuit.bulb.y}`}
                    />
                  </motion.circle>
                )}
              </svg>
            </div>

            {/* Controls */}
            <div className="builder__controls">
              <button className="btn-secondary builder__reset" onClick={handleReset}>
                <RotateCcw size={16} aria-hidden="true" /> {t('builder.reset')}
              </button>
              <button
                className="btn-primary builder__check"
                onClick={handleCheckCircuit}
                disabled={isComplete}
              >
                <Zap size={16} aria-hidden="true" /> {t('builder.test')}
              </button>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && !circuitComplete && (
                <motion.div
                  className="builder__hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  💡 {getText(circuit, 'hint', lang)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Success flash */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="builder__celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="builder__celebration-card"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="builder__celebration-icon">💡</div>
                <h3>{t('builder.completeTitle')}</h3>
                <p>{t('builder.completeMessage')}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
