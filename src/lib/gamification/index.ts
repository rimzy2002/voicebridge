// ============================================================
// Gamification Engine — XP, Streaks, Badges
// ============================================================

import { BadgeDefinition, XpTransaction } from '@/types';

// --- XP Rules ---
export const XP_RULES: Record<string, number> = {
  activity_completed: 10,
  recording_completed: 15,
  retry_completed: 10,
  badge_awarded: 25,
  mission_completed: 20,
  day_completed: 30,
  week_completed: 100,
  streak_bonus_7: 50,
  streak_bonus_14: 75,
  streak_bonus_21: 100,
  streak_bonus_30: 200,
  vocabulary_activated: 5,
};

// --- Badge Definitions ---
export const BADGES: BadgeDefinition[] = [
  {
    slug: 'first-step',
    name: 'First Step',
    description: 'Completed Day 1 — Discovered your communication level',
    icon: '🏅',
    category: 'completion',
    dayRequired: 1,
  },
  {
    slug: 'conversation-builder',
    name: 'Conversation Builder',
    description: 'Maintained a 5-minute AI conversation with follow-up questions and natural reactions',
    icon: '💬',
    category: 'skill',
    dayRequired: 3,
  },
  {
    slug: 'storyteller',
    name: 'Storyteller',
    description: 'Told a clear 2-3 minute story with beginning, middle and end',
    icon: '📖',
    category: 'skill',
    dayRequired: 4,
  },
  {
    slug: 'vocabulary-upgrader',
    name: 'Vocabulary Upgrader',
    description: 'Actively used 5+ upgraded expressions in speech',
    icon: '📚',
    category: 'skill',
    dayRequired: 5,
  },
  {
    slug: 'clear-speaker',
    name: 'Clear Speaker',
    description: 'Demonstrated improved clarity, stress and rhythm',
    icon: '🔊',
    category: 'skill',
    dayRequired: 6,
  },
  {
    slug: 'foundation-builder',
    name: 'Foundation Builder',
    description: 'Completed Week 1 and unlocked Week 2',
    icon: '🏆',
    category: 'milestone',
    dayRequired: 7,
  },
  {
    slug: 'keep-going',
    name: 'Keep Going',
    description: 'Completed a story without restarting',
    icon: '🎯',
    category: 'special',
  },
  // --- Week 3 Professional Badges ---
  {
    slug: 'meeting-contributor',
    name: 'Meeting Contributor',
    description: 'Actively contributed concise updates, ideas, and polite interruptions in meetings',
    icon: '👥',
    category: 'skill',
    dayRequired: 16,
  },
  {
    slug: 'interview-ready',
    name: 'Interview Ready',
    description: 'Structured compelling behavioral interview answers using the STAR framework',
    icon: '🎯',
    category: 'skill',
    dayRequired: 17,
  },
  {
    slug: 'data-narrator',
    name: 'Data Narrator',
    description: 'Described data trends accurately and clearly distinguished facts from inferences',
    icon: '📊',
    category: 'skill',
    dayRequired: 18,
  },
  {
    slug: 'feedback-master',
    name: 'Feedback Master',
    description: 'Delivered constructive SBI feedback and handled difficult conversations with composure',
    icon: '⚖️',
    category: 'skill',
    dayRequired: 19,
  },
  {
    slug: 'negotiator',
    name: 'Strategic Negotiator',
    description: 'Negotiated trade-offs effectively and confirmed actionable agreements under constraints',
    icon: '🤝',
    category: 'skill',
    dayRequired: 20,
  },
  {
    slug: 'professional-communicator',
    name: 'Professional Communicator',
    description: 'Completed Week 3 and demonstrated end-to-end professional communication mastery',
    icon: '💼',
    category: 'milestone',
    dayRequired: 21,
  },
  // --- Week 4 Advanced Communication & Capstone Badges ---
  {
    slug: 'complex-explainer',
    name: 'Master of Clarity',
    description: 'Explained complex ideas simply and adapted explanations to three distinct audiences',
    icon: '💡',
    category: 'skill',
    dayRequired: 22,
  },
  {
    slug: 'persuasion-master',
    name: 'Persuasion Master',
    description: 'Persuaded with evidence, handled objections, and proposed action without pressuring',
    icon: '🎯',
    category: 'skill',
    dayRequired: 23,
  },
  {
    slug: 'leadership-communicator',
    name: 'Leadership Voice',
    description: 'Delivered clear direction, honest uncertainty, and respectful delegation like a leader',
    icon: '👑',
    category: 'skill',
    dayRequired: 24,
  },
  {
    slug: 'diplomatic-speaker',
    name: 'Diplomatic Speaker',
    description: 'Expressed nuanced opinions and soft disagreement using calibrated hedging',
    icon: '🕊️',
    category: 'skill',
    dayRequired: 25,
  },
  {
    slug: 'debate-champion',
    name: 'Thoughtful Debater',
    description: 'Steelmaned opposing arguments fairly and defended positions with evidence',
    icon: '⚔️',
    category: 'skill',
    dayRequired: 26,
  },
  {
    slug: 'calm-under-pressure',
    name: 'Calm Under Pressure',
    description: 'Handled tough, multi-part questions with composed pauses and intellectual honesty',
    icon: '🧘',
    category: 'skill',
    dayRequired: 27,
  },
  {
    slug: 'advanced-listener',
    name: 'Deep Listener',
    description: 'Listened for stance, tone, and action items in rapid international speech',
    icon: '🎧',
    category: 'skill',
    dayRequired: 28,
  },
  {
    slug: 'independent-performer',
    name: 'Independent Performer',
    description: 'Completed multi-stage communication rehearsal with 100% zero hint dependency',
    icon: '🦅',
    category: 'skill',
    dayRequired: 29,
  },
  {
    slug: 'confident-communicator',
    name: 'Confident Communicator',
    description: 'Completed the 30-Day Communication Transformation Program and Final Assessment',
    icon: '🌟',
    category: 'milestone',
    dayRequired: 30,
  },
];

/**
 * Calculate total XP from ledger entries
 */
export function calculateTotalXp(entries: { amount: number }[]): number {
  return entries.reduce((total, entry) => total + entry.amount, 0);
}

/**
 * Determine level from total XP
 */
export function getLevel(totalXp: number): { level: number; xpInLevel: number; xpForNextLevel: number } {
  // Each level requires progressively more XP
  // Level 1: 0-100, Level 2: 100-250, Level 3: 250-500, etc.
  const levelThresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 5000];

  let level = 1;
  for (let i = 1; i < levelThresholds.length; i++) {
    if (totalXp >= levelThresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  const currentThreshold = levelThresholds[level - 1] || 0;
  const nextThreshold = levelThresholds[level] || currentThreshold + 1000;

  return {
    level,
    xpInLevel: totalXp - currentThreshold,
    xpForNextLevel: nextThreshold - currentThreshold,
  };
}

/**
 * Check if a streak should be maintained or reset
 */
export function calculateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: Date | null,
  todayDate: Date = new Date()
): { currentStreak: number; longestStreak: number; maintained: boolean } {
  if (!lastActivityDate) {
    return { currentStreak: 1, longestStreak: Math.max(longestStreak, 1), maintained: true };
  }

  const lastDate = new Date(lastActivityDate);
  const today = new Date(todayDate);

  // Normalize to date only (ignore time)
  lastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day — streak already counted
    return { currentStreak, longestStreak, maintained: true };
  } else if (diffDays === 1) {
    // Consecutive day — increment streak
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      maintained: true,
    };
  } else {
    // Streak broken — reset to 1
    return { currentStreak: 1, longestStreak, maintained: false };
  }
}

/**
 * Get badge by slug
 */
export function getBadgeBySlug(slug: string): BadgeDefinition | undefined {
  return BADGES.find(b => b.slug === slug);
}

/**
 * Get badges available for a specific day
 */
export function getBadgesForDay(dayNumber: number): BadgeDefinition[] {
  return BADGES.filter(b => b.dayRequired === dayNumber);
}

/**
 * Create XP transaction for a specific action
 */
export function createXpTransaction(
  source: string,
  dayNumber?: number,
  sourceId?: string,
  customAmount?: number,
  description?: string
): XpTransaction {
  return {
    amount: customAmount ?? XP_RULES[source] ?? 10,
    source: source as XpTransaction['source'],
    sourceId,
    description,
    dayNumber,
  };
}
