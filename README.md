# VoiceBridge 🎙️

Enterprise-ready 30-day English communication transformation platform with AI coaching, personalized speaking practice, fluency tracking, weekly diagnostics, professional roleplays, vocabulary activation, pronunciation training, and real-world communication challenges.

## 🚀 Overview

**VoiceBridge** is designed specifically for intermediate and upper-intermediate adult learners who know English grammar and rules, but struggle with spontaneous speech, mental translation, hesitation, and structure in high-stakes personal and professional settings.

### Core Architecture
- **Curriculum Engine**: 30 structured days divided into 4 sequential phases (Activate English, Build Fluency, Communicate Professionally, Advanced Mastery).
- **Personalized Tracks**: Dynamic variants for Professionals, Students, and General Communication.
- **Interactive Activities**:
  - 🎙️ Speech Recording with countdown, duration limits, and audio playback
  - 📐 Communication Frameworks (PREP, STAR, Pyramid)
  - ✨ Vocabulary Activation & Web Speech Pronunciation
  - 🎯 Real-World Micro-Missions & Commitment Tracking
  - 🧠 Reflective Assessments & Daily Scorecards
  - ⚡ Full vs. Express (10-15 min) Adaptive Modes

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if port 3000 is occupied) in your browser.

## 📁 Project Structure

```
├── prisma/               # Database schema and models
├── public/               # Static assets and icons
├── src/
│   ├── app/              # Next.js App Router (Landing & Day routes)
│   ├── components/       # UI & Activity shell components
│   ├── hooks/            # Custom hooks (useAudioRecorder, useTimer)
│   ├── lib/              # AI, Curriculum engine, DB & Gamification
│   └── types/            # TypeScript definitions & activity configs
```

## 📄 License
MIT
