// ============================================================
// Curriculum Engine — Activity Sequencing & Day Assembly
// ============================================================

import { ActivityDefinition, DayDefinition, LearnerTrack } from '@/types';

/**
 * Get activities for a day filtered by mode and track
 */
export function getActivitiesForDay(
  day: DayDefinition,
  mode: 'full' | 'express',
  track: LearnerTrack
): ActivityDefinition[] {
  let activities = day.activities;

  // Filter by mode
  if (mode === 'express') {
    activities = activities.filter(a => a.expressMode);
  }

  // Apply track variants
  activities = activities.map(activity => {
    if (activity.trackVariants && activity.trackVariants[track]) {
      return {
        ...activity,
        config: {
          ...activity.config,
          ...activity.trackVariants[track],
        },
      };
    }
    return activity;
  });

  // Sort by order
  return activities.sort((a, b) => a.order - b.order);
}

/**
 * Calculate estimated duration for a set of activities
 */
export function calculateEstimatedDuration(activities: ActivityDefinition[]): number {
  return activities.reduce((total, activity) => {
    return total + (activity.durationMinutes || 2);
  }, 0);
}

/**
 * Get the next incomplete activity
 */
export function getNextActivity(
  activities: ActivityDefinition[],
  completedActivityIds: string[]
): ActivityDefinition | null {
  return activities.find(a => !completedActivityIds.includes(a.id)) || null;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(
  completedCount: number,
  totalCount: number
): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}

/**
 * Check if a day is unlocked based on completion rules
 */
export function isDayUnlocked(
  dayNumber: number,
  completedDays: number[],
  currentDay: number
): boolean {
  if (dayNumber === 1) return true;
  if (dayNumber <= currentDay) return true;
  // Day N is unlocked if Day N-1 is completed
  return completedDays.includes(dayNumber - 1);
}

/**
 * Check if a week is unlocked
 */
export function isWeekUnlocked(
  weekNumber: number,
  completedDays: number[]
): boolean {
  if (weekNumber === 1) return true;
  // Week 2 unlocked when Day 7 completed, etc.
  const lastDayOfPreviousWeek = (weekNumber - 1) * 7;
  return completedDays.includes(lastDayOfPreviousWeek);
}

/**
 * Get the week number for a given day
 */
export function getWeekNumber(dayNumber: number): number {
  if (dayNumber <= 7) return 1;
  if (dayNumber <= 14) return 2;
  if (dayNumber <= 21) return 3;
  return 4;
}

/**
 * Get all days in a week
 */
export function getDaysInWeek(weekNumber: number): number[] {
  const start = (weekNumber - 1) * 7 + 1;
  const end = weekNumber === 4 ? 30 : weekNumber * 7;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
