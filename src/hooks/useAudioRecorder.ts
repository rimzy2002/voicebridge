'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioRecorderState {
  status: 'idle' | 'requesting' | 'countdown' | 'recording' | 'paused' | 'stopped' | 'error';
  audioBlob: Blob | null;
  audioUrl: string | null;
  duration: number;
  error: string | null;
  permissionDenied: boolean;
  analyserNode: AnalyserNode | null;
}

interface UseAudioRecorderOptions {
  maxDuration?: number;  // seconds
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  countdownSeconds?: number;
}

export function useAudioRecorder(options: UseAudioRecorderOptions = {}) {
  const { maxDuration, onRecordingComplete, countdownSeconds = 0 } = options;

  const [state, setState] = useState<AudioRecorderState>({
    status: 'idle',
    audioBlob: null,
    audioUrl: null,
    duration: 0,
    error: null,
    permissionDenied: false,
    analyserNode: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
      countdownRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    mediaRecorderRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const requestMicPermission = useCallback(async (): Promise<MediaStream | null> => {
    try {
      setState(prev => ({ ...prev, status: 'requesting', error: null, permissionDenied: false }));
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });
      return stream;
    } catch (err) {
      const error = err as Error;
      const isDenied = error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError';
      setState(prev => ({
        ...prev,
        status: 'error',
        error: isDenied
          ? 'Microphone access was denied. Please allow microphone access in your browser settings.'
          : 'Could not access microphone. Please check your audio settings.',
        permissionDenied: isDenied,
      }));
      return null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const startRecording = useCallback(async () => {
    chunksRef.current = [];

    const stream = await requestMicPermission();
    if (!stream) return;

    streamRef.current = stream;

    // Set up audio analyser for waveform visualization
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const startActualRecording = () => {
      // Determine supported MIME type
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const duration = (Date.now() - startTimeRef.current) / 1000;

        setState(prev => ({
          ...prev,
          status: 'stopped',
          audioBlob: blob,
          audioUrl: url,
          duration,
          analyserNode: null,
        }));

        onRecordingComplete?.(blob, duration);

        // Cleanup stream
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      };

      mediaRecorder.onerror = () => {
        setState(prev => ({
          ...prev,
          status: 'error',
          error: 'Recording failed. Please try again.',
          analyserNode: null,
        }));
        cleanup();
      };

      startTimeRef.current = Date.now();
      mediaRecorder.start(1000); // collect data every second

      setState(prev => ({
        ...prev,
        status: 'recording',
        duration: 0,
        audioBlob: null,
        audioUrl: null,
        analyserNode: analyser,
      }));

      // Duration timer
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setState(prev => ({ ...prev, duration: elapsed }));

        if (maxDuration && elapsed >= maxDuration) {
          stopRecording();
        }
      }, 100);
    };

    if (countdownSeconds > 0) {
      setState(prev => ({ ...prev, status: 'countdown', analyserNode: analyser }));
      countdownRef.current = setTimeout(startActualRecording, countdownSeconds * 1000);
    } else {
      startActualRecording();
    }
  }, [requestMicPermission, maxDuration, onRecordingComplete, countdownSeconds, cleanup, stopRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setState(prev => ({ ...prev, status: 'paused' }));
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      startTimeRef.current = Date.now() - state.duration * 1000;
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setState(prev => ({ ...prev, duration: elapsed }));

        if (maxDuration && elapsed >= maxDuration) {
          stopRecording();
        }
      }, 100);
      setState(prev => ({ ...prev, status: 'recording' }));
    }
  }, [state.duration, maxDuration, stopRecording]);

  const discardRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      status: 'idle',
      audioBlob: null,
      audioUrl: null,
      duration: 0,
      error: null,
      permissionDenied: false,
      analyserNode: null,
    });
    chunksRef.current = [];
  }, [state.audioUrl]);

  const resetRecorder = useCallback(() => {
    cleanup();
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      status: 'idle',
      audioBlob: null,
      audioUrl: null,
      duration: 0,
      error: null,
      permissionDenied: false,
      analyserNode: null,
    });
    chunksRef.current = [];
  }, [cleanup, state.audioUrl]);

  return {
    ...state,
    isRecording: state.status === 'recording',
    isPaused: state.status === 'paused',
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    discardRecording,
    resetRecorder,
  };
}
