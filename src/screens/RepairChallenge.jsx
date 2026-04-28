import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Wrench, Link, Cable, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { getText } from '../data/uiText';
import './RepairChallenge.css';

export default function RepairChallenge() {
  const { currentNodeId, getNodeData, getNodeState, completeNode, setGuideMessage, saveActivityState } = useGame();
  const { lang, t } = useLanguage();

  const node = getNodeData(currentNodeId);
  const nodeState = getNodeState(currentNodeId);

  if (!node || !node.activity || node.activity.type !== 'repair') {
    return null;
  }

  const { faults } = node.activity;
  const savedState = nodeState?.activityState;

  const [faultStates, setFaultStates] = useState(savedState?.faultStates || {});

  const [viewMode, setViewMode] = useState('real');
  const [selectedTool, setSelectedTool] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Define tools explicitly for the 3 expected faults
  const tools = [
    { id: 't1', icon: <Cable size={32} />, label: 'Replacement Wire', labelAr: 'سلك بديل', target: 'f1' },
    { id: 't2', icon: <Wrench size={32} />, label: 'Copper Connector', labelAr: 'وصلة نحاس', target: 'f2' },
    { id: 't3', icon: <Link size={32} />, label: 'Parallel Junction', labelAr: 'وصلة توازي', target: 'f3' }
  ];

  const currentFault = faults.find(f => !faultStates[f.id]);
  const isComplete = Object.keys(faultStates).length >= faults.length;
  const mainCircuitPowered = Boolean(faultStates.f1 && faultStates.f2);
  const parallelBranchPowered = Boolean(mainCircuitPowered && faultStates.f3);

  useEffect(() => {
    saveActivityState(currentNodeId, { faultStates, allFixed: isComplete });
  }, [faultStates, isComplete, currentNodeId, saveActivityState]);

  useEffect(() => {
    if (isComplete) {
       setGuideMessage(t('repair.completeGuide'));
       const timer = setTimeout(() => {
         completeNode(currentNodeId, faults.length, faults.length);
       }, 4000);
       return () => clearTimeout(timer);
    } else if (currentFault) {
       setGuideMessage(getText(currentFault, 'hint', lang));
    }
  }, [isComplete, currentFault, currentNodeId, completeNode, faults.length, setGuideMessage, lang, t]);

  const handleToolSelect = (toolId) => {
    if (selectedTool === toolId) {
      setSelectedTool(null);
    } else {
      setSelectedTool(toolId);
      setFeedback(null);
    }
  };

  const handleTargetClick = (faultId) => {
    if (faultStates[faultId]) return;
    
    if (!selectedTool) {
       setFeedback({ type: 'error', message: t('repair.selectTool') });
       return;
    }

    const tool = tools.find(t => t.id === selectedTool);
    if (tool.target === faultId) {
      const faultData = faults.find(f => f.id === faultId);
      setFaultStates(prev => ({ ...prev, [faultId]: true }));
      setFeedback({ type: 'success', message: t('repair.correct', { explanation: getText(faultData, 'explanation', lang) }) });
      setSelectedTool(null);
    } else {
      setFeedback({ type: 'error', message: t('repair.wrongTool') });
    }
  };

  const handleTargetKeyDown = useCallback((event, faultId) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleTargetClick(faultId);
  }, [handleTargetClick]);

  const renderRealComponents = () => (
    <g>
      {/* Battery Pack */}
      <g transform="translate(60, 160)" className="real-battery">
        <rect x="0" y="0" width="60" height="80" fill="#2D3748" rx="8" />
        <rect x="0" y="0" width="60" height="20" fill="#4A5568" rx="8" />
        <rect x="15" y="-10" width="10" height="15" fill="#A0AEC0" />
        <rect x="35" y="-10" width="10" height="15" fill="#A0AEC0" />
        <text x="20" y="15" fontSize="14" fill="#FC8181" fontWeight="bold">+</text>
        <text x="40" y="15" fontSize="14" fill="#63B3ED" fontWeight="bold">-</text>
      </g>

      {/* Switch (Bottom) */}
      <g transform="translate(320, 310)">
        <rect x="0" y="0" width="60" height="20" className="real-switch-base" rx="4" />
        <circle cx="10" cy="10" r="6" fill="#A0AEC0" />
        <circle cx="50" cy="10" r="6" fill="#A0AEC0" />
        {/* Switch Arm closed */}
        <line x1="10" y1="10" x2="50" y2="10" className="real-switch-arm" />
      </g>

      {/* Bulb 1 */}
      <g transform="translate(400, 150)">
        <path d="M-15,30 Q-20,0 0,-20 Q20,0 15,30 Z" className={`real-bulb-glass ${mainCircuitPowered ? 'real-bulb-glass--on' : ''}`} />
        <rect x="-10" y="30" width="20" height="15" className="real-bulb-base" rx="2" />
        <path d="M-5,10 L0,-5 L5,10" fill="none" stroke="#718096" strokeWidth="2" />
      </g>

      {/* Bulb 2 (Parallel) */}
      <g transform="translate(520, 150)" style={{ opacity: faultStates['f3'] ? 1 : 0.3 }}>
        <path d="M-15,30 Q-20,0 0,-20 Q20,0 15,30 Z" className={`real-bulb-glass ${parallelBranchPowered ? 'real-bulb-glass--on' : ''}`} />
        <rect x="-10" y="30" width="20" height="15" className="real-bulb-base" rx="2" />
        <path d="M-5,10 L0,-5 L5,10" fill="none" stroke="#718096" strokeWidth="2" />
      </g>
    </g>
  );

  const renderSchematicComponents = () => (
    <g>
      {/* Battery */}
      <g transform="translate(90, 200)">
        <line x1="-20" y1="-15" x2="20" y2="-15" className="sch-symbol" />
        <line x1="-10" y1="0" x2="10" y2="0" className="sch-symbol" />
        <line x1="-20" y1="15" x2="20" y2="15" className="sch-symbol" />
        <line x1="-10" y1="30" x2="10" y2="30" className="sch-symbol" />
        <text x="-35" y="-10" fontSize="18" fill="#1E3A8A" fontWeight="bold">+</text>
      </g>
      
      {/* Switch */}
      <g transform="translate(350, 320)">
        <circle cx="-20" cy="0" r="4" className="sch-symbol" />
        <circle cx="20" cy="0" r="4" className="sch-symbol" />
        <line x1="-20" y1="0" x2="20" y2="0" className="sch-symbol" />
      </g>

      {/* Bulb 1 */}
      <g transform="translate(400, 180)">
        <circle cx="0" cy="0" r="20" className={`sch-symbol ${mainCircuitPowered ? 'sch-bulb--on' : ''}`} />
        <line x1="-14" y1="-14" x2="14" y2="14" className="sch-symbol" />
        <line x1="-14" y1="14" x2="14" y2="-14" className="sch-symbol" />
      </g>

      {/* Bulb 2 */}
      <g transform="translate(520, 180)" style={{ opacity: faultStates['f3'] ? 1 : 0.3 }}>
        <circle cx="0" cy="0" r="20" className={`sch-symbol ${parallelBranchPowered ? 'sch-bulb--on' : ''}`} />
        <line x1="-14" y1="-14" x2="14" y2="14" className="sch-symbol" />
        <line x1="-14" y1="14" x2="14" y2="-14" className="sch-symbol" />
      </g>
    </g>
  );

  const wClass = viewMode === 'real' ? 'real-wire' : 'sch-wire';
  const flowClass = viewMode === 'real' ? 'current-flow' : 'sch-current-flow';

  return (
    <div className="repair">
      <div className="repair__content">
        <header className="repair__header">
          <div>
            <h1 className="text-2xl font-bold text-primary">{getText(node, 'title', lang)}</h1>
            <p className="repair__label">{getText(node, 'subtitle', lang)}</p>
          </div>
          <div className="repair__progress">
            {t('repair.fixedProgress', { fixed: Object.keys(faultStates).length, total: faults.length })}
          </div>
        </header>

        <div className="repair__diagnosis">
          <div className="flex items-center gap-2 justify-center text-danger">
            <AlertCircle size={20} />
            <span>{t('repair.diagnosisRequired')}</span>
          </div>
          <p>{currentFault ? t('repair.fault', { description: getText(currentFault, 'description', lang) }) : t('repair.allSystems')}</p>
          
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className={`text-sm mt-2 font-bold ${feedback.type === 'success' ? 'text-success' : 'text-danger'}`}
            >
              {feedback.message}
            </motion.div>
          )}
        </div>

        <div className="repair__controls">
          <button 
            className="repair__toggle"
            onClick={() => setViewMode(v => v === 'real' ? 'schematic' : 'real')}
            aria-label={t('repair.toggleView')}
          >
            {viewMode === 'real' ? <ToggleLeft /> : <ToggleRight className="text-success" />}
            {viewMode === 'real' ? t('repair.realView') : t('repair.schematicView')}
          </button>
        </div>

        <div className="repair__workspace">
          <div className={`repair__board-wrapper ${viewMode === 'schematic' ? 'repair__board-wrapper--schematic' : ''}`}>
            <svg viewBox="0 0 600 400" className="repair__svg" role="img" aria-label={t('repair.workbench')}>
              
              {/* --- STATIC WIRES --- */}
              {/* Battery + to Top Left Corner to F1 */}
              <polyline points="90,150 90,80 180,80" className={wClass} />
              
              {/* F1 to Bulb 1 Top */}
              <polyline points="280,80 400,80 400,150" className={wClass} />
              
              {/* Bulb 1 Bottom to Switch Right */}
              <polyline points="400,200 400,320 380,320" className={wClass} />

              {/* Switch Left to F2 */}
              <polyline points="320,320 280,320" className={wClass} />

              {/* F2 to Battery - */}
              <polyline points="180,320 90,320 90,240" className={wClass} />


              {/* --- FAULTS & FIXES --- */}
              {/* F1: Broken Wire Gap */}
              {!faultStates['f1'] ? (
                <line x1="180" y1="80" x2="280" y2="80" className="fault-gap" />
              ) : (
                <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="180" y1="80" x2="280" y2="80" className={wClass} />
              )}
              {/* F1 Target Area */}
              <g onClick={() => handleTargetClick('f1')} onKeyDown={(e) => handleTargetKeyDown(e, 'f1')} tabIndex={0} role="button" aria-label={t('repair.faultArea', { number: 1 })}>
                <rect x="160" y="60" width="140" height="40" className="repair__target" />
                {selectedTool && !faultStates['f1'] && <rect x="180" y="70" width="100" height="20" className="repair__target-highlight" />}
              </g>

              {/* F2: Wrong Material (Glass/Plastic) */}
              {!faultStates['f2'] ? (
                <line x1="180" y1="320" x2="280" y2="320" className="fault-material" />
              ) : (
                <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="180" y1="320" x2="280" y2="320" className={viewMode === 'real' ? 'real-wire-black' : 'sch-wire'} />
              )}
              {/* F2 Target Area */}
              <g onClick={() => handleTargetClick('f2')} onKeyDown={(e) => handleTargetKeyDown(e, 'f2')} tabIndex={0} role="button" aria-label={t('repair.faultArea', { number: 2 })}>
                <rect x="160" y="300" width="140" height="40" className="repair__target" />
                {selectedTool && !faultStates['f2'] && <rect x="180" y="310" width="100" height="20" className="repair__target-highlight" />}
              </g>

              {/* F3: Missing Parallel Branch */}
              {!faultStates['f3'] ? (
                <g className="fault-missing">
                  <polyline points="400,80 520,80 520,150" />
                  <polyline points="520,200 520,320 400,320" />
                </g>
              ) : (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <polyline points="400,80 520,80 520,150" className={wClass} />
                  <polyline points="520,200 520,320 400,320" className={wClass} />
                  <circle cx="400" cy="80" r="4" fill="#1E3A8A" />
                  <circle cx="400" cy="320" r="4" fill="#1E3A8A" />
                </motion.g>
              )}
              {/* F3 Target Area */}
              <g onClick={() => handleTargetClick('f3')} onKeyDown={(e) => handleTargetKeyDown(e, 'f3')} tabIndex={0} role="button" aria-label={t('repair.faultArea', { number: 3 })}>
                <rect x="420" y="60" width="120" height="280" className="repair__target" />
                {selectedTool && !faultStates['f3'] && <rect x="440" y="70" width="80" height="260" className="repair__target-highlight" />}
              </g>

              {/* --- FLOW ANIMATION --- */}
              {mainCircuitPowered && (
                <g>
                  {/* Main Loop */}
                  <polyline points="90,150 90,80 400,80 400,150" className={flowClass} />
                  <polyline points="400,200 400,320 90,320 90,240" className={flowClass} />
                  {/* Parallel Branch Flow */}
                  {parallelBranchPowered && (
                    <>
                      <polyline points="400,80 520,80 520,150" className={flowClass} />
                      <polyline points="520,200 520,320 400,320" className={flowClass} />
                    </>
                  )}
                </g>
              )}

              {/* Render Components Over Wires */}
              {viewMode === 'real' ? renderRealComponents() : renderSchematicComponents()}
            </svg>
          </div>

          <div className="repair__toolbox">
            <div className="flex items-center gap-2 mr-4 text-text-secondary font-bold text-sm uppercase">
              <Wrench size={16} /> {t('repair.toolbox')}
            </div>
            {tools.map(tool => (
              <button
                key={tool.id}
                className={`repair__tool ${selectedTool === tool.id ? 'repair__tool--selected' : ''}`}
                onClick={() => handleToolSelect(tool.id)}
                aria-pressed={selectedTool === tool.id}
                aria-label={t('repair.selectToolLabel', { label: getText(tool, 'label', lang) })}
              >
                <div className="repair__tool-icon text-primary">{tool.icon}</div>
                <div className="repair__tool-label">{getText(tool, 'label', lang)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Completion Screen */}
        <AnimatePresence>
          {isComplete && (
            <motion.div 
              className="repair__complete-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <motion.div 
                className="repair__complete-card"
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              >
                <CheckCircle2 className="repair__complete-icon text-success mx-auto" />
                <h3>{t('repair.restoredTitle')}</h3>
                <p>{t('repair.restoredMessage')}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
