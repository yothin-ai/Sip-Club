import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  grinders,
  drippers,
  sampleRecipe,
  type AnalysisResult,
  type Recipe,
} from "@sip-club/core";

export type ScreenIndex = 0 | 1 | 2 | 3 | 4;

interface TimerState {
  elapsed: number; // seconds
  running: boolean;
}

interface AppState {
  screen: ScreenIndex;
  grinderId: string | null;
  dripperId: string | null;
  analyzed: boolean;
  analysisResult: AnalysisResult | null;
  recipe: Recipe | null;
  timer: TimerState;
  feedback: string[];
  saved: boolean;
}

interface AppContextValue extends AppState {
  goNext: () => void;
  goBack: () => void;
  setGrinderId: (id: string) => void;
  setDripperId: (id: string) => void;
  runAnalysis: () => Promise<void>;
  startBrew: () => void;
  tickTimer: () => void;
  toggleTimerRunning: () => void;
  finishBrew: () => void;
  toggleFeedbackTag: (id: string) => void;
  saveFeedback: () => void;
  resetForNewBrew: () => void;
}

const initialState: AppState = {
  screen: 0,
  grinderId: grinders[0]?.id ?? null,
  dripperId: drippers[0]?.id ?? null,
  analyzed: false,
  analysisResult: null,
  recipe: null,
  timer: { elapsed: 0, running: false },
  feedback: [],
  saved: false,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const goNext = useCallback(() => {
    setState((s) => ({ ...s, screen: Math.min(4, s.screen + 1) as ScreenIndex }));
  }, []);

  const goBack = useCallback(() => {
    setState((s) => ({ ...s, screen: Math.max(0, s.screen - 1) as ScreenIndex }));
  }, []);

  const setGrinderId = useCallback((id: string) => {
    setState((s) => ({ ...s, grinderId: id }));
  }, []);

  const setDripperId = useCallback((id: string) => {
    setState((s) => ({ ...s, dripperId: id }));
  }, []);

  // TODO: call supabase analyze-bag edge function instead of mocking.
  // For now this mocks the ~1.5s analysis delay described in README.md section 6.B / PROMPTS.md 3.2.
  const runAnalysis = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const result: AnalysisResult = {
      roast: sampleRecipe.roast as AnalysisResult["roast"],
      process: sampleRecipe.process as AnalysisResult["process"],
      origin: sampleRecipe.origin,
      confidence: { roast: 0.91, process: 0.87, origin: 0.78 },
    };
    setState((s) => ({
      ...s,
      analyzed: true,
      analysisResult: result,
      recipe: { ...sampleRecipe, dripper_id: s.dripperId ?? sampleRecipe.dripper_id, grinder_id: s.grinderId ?? sampleRecipe.grinder_id },
    }));
  }, []);

  const startBrew = useCallback(() => {
    setState((s) => ({ ...s, timer: { elapsed: 0, running: true }, screen: 3 }));
  }, []);

  const tickTimer = useCallback(() => {
    setState((s) => {
      if (!s.timer.running) return s;
      return { ...s, timer: { ...s.timer, elapsed: s.timer.elapsed + 1 } };
    });
  }, []);

  const toggleTimerRunning = useCallback(() => {
    setState((s) => ({ ...s, timer: { ...s.timer, running: !s.timer.running } }));
  }, []);

  const finishBrew = useCallback(() => {
    setState((s) => ({ ...s, timer: { ...s.timer, running: false }, screen: 4 }));
  }, []);

  const toggleFeedbackTag = useCallback((id: string) => {
    setState((s) => {
      const isExclusive = id === "perfect";
      let next: string[];
      if (isExclusive) {
        next = s.feedback.includes(id) ? [] : [id];
      } else if (s.feedback.includes(id)) {
        next = s.feedback.filter((t) => t !== id);
      } else {
        next = [...s.feedback.filter((t) => t !== "perfect"), id];
      }
      return { ...s, feedback: next };
    });
  }, []);

  const saveFeedback = useCallback(() => {
    setState((s) => ({ ...s, saved: true }));
  }, []);

  const resetForNewBrew = useCallback(() => {
    setState((s) => ({
      ...initialState,
      grinderId: s.grinderId,
      dripperId: s.dripperId,
      screen: 1,
    }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      goNext,
      goBack,
      setGrinderId,
      setDripperId,
      runAnalysis,
      startBrew,
      tickTimer,
      toggleTimerRunning,
      finishBrew,
      toggleFeedbackTag,
      saveFeedback,
      resetForNewBrew,
    }),
    [
      state,
      goNext,
      goBack,
      setGrinderId,
      setDripperId,
      runAnalysis,
      startBrew,
      tickTimer,
      toggleTimerRunning,
      finishBrew,
      toggleFeedbackTag,
      saveFeedback,
      resetForNewBrew,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
