import { useState, useCallback, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { getArray, getText } from '../data/uiText';
import './ClassificationInteraction.css';

function ClassificationItem({ item, label, className = '', style, draggableProps = {} }) {
  const { attributes, listeners, setNodeRef } = draggableProps;

  return (
    <motion.button
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`classify__item ${className}`.trim()}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="classify__item-icon">{item.icon}</span>
      <span className="classify__item-label">{label}</span>
    </motion.button>
  );
}

function DraggableItem({ item }) {
  const { lang } = useLanguage();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <ClassificationItem
      item={item}
      label={getText(item, 'label', lang)}
      style={style}
      className={isDragging ? 'classify__item--dragging' : ''}
      draggableProps={{ attributes, listeners, setNodeRef }}
    />
  );
}

function DroppableZone({ category, label, items, isOver }) {
  const { lang, t } = useLanguage();
  const { setNodeRef, isOver: isDroppingOver } = useDroppable({
    id: category,
  });

  return (
    <div
      ref={setNodeRef}
      className={`classify__zone ${(isOver && isDroppingOver) ? 'classify__zone--active' : ''}`}
    >
      <h4 className="classify__zone-title">
        {category === 'Conductors' ? '⚡' : '🛡️'} {label}
      </h4>
      <div className="classify__zone-items">
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item.id}
              className={`classify__placed-item classify__placed-item--${item.status}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{getText(item, 'label', lang)}</span>
              {item.status === 'correct'
                ? <CheckCircle size={14} aria-hidden="true" />
                : <XCircle size={14} aria-hidden="true" />}
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <span className="classify__zone-hint">
            {t('classify.dropHint')}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ClassificationInteraction() {
  const { currentNodeId, getNodeData, getNodeState, answerQuestion, completeNode, setGuideMessage, saveActivityState } = useGame();
  const { lang, t } = useLanguage();
  const node = getNodeData(currentNodeId);
  const nodeState = getNodeState(currentNodeId);
  const activity = node?.activity;
  const savedState = nodeState?.activityState || {};

  const [items, setItems] = useState(
    savedState.items ?? (activity?.items?.map(item => ({ ...item, placed: null, status: null })) || [])
  );
  const [correctCount, setCorrectCount] = useState(savedState.correctCount ?? 0);
  const [totalPlaced, setTotalPlaced] = useState(savedState.totalPlaced ?? 0);
  const [showComplete, setShowComplete] = useState(savedState.showComplete ?? false);
  const [activeDragItem, setActiveDragItem] = useState(null);

  useEffect(() => {
    saveActivityState(currentNodeId, { items, correctCount, totalPlaced, showComplete });
  }, [items, correctCount, totalPlaced, showComplete, currentNodeId, saveActivityState]);

  const unplacedItems = items.filter(item => item.placed === null);
  const conductorItems = items.filter(item => item.placed === 'Conductors');
  const insulatorItems = items.filter(item => item.placed === 'Insulators');
  const categoryLabels = getArray(activity, 'categories', lang);
  const getCategoryLabel = useCallback((category) => {
    const index = activity?.categories?.indexOf(category) ?? -1;
    return index >= 0 ? categoryLabels[index] : category;
  }, [activity, categoryLabels]);

  const handleDragStart = (event) => {
    const { active } = event;
    const item = items.find(i => i.id === active.id);
    setActiveDragItem(item);
  };

  const handleDragEnd = useCallback((event) => {
    setActiveDragItem(null);
    const { active, over } = event;
    
    if (!over || showComplete) return;

    const itemId = active.id;
    const category = over.id;

    const item = items.find(i => i.id === itemId);
    if (!item || item.placed !== null) return;

    const isCorrect = item.correct === category;

    setItems(prev => prev.map(i =>
      i.id === itemId
        ? { ...i, placed: category, status: isCorrect ? 'correct' : 'wrong' }
        : i
    ));

    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newTotal = totalPlaced + 1;

    if (isCorrect) {
      setCorrectCount(newCorrect);
      setGuideMessage(t('classify.correctGuide'));
    } else {
      setGuideMessage(t('classify.wrongGuide', {
        item: getText(item, 'label', lang),
        category: getCategoryLabel(item.correct),
      }));
    }

    answerQuestion(currentNodeId, item.id, isCorrect, true);
    setTotalPlaced(newTotal);

    if (newTotal === items.length) {
      setTimeout(() => setShowComplete(true), 800);
    }
  }, [items, correctCount, totalPlaced, currentNodeId, answerQuestion, setGuideMessage, showComplete, lang, t, getCategoryLabel]);

  const handleFinish = useCallback(() => {
    completeNode(currentNodeId, items.length, correctCount);
  }, [currentNodeId, items.length, correctCount, completeNode]);

  if (!activity) return null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="classify screen">
        <div className="screen-content classify__content">
          <div className="classify__header">
            <span className="classify__label">{node.icon} {getText(node, 'title', lang)}</span>
            <span className="classify__progress">{t('classify.progress', { placed: totalPlaced, total: items.length })}</span>
          </div>

          <div className="classify__progress-bar">
            <motion.div
              className="classify__progress-fill"
              animate={{ width: `${(totalPlaced / items.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <p className="classify__instruction">{getText(activity, 'instruction', lang)}</p>

          {/* Unplaced items */}
          <div className="classify__items">
            <AnimatePresence>
              {unplacedItems.map(item => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Drop zones */}
          <div className="classify__zones">
            {activity.categories.map((category, index) => (
              <DroppableZone 
                key={category} 
                category={category} 
                label={categoryLabels[index] ?? category}
                items={category === 'Conductors' ? conductorItems : insulatorItems}
                isOver={!!activeDragItem}
              />
            ))}
          </div>

          {/* Completion overlay */}
          <AnimatePresence>
            {showComplete && (
              <motion.div
                className="classify__complete-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="classify__complete-card glass-panel"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="classify__complete-icon">🎉</div>
                  <h3>{t('classify.completeTitle')}</h3>
                  <p>{t('classify.completeScore', { correct: correctCount, total: items.length })}</p>
                  <button type="button" className="btn-primary" onClick={handleFinish}>
                    {t('classify.continue')}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeDragItem ? (
          <ClassificationItem
            item={activeDragItem}
            label={getText(activeDragItem, 'label', lang)}
            className="classify__item--overlay"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
