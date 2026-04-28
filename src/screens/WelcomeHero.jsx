import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, CircuitBoard, Lightbulb, Shield, Wrench } from 'lucide-react';
import './WelcomeHero.css';

export default function WelcomeHero() {
  const { startMission } = useGame();
  const { t } = useLanguage();

  return (
    <div className="welcome screen">
      <div className="welcome__bg">
        {/* UAE-inspired geometric arches */}
        <svg className="welcome__arches" viewBox="0 0 1200 800" fill="none" aria-hidden="true" focusable="false">
          {/* Central arch */}
          <path d="M500 500 Q600 200 700 500" stroke="rgba(0,134,110,0.12)" strokeWidth="2" fill="none" />
          <path d="M460 500 Q600 160 740 500" stroke="rgba(0,134,110,0.08)" strokeWidth="1.5" fill="none" />
          <path d="M420 500 Q600 120 780 500" stroke="rgba(0,134,110,0.05)" strokeWidth="1" fill="none" />
          {/* Side arches */}
          <path d="M100 600 Q200 400 300 600" stroke="rgba(201,150,58,0.08)" strokeWidth="1.5" fill="none" />
          <path d="M900 600 Q1000 400 1100 600" stroke="rgba(201,150,58,0.08)" strokeWidth="1.5" fill="none" />
          {/* Geometric dots */}
          <circle cx="600" cy="220" r="4" fill="rgba(0,134,110,0.15)" />
          <circle cx="200" cy="420" r="3" fill="rgba(201,150,58,0.12)" />
          <circle cx="1000" cy="420" r="3" fill="rgba(201,150,58,0.12)" />
          {/* Subtle hexagonal pattern */}
          <polygon points="580,350 600,340 620,350 620,370 600,380 580,370" stroke="rgba(0,134,110,0.06)" strokeWidth="1" fill="none" />
          <polygon points="550,320 570,310 590,320 590,340 570,350 550,340" stroke="rgba(30,111,217,0.05)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="welcome__content">
        <motion.div
          className="welcome__badge"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Zap size={14} aria-hidden="true" />
          <span>{t('welcome.badge')}</span>
        </motion.div>

        <motion.h1
          className="welcome__title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('welcome.titlePrefix')}
          <br />
          <span className="welcome__title-accent">{t('welcome.titleAccent')}</span>
        </motion.h1>

        <motion.p
          className="welcome__subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t('welcome.subtitle')}
        </motion.p>

        {/* Interactive preview cards */}
        <motion.div
          className="welcome__preview"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="welcome__preview-card">
            <CircuitBoard size={20} aria-hidden="true" />
            <span>{t('welcome.preview.circuits')}</span>
          </div>
          <div className="welcome__preview-card">
            <Shield size={20} aria-hidden="true" />
            <span>{t('welcome.preview.materials')}</span>
          </div>
          <div className="welcome__preview-card">
            <Lightbulb size={20} aria-hidden="true" />
            <span>{t('welcome.preview.systems')}</span>
          </div>
          <div className="welcome__preview-card">
            <Wrench size={20} aria-hidden="true" />
            <span>{t('welcome.preview.repair')}</span>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="btn-primary welcome__cta"
          onClick={startMission}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('welcome.start')} <ChevronRight size={20} aria-hidden="true" className="rtl-mirror" />
        </motion.button>
      </div>
    </div>
  );
}
