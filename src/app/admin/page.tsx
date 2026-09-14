'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

type ActiveTab = 'overview' | 'users' | 'progress' | 'database';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected user progress state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserProgress, setSelectedUserProgress] = useState<any>(null);
  const [editingDay, setEditingDay] = useState<any>(null);

  // Database explorer state
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('User');
  const [tableData, setTableData] = useState<{ columns: string[]; rows: any[]; totalCount: number }>({
    columns: [],
    rows: [],
    totalCount: 0,
  });
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Check current session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user.role === 'admin') {
        setIsAdmin(true);
        setCurrentUser(data.user);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load stats
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Load users
  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
        if (!selectedUserId && data.users.length > 0) {
          setSelectedUserId(data.users[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedUserId]);

  // Load database table list & current table data
  const loadTableData = useCallback(async (tableName: string) => {
    try {
      const res = await fetch(`/api/admin/database?table=${tableName}&limit=30`);
      const data = await res.json();
      if (data.tables) setTables(data.tables);
      if (data.rows) {
        setTableData({
          columns: data.columns || [],
          rows: data.rows || [],
          totalCount: data.totalCount || 0,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Load selected user progress
  const loadSelectedUserProgress = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/progress?userId=${userId}`);
      const data = await res.json();
      if (data.dayProgresses) {
        setSelectedUserProgress(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadStats();
      loadUsers();
      loadTableData(selectedTable);
    }
  }, [isAdmin, loadStats, loadUsers, loadTableData, selectedTable]);

  useEffect(() => {
    if (selectedUserId && activeTab === 'progress') {
      loadSelectedUserProgress(selectedUserId);
    }
  }, [selectedUserId, activeTab, loadSelectedUserProgress]);

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(`User role updated to ${newRole}.`);
        loadUsers();
        loadStats();
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        alert(data.error || 'Failed to update user.');
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${email}? All progress will be removed.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(`User ${email} deleted.`);
        loadUsers();
        loadStats();
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        alert(data.error || 'Failed to delete user.');
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Handle update progress
  const handleSaveProgressEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !editingDay) return;

    try {
      const res = await fetch('/api/admin/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUserId,
          dayNumber: editingDay.dayNumber,
          currentActivityIndex: editingDay.currentActivityIndex,
          completedActivities: editingDay.completedActivities,
          status: editingDay.status,
          xpEarned: editingDay.xpEarned,
        }),
      });

      if (res.ok) {
        setActionMessage(`Day ${editingDay.dayNumber} progress modified.`);
        setEditingDay(null);
        loadSelectedUserProgress(selectedUserId);
        loadStats();
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        alert('Failed to update progress.');
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Handle direct SQL query execution
  const handleExecuteSql = async (e: React.FormEvent) => {
    e.preventDefault();
    setQueryError(null);
    setQueryResult(null);

    if (!sqlQuery.trim()) return;

    try {
      const res = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlQuery }),
      });

      const data = await res.json();
      if (res.ok) {
        setQueryResult(data);
        loadTableData(selectedTable);
        loadStats();
      } else {
        setQueryError(data.error || 'Query execution failed.');
      }
    } catch (e: any) {
      setQueryError(e.message || 'Query execution failed.');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading container">
        <div className="glass-card" style={{ padding: 'var(--space-12)', textAlign: 'center', maxWidth: 400, margin: '80px auto' }}>
          <span style={{ fontSize: 'var(--text-3xl)' }}>🛡️</span>
          <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)' }}>Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-denied container">
        <div className="glass-card" style={{ padding: 'var(--space-12)', textAlign: 'center', maxWidth: 480, margin: '80px auto' }}>
          <span style={{ fontSize: 'var(--text-4xl)' }}>🚫</span>
          <h2 style={{ marginTop: 'var(--space-4)', color: 'var(--text-primary)' }}>Administrator Access Required</h2>
          <p style={{ margin: 'var(--space-3) 0 var(--space-6)', color: 'var(--text-secondary)' }}>
            This portal is restricted to system administrators. Please sign in with an administrator account to view and modify user records.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link href="/login" className="btn btn--primary">
              Sign In as Administrator
            </Link>
            <Link href="/" className="btn btn--outline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(
    u =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="admin-portal">
      {/* Top Admin Nav */}
      <header className="admin-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Link href="/" className="admin-brand">
              <span>🗣️ Voice<strong>Bridge</strong></span>
            </Link>
            <span className="badge badge--accent">🛡️ Administrator Console</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="admin-user-pill">
              👤 {currentUser?.name || currentUser?.email}
            </span>
            <Link href="/" className="btn btn--ghost btn--sm">
              Live App
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Admin Action Notification Banner */}
      {actionMessage && (
        <div className="admin-banner container">
          <span>✅ {actionMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="container" style={{ padding: 'var(--space-8) 0' }}>
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-tab ${activeTab === 'overview' ? 'admin-tab--active' : ''}`}
          >
            📊 System Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`admin-tab ${activeTab === 'users' ? 'admin-tab--active' : ''}`}
          >
            👥 Users & Roles ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`admin-tab ${activeTab === 'progress' ? 'admin-tab--active' : ''}`}
          >
            🎯 Curriculum Progress
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`admin-tab ${activeTab === 'database' ? 'admin-tab--active' : ''}`}
          >
            🗄️ Database Explorer
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && stats && (
          <div className="admin-content">
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <span className="stat-label">Total Users</span>
                <span className="stat-value">{stats.totalUsers}</span>
                <span className="stat-sub">{stats.totalLearners} Learners · {stats.totalAdmins} Admins</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-label">Day Progress Records</span>
                <span className="stat-value">{stats.totalDayProgressRows}</span>
                <span className="stat-sub">{stats.totalCompletedDays} Completed Days</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-label">Total Speaking Minutes</span>
                <span className="stat-value">{stats.totalSpeakingMinutes}</span>
                <span className="stat-sub">Across all learner sessions</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-label">Total XP Awarded</span>
                <span className="stat-value">{stats.totalXpAwarded} ⚡</span>
                <span className="stat-sub">From interactive drills</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              <h3>Quick Administrator Actions</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 var(--space-4)', fontSize: 'var(--text-sm)' }}>
                As an administrator, you have unrestricted access to manage learners, grant admin privileges, inspect speech attempts, and execute database queries.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button onClick={() => setActiveTab('users')} className="btn btn--primary btn--sm">
                  Manage Users & Roles →
                </button>
                <button onClick={() => setActiveTab('progress')} className="btn btn--outline btn--sm">
                  Inspect Learner Days →
                </button>
                <button onClick={() => setActiveTab('database')} className="btn btn--ghost btn--sm">
                  Open Database Explorer →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="admin-content">
            <div className="table-header-row">
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Showing {filteredUsers.length} of {users.length} accounts
              </span>
            </div>

            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Learner</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Track</th>
                    <th>Current Day</th>
                    <th>Total XP</th>
                    <th>Streak</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td>
                        <strong>{u.name || 'Unnamed'}</strong>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={e => handleRoleChange(u.id, e.target.value)}
                          className="role-select"
                        >
                          <option value="learner">learner</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td>
                        <span className="badge badge--outline" style={{ textTransform: 'capitalize' }}>
                          {u.track}
                        </span>
                      </td>
                      <td>Day {u.currentDay}</td>
                      <td>{u.xpTotal} ⚡</td>
                      <td>🔥 {u.streak}d</td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button
                            onClick={() => {
                              setSelectedUserId(u.id);
                              setActiveTab('progress');
                            }}
                            className="btn btn--outline btn--xs"
                            title="Inspect Progress"
                          >
                            Inspect
                          </button>
                          {u.id !== currentUser?.id && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.email)}
                              className="btn btn--ghost btn--xs text-danger"
                              title="Delete User"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CURRICULUM PROGRESS INSPECTION & MODIFICATION */}
        {activeTab === 'progress' && (
          <div className="admin-content">
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)' }}>
              {/* User Selector List */}
              <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>Select Learner</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxHeight: 500, overflowY: 'auto' }}>
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUserId(u.id)}
                      className={`user-pick-btn ${selectedUserId === u.id ? 'user-pick-btn--active' : ''}`}
                    >
                      <strong>{u.name || u.email}</strong>
                      <small>{u.email} · Day {u.currentDay}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Detail */}
              <div>
                {selectedUserProgress ? (
                  <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                      <div>
                        <h3>{selectedUserProgress.user.name} ({selectedUserProgress.user.email})</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                          {selectedUserProgress.dayProgresses.length} day progress records · {selectedUserProgress.attempts.length} activity attempts
                        </p>
                      </div>
                    </div>

                    {/* Day Progress Table */}
                    <table className="admin-table" style={{ marginBottom: 'var(--space-6)' }}>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Status</th>
                          <th>Activity Step</th>
                          <th>Speaking Min</th>
                          <th>XP</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedUserProgress.dayProgresses.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                              No day progress recorded yet.
                            </td>
                          </tr>
                        ) : (
                          selectedUserProgress.dayProgresses.map((p: any) => (
                            <tr key={p.id}>
                              <td><strong>Day {p.dayNumber}</strong></td>
                              <td>
                                <span className={`badge ${p.status === 'completed' ? 'badge--success' : 'badge--primary'}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td>Activity {p.currentActivityIndex}</td>
                              <td>{p.speakingMinutes} min</td>
                              <td>{p.xpEarned} XP</td>
                              <td>
                                <button
                                  onClick={() => setEditingDay({ ...p })}
                                  className="btn btn--outline btn--xs"
                                >
                                  Edit Progress
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    {/* Progress Editor Modal / Inset */}
                    {editingDay && (
                      <form onSubmit={handleSaveProgressEdit} className="edit-progress-box">
                        <h4>Edit Progress for Day {editingDay.dayNumber}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-3)', margin: 'var(--space-3) 0' }}>
                          <div>
                            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Status</label>
                            <select
                              value={editingDay.status}
                              onChange={e => setEditingDay({ ...editingDay, status: e.target.value })}
                              className="form-input"
                              style={{ padding: '6px' }}
                            >
                              <option value="not_started">not_started</option>
                              <option value="in_progress">in_progress</option>
                              <option value="completed">completed</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Activity Index</label>
                            <input
                              type="number"
                              value={editingDay.currentActivityIndex}
                              onChange={e => setEditingDay({ ...editingDay, currentActivityIndex: parseInt(e.target.value, 10) })}
                              className="form-input"
                              style={{ padding: '6px' }}
                            />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Completed Count</label>
                            <input
                              type="number"
                              value={editingDay.completedActivities}
                              onChange={e => setEditingDay({ ...editingDay, completedActivities: parseInt(e.target.value, 10) })}
                              className="form-input"
                              style={{ padding: '6px' }}
                            />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>XP Earned</label>
                            <input
                              type="number"
                              value={editingDay.xpEarned}
                              onChange={e => setEditingDay({ ...editingDay, xpEarned: parseInt(e.target.value, 10) })}
                              className="form-input"
                              style={{ padding: '6px' }}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button type="submit" className="btn btn--primary btn--sm">
                            Save Changes
                          </button>
                          <button type="button" onClick={() => setEditingDay(null)} className="btn btn--ghost btn--sm">
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Select a learner from the left to view and modify their progress.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE EXPLORER & SQL RUNNER */}
        {activeTab === 'database' && (
          <div className="admin-content">
            {/* Table Navigation */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              {tables.map(t => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTable(t);
                    loadTableData(t);
                  }}
                  className={`btn btn--sm ${selectedTable === t ? 'btn--primary' : 'btn--outline'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* SQL Query Console */}
            <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <h4>⚡ Direct SQL Console</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                Execute safe SQL queries directly on <code>dev.db</code> (e.g. <code>SELECT * FROM User LIMIT 10</code> or <code>UPDATE User SET role=&apos;admin&apos; WHERE email=...</code>).
              </p>
              <form onSubmit={handleExecuteSql}>
                <textarea
                  value={sqlQuery}
                  onChange={e => setSqlQuery(e.target.value)}
                  placeholder="SELECT id, email, role, createdAt FROM User ORDER BY createdAt DESC LIMIT 10;"
                  rows={3}
                  className="sql-textarea"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                  <button type="submit" className="btn btn--primary btn--sm">
                    Execute Query
                  </button>
                  {queryResult && (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success-600)' }}>
                      Query executed successfully! {queryResult.rows ? `${queryResult.rows.length} rows returned` : `${queryResult.changes} rows changed`}
                    </span>
                  )}
                </div>
              </form>

              {queryError && (
                <div className="auth-alert auth-alert--error" style={{ marginTop: 'var(--space-3)' }}>
                  <span>⚠️</span>
                  <span>{queryError}</span>
                </div>
              )}
            </div>

            {/* Table Viewer */}
            <div className="glass-card table-wrapper">
              <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Table: {selectedTable} ({tableData.totalCount} total rows)</strong>
                <button onClick={() => loadTableData(selectedTable)} className="btn btn--ghost btn--xs">
                  ↻ Refresh
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      {tableData.columns.map(col => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.length === 0 ? (
                      <tr>
                        <td colSpan={tableData.columns.length || 1} style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                          No records in this table.
                        </td>
                      </tr>
                    ) : (
                      tableData.rows.map((row, idx) => (
                        <tr key={idx}>
                          {tableData.columns.map(col => (
                            <td key={col} style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-portal {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .admin-header {
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--border-default);
          background: var(--bg-surface);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .admin-brand {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: var(--text-lg);
        }

        .admin-user-pill {
          font-size: var(--text-xs);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-default);
          color: var(--text-secondary);
        }

        .admin-banner {
          background: rgba(34, 197, 94, 0.1);
          border-bottom: 1px solid rgba(34, 197, 94, 0.25);
          padding: var(--space-2) var(--space-4);
          color: var(--color-success-600);
          font-weight: 600;
          font-size: var(--text-sm);
        }

        .admin-tabs {
          display: flex;
          gap: var(--space-2);
          border-bottom: 1px solid var(--border-default);
          padding-bottom: var(--space-3);
          margin-bottom: var(--space-6);
        }

        .admin-tab {
          padding: var(--space-2) var(--space-4);
          background: none;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          font-size: var(--text-sm);
          transition: all var(--transition-fast);
        }

        .admin-tab:hover {
          background: var(--bg-surface-subtle);
          color: var(--text-primary);
        }

        .admin-tab--active {
          background: var(--bg-surface);
          border-color: var(--border-default);
          color: var(--color-primary-600);
          box-shadow: var(--shadow-sm);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--space-4);
        }

        .stat-card {
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .stat-value {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .stat-sub {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
        }

        .table-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .search-input {
          width: 320px;
          padding: var(--space-2) var(--space-3);
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--text-sm);
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: var(--radius-lg);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }

        .admin-table th {
          text-align: left;
          padding: var(--space-3) var(--space-4);
          background: var(--bg-surface-subtle);
          border-bottom: 1px solid var(--border-default);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: var(--text-xs);
          text-transform: uppercase;
        }

        .admin-table td {
          padding: var(--space-3) var(--space-4);
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        .admin-table tr:hover td {
          background: var(--bg-surface-subtle);
        }

        .role-select {
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-default);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .user-pick-btn {
          padding: var(--space-2) var(--space-3);
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-fast);
        }

        .user-pick-btn:hover {
          background: var(--bg-surface);
        }

        .user-pick-btn--active {
          border-color: var(--color-primary-500);
          background: rgba(99, 102, 241, 0.08);
        }

        .edit-progress-box {
          margin-top: var(--space-4);
          padding: var(--space-4);
          border: 1px dashed var(--color-primary-500);
          border-radius: var(--radius-md);
          background: var(--bg-surface-subtle);
        }

        .sql-textarea {
          width: 100%;
          font-family: monospace;
          font-size: var(--text-sm);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-default);
          background: var(--bg-surface-subtle);
          color: var(--text-primary);
          resize: vertical;
        }

        .sql-textarea:focus {
          outline: none;
          border-color: var(--color-primary-500);
        }

        .text-danger {
          color: var(--color-danger-500) !important;
        }
      `}</style>
    </div>
  );
}
