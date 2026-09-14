// Native SQLite Database Manager & Repository for VoiceBridge
// Powered by Node.js built-in node:sqlite with zero external binary dependencies
import path from 'path';
import bcrypt from 'bcryptjs';

// Dynamically load DatabaseSync from node:sqlite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DatabaseSyncConstructor: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proc = process as any;
  const sqliteModule = proc.getBuiltinModule ? proc.getBuiltinModule('node:sqlite') : eval('require')('node:sqlite');
  DatabaseSyncConstructor = sqliteModule?.DatabaseSync;
} catch (err) {
  console.warn('node:sqlite is not available in current environment:', err);
}

// Database file path
const DB_PATH = path.join(process.cwd(), 'dev.db');

// Global singleton instance for Next.js hot-reloading
const globalForDb = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sqliteDb: any;
};

function initDatabase() {
  if (!DatabaseSyncConstructor) {
    throw new Error('node:sqlite is required to initialize the database.');
  }

  const db = new DatabaseSyncConstructor(DB_PATH);

  // Enable WAL mode for high concurrency
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');

  // Create core schema tables matching prisma/schema.prisma
  db.exec(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      passwordHash TEXT,
      role TEXT DEFAULT 'learner',
      image TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS LearnerProfile (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      track TEXT DEFAULT 'general',
      primaryGoals TEXT DEFAULT '[]',
      primaryDifficulty TEXT,
      nativeLanguage TEXT,
      proficiencyLevel TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS DayProgress (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      dayNumber INTEGER NOT NULL,
      mode TEXT DEFAULT 'full',
      status TEXT DEFAULT 'not_started',
      startedAt TEXT,
      completedAt TEXT,
      currentActivityIndex INTEGER DEFAULT 0,
      totalActivities INTEGER DEFAULT 0,
      completedActivities INTEGER DEFAULT 0,
      speakingMinutes REAL DEFAULT 0,
      xpEarned INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      UNIQUE(userId, dayNumber),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ActivityAttempt (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      dayProgressId TEXT,
      dayNumber INTEGER NOT NULL,
      activityType TEXT NOT NULL,
      activityId TEXT NOT NULL,
      attemptNumber INTEGER DEFAULT 1,
      status TEXT DEFAULT 'not_started',
      mode TEXT DEFAULT 'full',
      responseData TEXT,
      score REAL,
      feedback TEXT,
      duration REAL,
      startedAt TEXT,
      completedAt TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
      FOREIGN KEY (dayProgressId) REFERENCES DayProgress(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Streak (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      currentStreak INTEGER DEFAULT 0,
      longestStreak INTEGER DEFAULT 0,
      lastActiveDate TEXT,
      freezesRemaining INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS XpLedger (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      amount INTEGER NOT NULL,
      source TEXT NOT NULL,
      activityId TEXT,
      dayNumber INTEGER,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS AdvancedCommunicationAttempt (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      activityType TEXT NOT NULL,
      scenarioId TEXT,
      learnerTrack TEXT DEFAULT 'general',
      difficulty TEXT DEFAULT 'standard',
      speakingDuration REAL DEFAULT 0,
      startDelay REAL DEFAULT 0,
      interruptions INTEGER DEFAULT 0,
      hintCount INTEGER DEFAULT 0,
      independentCompletion INTEGER DEFAULT 0,
      communicationMetrics TEXT,
      feedback TEXT,
      retryAttemptId TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );
  `);

  // Auto-seed default Admin if no admin exists
  const existingAdmin = db.prepare("SELECT id FROM User WHERE role = 'admin' LIMIT 1").get();
  if (!existingAdmin) {
    const adminId = 'admin-voicebridge-root';
    const adminEmail = 'admin@voicebridge.com';
    const adminHash = bcrypt.hashSync('AdminPass123!', 10);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO User (id, email, name, passwordHash, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, 'admin', ?, ?)
    `).run(adminId, adminEmail, 'System Administrator', adminHash, now, now);

    db.prepare(`
      INSERT INTO LearnerProfile (id, userId, track, primaryGoals, createdAt, updatedAt)
      VALUES (?, ?, 'professional', '["executive_mastery"]', ?, ?)
    `).run('profile-' + adminId, adminId, now, now);

    db.prepare(`
      INSERT INTO Streak (id, userId, currentStreak, longestStreak, createdAt, updatedAt)
      VALUES (?, ?, 10, 10, ?, ?)
    `).run('streak-' + adminId, adminId, now, now);

    console.log('✅ Default Admin account seeded: admin@voicebridge.com / AdminPass123!');
  }

  return db;
}

export const sqlite = globalForDb.sqliteDb ?? initDatabase();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.sqliteDb = sqlite;
}

// -------------------------------------------------------------
// Type Definitions
// -------------------------------------------------------------
export interface DbUser {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
  role: 'learner' | 'admin' | 'coach';
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DbLearnerProfile {
  id: string;
  userId: string;
  track: 'general' | 'professional' | 'student';
  primaryGoals: string;
  primaryDifficulty: string | null;
  nativeLanguage: string | null;
  proficiencyLevel: string | null;
}

export interface DbDayProgress {
  id: string;
  userId: string;
  dayNumber: number;
  mode: 'full' | 'express';
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: string | null;
  completedAt: string | null;
  currentActivityIndex: number;
  totalActivities: number;
  completedActivities: number;
  speakingMinutes: number;
  xpEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface DbActivityAttempt {
  id: string;
  userId: string;
  dayProgressId: string | null;
  dayNumber: number;
  activityType: string;
  activityId: string;
  attemptNumber: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  mode: 'full' | 'express';
  responseData: string | null;
  score: number | null;
  feedback: string | null;
  duration: number | null;
  startedAt: string | null;
  completedAt: string | null;
}

export interface DbStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  freezesRemaining: number;
}

// -------------------------------------------------------------
// Repository Methods
// -------------------------------------------------------------

// --- User Operations ---
export function findUserByEmail(email: string): DbUser | null {
  const row = sqlite.prepare('SELECT * FROM User WHERE LOWER(email) = LOWER(?)').get(email.trim());
  return (row as DbUser) || null;
}

export function findUserById(id: string): DbUser | null {
  const row = sqlite.prepare('SELECT * FROM User WHERE id = ?').get(id);
  return (row as DbUser) || null;
}

export function createUser(params: {
  email: string;
  name: string;
  passwordHash: string;
  role?: 'learner' | 'admin';
  track?: 'general' | 'professional' | 'student';
}): DbUser {
  const id = 'usr_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const now = new Date().toISOString();
  const role = params.role || 'learner';
  const track = params.track || 'general';

  sqlite.prepare(`
    INSERT INTO User (id, email, name, passwordHash, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, params.email.trim().toLowerCase(), params.name.trim(), params.passwordHash, role, now, now);

  sqlite.prepare(`
    INSERT INTO LearnerProfile (id, userId, track, primaryGoals, createdAt, updatedAt)
    VALUES (?, ?, ?, '[]', ?, ?)
  `).run('prof_' + id, id, track, now, now);

  sqlite.prepare(`
    INSERT INTO Streak (id, userId, currentStreak, longestStreak, createdAt, updatedAt)
    VALUES (?, ?, 0, 0, ?, ?)
  `).run('strk_' + id, id, now, now);

  return findUserById(id)!;
}

export function updateUserRole(userId: string, role: 'learner' | 'admin'): boolean {
  const now = new Date().toISOString();
  const result = sqlite.prepare(`
    UPDATE User SET role = ?, updatedAt = ? WHERE id = ?
  `).run(role, now, userId);
  return result.changes > 0;
}

export function deleteUser(userId: string): boolean {
  const result = sqlite.prepare('DELETE FROM User WHERE id = ?').run(userId);
  return result.changes > 0;
}

export function getAllUsers(): (DbUser & { track?: string; currentDay?: number; xpTotal?: number; streak?: number })[] {
  const users = sqlite.prepare(`
    SELECT u.*, p.track,
      COALESCE((SELECT MAX(dayNumber) FROM DayProgress WHERE userId = u.id AND status != 'not_started'), 1) as currentDay,
      COALESCE((SELECT SUM(amount) FROM XpLedger WHERE userId = u.id), 0) as xpTotal,
      COALESCE((SELECT currentStreak FROM Streak WHERE userId = u.id), 0) as streak
    FROM User u
    LEFT JOIN LearnerProfile p ON p.userId = u.id
    ORDER BY u.createdAt DESC
  `).all() as any[];

  return users;
}

// --- Learner Profile Operations ---
export function getLearnerProfile(userId: string): DbLearnerProfile | null {
  const row = sqlite.prepare('SELECT * FROM LearnerProfile WHERE userId = ?').get(userId);
  return (row as DbLearnerProfile) || null;
}

// --- Progress Operations ---
export function getLatestProgress(userId: string): {
  dayNumber: number;
  currentActivityIndex: number;
  status: string;
  totalActivities: number;
  completedActivities: number;
  xpEarned: number;
} | null {
  const row = sqlite.prepare(`
    SELECT * FROM DayProgress
    WHERE userId = ?
    ORDER BY dayNumber DESC
    LIMIT 1
  `).get(userId) as DbDayProgress | undefined;

  if (!row) return null;

  return {
    dayNumber: row.dayNumber,
    currentActivityIndex: row.currentActivityIndex,
    status: row.status,
    totalActivities: row.totalActivities,
    completedActivities: row.completedActivities,
    xpEarned: row.xpEarned,
  };
}

export function getDayProgress(userId: string, dayNumber: number): DbDayProgress | null {
  const row = sqlite.prepare(`
    SELECT * FROM DayProgress WHERE userId = ? AND dayNumber = ?
  `).get(userId, dayNumber);
  return (row as DbDayProgress) || null;
}

export function getAllUserDayProgresses(userId: string): DbDayProgress[] {
  const rows = sqlite.prepare(`
    SELECT * FROM DayProgress WHERE userId = ? ORDER BY dayNumber ASC
  `).all(userId);
  return rows as DbDayProgress[];
}

export function saveDayProgress(userId: string, data: {
  dayNumber: number;
  currentActivityIndex: number;
  totalActivities?: number;
  completedActivities?: number;
  status?: 'not_started' | 'in_progress' | 'completed';
  speakingMinutes?: number;
  xpEarned?: number;
}): DbDayProgress {
  const now = new Date().toISOString();
  const existing = getDayProgress(userId, data.dayNumber);

  if (existing) {
    sqlite.prepare(`
      UPDATE DayProgress
      SET currentActivityIndex = ?,
          totalActivities = COALESCE(?, totalActivities),
          completedActivities = COALESCE(?, completedActivities),
          status = COALESCE(?, status),
          speakingMinutes = speakingMinutes + COALESCE(?, 0),
          xpEarned = xpEarned + COALESCE(?, 0),
          updatedAt = ?
      WHERE id = ?
    `).run(
      data.currentActivityIndex,
      data.totalActivities ?? null,
      data.completedActivities ?? null,
      data.status ?? null,
      data.speakingMinutes ?? 0,
      data.xpEarned ?? 0,
      now,
      existing.id
    );
  } else {
    const id = 'prog_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    sqlite.prepare(`
      INSERT INTO DayProgress (
        id, userId, dayNumber, currentActivityIndex, totalActivities,
        completedActivities, status, speakingMinutes, xpEarned, startedAt, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      userId,
      data.dayNumber,
      data.currentActivityIndex,
      data.totalActivities || 0,
      data.completedActivities || 0,
      data.status || 'in_progress',
      data.speakingMinutes || 0,
      data.xpEarned || 0,
      now,
      now,
      now
    );
  }

  // Update XP Ledger if XP was gained
  if (data.xpEarned && data.xpEarned > 0) {
    addXp(userId, data.xpEarned, `Day ${data.dayNumber} activity`, data.dayNumber);
  }

  // Record active day in streak
  recordStreakActivity(userId);

  return getDayProgress(userId, data.dayNumber)!;
}

// --- Activity Attempt Operations ---
export function saveActivityAttempt(userId: string, attempt: {
  dayNumber: number;
  activityId: string;
  activityType: string;
  status: 'completed' | 'in_progress' | 'skipped';
  responseData?: any;
  score?: number;
  feedback?: any;
  duration?: number;
}): void {
  const now = new Date().toISOString();
  const dayProg = getDayProgress(userId, attempt.dayNumber);
  const id = 'att_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

  sqlite.prepare(`
    INSERT INTO ActivityAttempt (
      id, userId, dayProgressId, dayNumber, activityType, activityId,
      status, responseData, score, feedback, duration, completedAt, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    userId,
    dayProg ? dayProg.id : null,
    attempt.dayNumber,
    attempt.activityType,
    attempt.activityId,
    attempt.status,
    attempt.responseData ? JSON.stringify(attempt.responseData) : null,
    attempt.score ?? null,
    attempt.feedback ? JSON.stringify(attempt.feedback) : null,
    attempt.duration ?? null,
    now,
    now,
    now
  );
}

// --- Streak & XP Operations ---
export function getStreak(userId: string): DbStreak | null {
  const row = sqlite.prepare('SELECT * FROM Streak WHERE userId = ?').get(userId);
  return (row as DbStreak) || null;
}

export function recordStreakActivity(userId: string): void {
  const today = new Date().toISOString().split('T')[0];
  const streak = getStreak(userId);
  const now = new Date().toISOString();

  if (!streak) {
    sqlite.prepare(`
      INSERT INTO Streak (id, userId, currentStreak, longestStreak, lastActiveDate, createdAt, updatedAt)
      VALUES (?, ?, 1, 1, ?, ?, ?)
    `).run('strk_' + userId, userId, today, now, now);
    return;
  }

  if (streak.lastActiveDate === today) return; // already counted today

  // Check if yesterday
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let nextStreak = streak.currentStreak;

  if (streak.lastActiveDate === yesterday) {
    nextStreak += 1;
  } else if (!streak.lastActiveDate) {
    nextStreak = 1;
  } else {
    nextStreak = 1; // reset streak if missed
  }

  const longest = Math.max(streak.longestStreak, nextStreak);

  sqlite.prepare(`
    UPDATE Streak
    SET currentStreak = ?, longestStreak = ?, lastActiveDate = ?, updatedAt = ?
    WHERE userId = ?
  `).run(nextStreak, longest, today, now, userId);
}

export function addXp(userId: string, amount: number, source: string, dayNumber?: number, activityId?: string): void {
  const id = 'xp_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const now = new Date().toISOString();

  sqlite.prepare(`
    INSERT INTO XpLedger (id, userId, amount, source, activityId, dayNumber, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, amount, source, activityId || null, dayNumber || null, now);
}

export function getTotalXp(userId: string): number {
  const row = sqlite.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM XpLedger WHERE userId = ?').get(userId) as any;
  return row ? row.total : 0;
}

// --- Admin Database Operations ---
export function getAdminDashboardStats(): {
  totalUsers: number;
  totalLearners: number;
  totalAdmins: number;
  totalDayProgressRows: number;
  totalCompletedDays: number;
  totalSpeakingMinutes: number;
  totalXpAwarded: number;
} {
  const users = sqlite.prepare('SELECT COUNT(*) as c, role FROM User GROUP BY role').all() as any[];
  let totalLearners = 0;
  let totalAdmins = 0;
  let totalUsers = 0;

  users.forEach(u => {
    totalUsers += u.c;
    if (u.role === 'admin') totalAdmins += u.c;
    else totalLearners += u.c;
  });

  const prog = sqlite.prepare(`
    SELECT
      COUNT(*) as totalRows,
      COALESCE(SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END), 0) as completedDays,
      COALESCE(SUM(speakingMinutes), 0) as speakingMinutes
    FROM DayProgress
  `).get() as any;

  const xp = sqlite.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM XpLedger').get() as any;

  return {
    totalUsers,
    totalLearners,
    totalAdmins,
    totalDayProgressRows: prog.totalRows,
    totalCompletedDays: prog.completedDays,
    totalSpeakingMinutes: Math.round((prog.speakingMinutes || 0) * 10) / 10,
    totalXpAwarded: xp.total,
  };
}

export function getTableNames(): string[] {
  const rows = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all() as any[];
  return rows.map(r => r.name);
}

export function getTableData(tableName: string, limit = 50, offset = 0): { columns: string[]; rows: any[]; totalCount: number } {
  const safeName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
  const countRow = sqlite.prepare(`SELECT COUNT(*) as c FROM ${safeName}`).get() as any;
  const rows = sqlite.prepare(`SELECT * FROM ${safeName} LIMIT ? OFFSET ?`).all(limit, offset) as any[];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return {
    columns,
    rows,
    totalCount: countRow ? countRow.c : 0,
  };
}

export function executeAdminQuery(query: string, params: any[] = []): { changes?: number; rows?: any[] } {
  const trimmed = query.trim();
  if (trimmed.toUpperCase().startsWith('SELECT')) {
    const rows = sqlite.prepare(trimmed).all(...params) as any[];
    return { rows };
  } else {
    const result = sqlite.prepare(trimmed).run(...params);
    return { changes: result.changes };
  }
}

export default sqlite;
