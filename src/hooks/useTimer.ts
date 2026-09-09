'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  isCompleted: boolean;
  elapsed: number;
}

interface UseTimerOptions {
  duration: number; // seconds
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
  direction?: 'up' | 'down';
}

export function useTimer(options: UseTimerOptions) {
  const { duration, onComplete, onTick, autoStart = false, direction = 'down' } = options;

  const [state, setState] = useState<TimerState>({
    timeRemaining: direction === 'down' ? duration : 0,
    isRunning: false,
    isCompleted: false,
    elapsed: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  // Keep callbacks fresh
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    startTimeRef.current = Date.now() - (state.elapsed * 1000);

    setState(prev => ({ ...prev, isRunning: true }));

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);

      setState(prev => ({
        ...prev,
        elapsed,
        timeRemaining: direction === 'down' ? remaining : elapsed,
      }));

      onTickRef.current?.(remaining);

      if (direction === 'down' && remaining <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setState(prev => ({ ...prev, isRunning: false, isCompleted: true, timeRemaining: 0 }));
        onCompleteRef.current?.();
      }
    }, 100);
  }, [duration, direction, state.elapsed]);

  const reset = useCallback(() => {
    stop();
    setState({
      timeRemaining: direction === 'down' ? duration : 0,
      isRunning: false,
      isCompleted: false,
      elapsed: 0,
    });
  }, [stop, duration, direction]);

  // Auto-start
  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    start,
    stop,
    reset,
  };
}

/**
 * Format seconds to MM:SS display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds to a human-readable duration string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}
