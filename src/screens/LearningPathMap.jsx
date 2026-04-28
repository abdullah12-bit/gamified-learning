import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { NODES } from '../data/nodes';
import NodeCard from '../components/NodeCard';
import './LearningPathMap.css';

export default function LearningPathMap() {
  const { nodes, currentStreak, bestStreak, selectNode } = useGame();
  const { t } = useLanguage();
  const completedCount = nodes.filter(node => node.status === 'completed' || node.status === 'mastered').length;
  const progressPercent = Math.round((completedCount / NODES.length) * 100);

  return (
    <div className="pathmap screen">
      <div className="screen-content pathmap__content">
        <motion.div
          className="pathmap__header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="pathmap__title">{t('map.title')}</h2>
          <p className="pathmap__subtitle">{t('map.subtitle')}</p>
        </motion.div>

        <motion.section
          className="pathmap__mission glass-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          aria-label={t('map.routeLabel')}
        >
          <div>
            <span className="pathmap__mission-kicker">{t('map.routeLabel')}</span>
            <h3 className="pathmap__mission-title">{t('map.routeStatus', { completed: completedCount, total: NODES.length })}</h3>
            <p className="pathmap__mission-copy">{t('map.routeBrief')}</p>
          </div>
          <div className="pathmap__mission-stats">
            <div>
              <span>{t('map.currentStreak')}</span>
              <strong>{currentStreak}</strong>
            </div>
            <div>
              <span>{t('map.bestStreak')}</span>
              <strong>{bestStreak}</strong>
            </div>
          </div>
          <div className="pathmap__power-track" aria-label={t('map.powerPath')}>
            <motion.div
              className="pathmap__power-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
        </motion.section>

        <div className="pathmap__path">
          {/* SVG connection lines */}
          <svg className="pathmap__lines" viewBox="0 0 400 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
            {[0, 1, 2, 3].map(i => {
              const y1 = 90 + i * 190;
              const y2 = y1 + 190;
              const x1 = i % 2 === 0 ? 200 : 200;
              const nodeState = nodes[i];
              const isCompleted = nodeState.status === 'completed' || nodeState.status === 'mastered';
              return (
                <motion.line
                  key={i}
                  x1={x1} y1={y1 + 60} x2={x1} y2={y2 - 20}
                  stroke={isCompleted ? 'rgba(201,150,58,0.22)' : 'rgba(0,0,0,0.07)'}
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                />
              );
            })}
          </svg>

          {NODES.map((node, index) => (
            <motion.div
              key={node.id}
              className="pathmap__node-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.4 }}
            >
              <NodeCard
                node={node}
                state={nodes[index]}
                index={index}
                onSelect={() => selectNode(node.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
