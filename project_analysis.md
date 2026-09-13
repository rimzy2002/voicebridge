# VoiceBridge Project Analysis

This document provides a comprehensive and in-depth analysis of the **VoiceBridge** project—a 30-day English communication transformation platform designed for intermediate and upper-intermediate adult learners.

## 1. Project Overview

VoiceBridge focuses on moving learners from knowing English to confidently *using* English. It is structured around a 30-day curriculum divided into 4 phases, focusing on spontaneous speech, mental translation reduction, and professional communication.

### Target Audience
- Learners struggling with speaking quickly, mental translation, hesitation, vocabulary retrieval, and answering under pressure.
- **Three Personalization Tracks**:
  - 🎓 **Student**: Academic discussions, class presentations, interviews.
  - 💼 **Professional**: Meetings, client communication, leadership.
  - 🗣️ **General English**: Travel, social conversations, relationships.

---

## 2. Technology Stack

The project uses a modern web development stack (MERN-adjacent, specifically the Next.js ecosystem):

- **Framework**: [Next.js (v16.3.4 App Router)](https://nextjs.org/)
- **UI Library**: [React 19.2.8](https://react.dev/)
- **Database ORM**: [Prisma (^8.0.0-rc.13)](https://www.prisma.io/) with SQLite configuration.
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Utilities**: `date-fns` for date manipulation, `uuid` for identifier generation, `bcryptjs` for authentication hashing.

---

## 3. Core Architecture & Working Principle

The application is built around a "Curriculum Engine" that delivers daily activities. 

### Page Structure
- `src/app/page.tsx`: The landing page which introduces the 30-day program, the learning loop, and provides the entry point (`/day/1`).
- `src/app/day/[dayNumber]/`: Dynamic routes that handle the execution of specific curriculum days.

### Component Architecture
- **ActivityShell (`src/components/activity/ActivityShell.tsx`)**: The core engine that runs a day's curriculum. It acts as a state machine:
  - Fetches the activities for the current day based on the track (Student/Professional/General) and mode (Full/Express).
  - Manages the user's progress through a sequence of activities using `currentIndex`.
  - Handles XP awarding and streak tracking.
  - Saves intermediate progress to `localStorage` (e.g., `day-1-progress`) for persistence.
  - Renders specific activity sub-components (e.g., `RecordingActivity`, `OpinionBuilderActivity`) based on the `ActivityDefinition.type`.

### Data Flow
1. **User Onboarding**: The user selects a track (Student/Professional/General) and mode (Full/Express).
2. **Daily Curriculum**: The user navigates to `/day/[dayNumber]`. The `ActivityShell` loads the curriculum definition from `src/lib/curriculum/days/day[X].ts`.
3. **Activity Execution**: The user goes through various interactive steps. For speaking activities, audio is recorded (handled by hooks like `useAudioRecorder` and `useTimer`).
4. **Analysis & Feedback**: Recorded audio is transcribed and analyzed (simulated or real AI backend) to assess metrics like WPM, filler words, grammar, and fluency.
5. **State Persistence**: Progress is synced locally and eventually pushed to the database via Prisma schemas (e.g., `DayProgress`, `ActivityAttempt`, `Recording`, `SpeechAnalysis`).

---

## 4. Database Schema Summary (Prisma)

The database schema (`prisma/schema.prisma`) is highly detailed and normalized, built to track every aspect of the learner's journey:

- **Users & Auth**: `User`, `Account`, `Session`.
- **Learner Profiles**: `LearnerProfile` (tracks goals, level, mode), `ProgramEnrollment` (tracks 30-day progress).
- **Curriculum Tracking**: `DayProgress` (daily completion status), `ActivityAttempt` (granular tracking of each activity).
- **Audio & Speech Analysis**: `Recording` (audio metadata), `Transcript` (STT output), `SpeechAnalysis` (AI metrics like `wordsPerMinute`, `fillerCount`, `fluencyRating`).
- **Skills & Confidence**: `ConfidenceCheck`, `SkillSnapshot` (daily/weekly snapshots of proficiency).
- **Vocabulary System**: `VocabularyItem` (global dictionary), `LearnerVocabulary` (spaced repetition tracking for the user).
- **Gamification**: `XpLedger` (XP transactions), `Badge`, `BadgeAward`, `Streak`.
- **Advanced Diagnostics**: `WeeklyDiagnostic`, `Week2FluencyMetrics`, `FinalAssessment`, `PostProgramPlan`.

---

## 5. Activity Summary

The platform contains over **60 distinct activity types** handled by the `ActivityShell`. These are designed for active output rather than passive learning:

### Key Activity Types:
- **`RecordingActivity` / `timed_speaking`**: The core loop where users record themselves speaking against a timer or a prompt.
- **`ConfidenceCheckActivity`**: Pre- and post-day self-assessments.
- **`OpinionBuilderActivity`**: Structuring arguments (PREP framework) and defending them.
- **`ListeningInteractiveActivity` / `dictogloss`**: Advanced listening comprehension and summary reconstruction.
- **`VocabularyActivationActivity`**: Turning passive vocabulary into active usage.
- **Simulation Activities**:
  - `MeetingSimulationActivity` (Professional track)
  - `InterviewSimulationActivity` (STAR method)
  - `NetworkingRoleplayActivity`
  - `NegotiationActivity`
  - `DebateSimulationActivity`
- **`FinalTransformationActivity` (Day 30)**: A comprehensive final assessment comparing Day 1 baselines with Day 30 results.

---

## 6. Features & "Buttons"

### Key User Interface Elements
- **Landing Page CTA**: "Start Day 1 — Free" button initiates the curriculum router.
- **Activity Header**: Displays current Day, Mode (Express ⚡ or Full 📖), Streak count 🔥, and earned XP.
- **Progress Bar**: Visually tracks the completion percentage of the day's activities.
- **Navigation Buttons**: "← Previous", "Skip", "Continue →" control the flow through the `ActivityShell` state machine.
- **Recording Controls**: (Within recording activities) Start, Stop, Re-record, and playback buttons tied to audio hooks.

### Modes
- **Full Mode**: Standard 35-45 minute daily session.
- **Express Mode**: Condensed 10-15 minute session for busy days, allowing learners to maintain their streak.

## Conclusion

VoiceBridge is a highly sophisticated, state-driven application. It relies heavily on an active curriculum engine and deeply granular data tracking to measure and improve a user's spoken English. The architecture cleanly separates curriculum definitions (in `src/lib/curriculum`) from the UI execution engine (`ActivityShell`), allowing for immense flexibility in how the 30-day program is delivered.
