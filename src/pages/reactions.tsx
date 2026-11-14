import { useMemo } from "react";
import ReactionsTable from "@/components/ReactionsTable";
import { useLiveResults } from "@/hooks/useTiming";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";

export default function ReactionsPage() {
  const { results, title, isConnected, demoMode } = useLiveResults(8);

  const activeData = useMemo(() => {
    const hasReactions = results.some(
      (r) => r.reactionTime !== null && !Number.isNaN(r.reactionTime)
    );
    return hasReactions ? { results, title } : null;
  }, [results, title]);

  const { renderedValue, isExiting } = useAnimatedPresence(activeData);

  if ((isConnected || demoMode) && renderedValue) {
    return (
      <ReactionsTable
        results={renderedValue.results}
        title={renderedValue.title}
        isExiting={isExiting}
      />
    );
  }
  return null;
}
