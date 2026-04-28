# TaqahQuest

TaqahQuest is a bilingual Grade 8 Science learning experience where students restore power across UAE-inspired energy zones. The journey teaches electricity concepts through interactive challenges, progress feedback, energy points, stars, badges, streaks, and a final mission summary.

Live demo: `<vercel-url>`

Public GitHub repo: `https://github.com/abdullah12-bit/gamified-learning`

## Project Highlights

| Area | Details |
| --- | --- |
| Gamified learning path | Five-zone electricity journey with locked/unlocked states, progress, stars, badges, streaks, Zap feedback, and a final mission. |
| UAE cultural integration | Masdar, ADNOC, Dubai Metro, Jebel Ali, and Barakah-inspired contexts with UAE flag accents and Arabic support. |
| UI/UX quality | Clear student flow from mission brief to map, lesson, activity, reflection, unlock, and completion summary. |
| Micro-animations | Framer Motion transitions, progress feedback, guide reactions, badge moments, and lightweight activity feedback. |
| Accessibility | Semantic buttons, keyboard-friendly controls, visible focus, live feedback regions, reduced-motion support, and RTL layout support. |
| React architecture | React/Vite SPA with Context API, `useReducer`, pure reducer/selectors, reusable screens, and a small service layer. |

## Learning Path

| Zone | Topic | Interaction |
| --- | --- | --- |
| Masdar Lighting Zone | Circuit basics | Connect terminals and test a simple circuit. |
| ADNOC Safety Zone | Conductors and insulators | Sort materials into safe electrical categories. |
| Dubai Metro Power Grid | Series and parallel circuits | Compare reliability through circuit scenarios. |
| Jebel Ali Engineering Bay | Troubleshooting | Diagnose faults and choose repair tools. |
| Barakah Control Room | Review mission | Complete a final electricity challenge. |

## Tech Stack

- React 19 and Vite
- Context API with `useReducer`
- Learning content and progress service layer
- Framer Motion
- Lucide React icons
- Plain CSS modules/files
- Vitest and React Testing Library
- ESLint flat config

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Available Scripts

```bash
npm run dev       # start local Vite server
npm run build     # create static production build
npm run preview   # preview the production build
npm run lint      # run ESLint
npm run test      # run Vitest in watch mode
npm run test:run  # run Vitest once for CI
npm run ci        # run tests and build
```

## Project Structure

```text
src/
  App.jsx
  main.jsx
  components/
  context/
  data/
  screens/
  services/
  state/
  __tests__/
```

## Testing

```bash
npm run lint
npm run test:run
npm run build
```
