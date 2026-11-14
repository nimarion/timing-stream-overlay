import { useEffect, useRef, useState } from "react";

/**
 * Retains the last non-null value during an exit animation window so broadcast
 * overlays smoothly animate out instead of vanishing in a single frame.
 */
export function useAnimatedPresence<T>(
  value: T | null | undefined,
  exitDurationMs: number = 360
): { renderedValue: T | null; isExiting: boolean } {
  const [renderedValue, setRenderedValue] = useState<T | null>(value ?? null);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setRenderedValue(value);
      setIsExiting(false);
    } else if (renderedValue !== null) {
      setIsExiting(true);
      timerRef.current = setTimeout(() => {
        setRenderedValue(null);
        setIsExiting(false);
        timerRef.current = null;
      }, exitDurationMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // Intentionally react to incoming `value` transitions while preserving `renderedValue` during exit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, exitDurationMs]);

  return { renderedValue, isExiting };
}
