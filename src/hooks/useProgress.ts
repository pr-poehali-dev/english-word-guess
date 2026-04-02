import { useState, useCallback } from "react";

const STORAGE_KEY = "space_english_progress";

interface Progress {
  completed: Record<string, boolean>;
  stars: Record<string, number>;
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Progress load error", e);
  }
  return { completed: {}, stars: {} };
}

function saveProgress(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  const complete = useCallback((planetId: string, stars: number) => {
    setProgress((prev) => {
      const next = {
        completed: { ...prev.completed, [planetId]: true },
        stars: { ...prev.stars, [planetId]: Math.max(prev.stars[planetId] || 0, stars) },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (planetId: string) => !!progress.completed[planetId],
    [progress]
  );

  const getStars = useCallback(
    (planetId: string) => progress.stars[planetId] || 0,
    [progress]
  );

  const getTotalStars = useCallback(
    () => Object.values(progress.stars).reduce((a, b) => a + b, 0),
    [progress]
  );

  return { complete, isCompleted, getStars, getTotalStars, progress };
}