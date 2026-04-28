import { describe, it, expect } from 'vitest';
import { NODES, GUIDE_MESSAGES, GUIDE_MESSAGES_AR, BADGES } from '../data/nodes';

describe('NODES data validation', () => {
  it('should have exactly 5 nodes', () => {
    expect(NODES).toHaveLength(5);
  });

  it('every node should have required fields', () => {
    NODES.forEach(node => {
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('title');
      expect(node).toHaveProperty('subtitle');
      expect(node).toHaveProperty('zone');
      expect(node).toHaveProperty('icon');
      expect(node).toHaveProperty('lesson');
      expect(node).toHaveProperty('activity');
      expect(node).toHaveProperty('objective');
      expect(node).toHaveProperty('curriculum');
      expect(node).toHaveProperty('reflection');
    });
  });

  it('every node should have an "I can..." objective', () => {
    NODES.forEach(node => {
      expect(node.objective).toMatch(/^I can/);
    });
  });

  it('every node should have a reflection with UAE context', () => {
    NODES.forEach(node => {
      expect(node.reflection).toHaveProperty('question');
      expect(node.reflection).toHaveProperty('options');
      expect(node.reflection).toHaveProperty('correct');
      expect(node.reflection).toHaveProperty('explanation');
      expect(node.reflection.options.length).toBeGreaterThanOrEqual(3);
      expect(node.reflection.correct).toBeLessThan(node.reflection.options.length);
    });
  });

  it('every node lesson should have paragraphs and a key point', () => {
    NODES.forEach(node => {
      expect(node.lesson.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(node.lesson.keyPoint).toBeTruthy();
    });
  });

  it('node IDs should be sequential 1-5', () => {
    NODES.forEach((node, i) => {
      expect(node.id).toBe(i + 1);
    });
  });

  it('should have no duplicate question IDs across all nodes', () => {
    const allIds = [];
    NODES.forEach(node => {
      if (node.activity.questions) {
        node.activity.questions.forEach(q => allIds.push(q.id));
      }
      if (node.activity.items) {
        node.activity.items.forEach(item => allIds.push(item.id));
      }
      if (node.activity.faults) {
        node.activity.faults.forEach(f => allIds.push(f.id));
      }
    });
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('every node should have Arabic display fields', () => {
    NODES.forEach(node => {
      expect(node.titleAr).toBeTruthy();
      expect(node.subtitleAr).toBeTruthy();
      expect(node.zoneAr).toBeTruthy();
      expect(node.objectiveAr).toBeTruthy();
      expect(node.lesson.titleAr).toBeTruthy();
      expect(node.lesson.paragraphsAr).toHaveLength(node.lesson.paragraphs.length);
      expect(node.lesson.keyPointAr).toBeTruthy();
      expect(node.reflection.questionAr).toBeTruthy();
      expect(node.reflection.optionsAr).toHaveLength(node.reflection.options.length);
      expect(node.reflection.explanationAr).toBeTruthy();
    });
  });

  it('every node should have UAE mentor copy in both languages', () => {
    NODES.forEach(node => {
      expect(node.uaeLink).toBeTruthy();
      expect(node.uaeLinkAr).toBeTruthy();
      expect(node.studentAction).toBeTruthy();
      expect(node.studentActionAr).toBeTruthy();
      expect(node.guidePrompt).toBeTruthy();
      expect(node.guidePromptAr).toBeTruthy();
      expect(node.activityGuide).toBeTruthy();
      expect(node.activityGuideAr).toBeTruthy();
    });
  });

  it('every activity should have Arabic equivalents for visible content', () => {
    NODES.forEach(node => {
      const { activity } = node;

      if (activity.questions) {
        activity.questions.forEach(question => {
          expect(question.questionAr).toBeTruthy();
          expect(question.optionsAr).toHaveLength(question.options.length);
          expect(question.correct).toBeLessThan(question.optionsAr.length);
          expect(question.explanationAr).toBeTruthy();
          if (question.hint) expect(question.hintAr).toBeTruthy();
        });
      }

      if (activity.type === 'classify') {
        expect(activity.instructionAr).toBeTruthy();
        expect(activity.categoriesAr).toHaveLength(activity.categories.length);
        activity.items.forEach(item => {
          expect(item.labelAr).toBeTruthy();
        });
      }

      if (activity.type === 'repair') {
        expect(activity.scenarioAr).toBeTruthy();
        activity.faults.forEach(fault => {
          expect(fault.labelAr).toBeTruthy();
          expect(fault.descriptionAr).toBeTruthy();
          expect(fault.hintAr).toBeTruthy();
          expect(fault.fixLabelAr).toBeTruthy();
          expect(fault.explanationAr).toBeTruthy();
        });
      }
    });
  });
});

describe('GUIDE_MESSAGES', () => {
  it('should have messages for all major screens', () => {
    expect(GUIDE_MESSAGES).toHaveProperty('welcome');
    expect(GUIDE_MESSAGES).toHaveProperty('story');
    expect(GUIDE_MESSAGES).toHaveProperty('map');
    expect(GUIDE_MESSAGES).toHaveProperty('lesson');
    expect(GUIDE_MESSAGES).toHaveProperty('correct');
    expect(GUIDE_MESSAGES).toHaveProperty('incorrect');
    expect(GUIDE_MESSAGES).toHaveProperty('allComplete');
  });

  it('should have Arabic messages for every English guide message key', () => {
    Object.keys(GUIDE_MESSAGES).forEach(key => {
      expect(GUIDE_MESSAGES_AR).toHaveProperty(key);
      expect(GUIDE_MESSAGES_AR[key]).toBeTruthy();
    });
  });
});

describe('BADGES', () => {
  it('should have one badge per node', () => {
    expect(BADGES).toHaveLength(5);
  });

  it('every badge should have id, label, icon, and description', () => {
    BADGES.forEach(badge => {
      expect(badge).toHaveProperty('id');
      expect(badge).toHaveProperty('label');
      expect(badge).toHaveProperty('labelAr');
      expect(badge).toHaveProperty('icon');
      expect(badge).toHaveProperty('description');
      expect(badge).toHaveProperty('descriptionAr');
    });
  });
});
