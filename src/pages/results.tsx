import { useMemo } from "react";
import ResultsTable from "@/components/ResultsTable";
import { useLiveResults } from "@/hooks/useTiming";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";

export default function ResultsPage() {
  const { results, title, wind, isConnected, demoMode } = useLiveResults();

  const activeData = useMemo(
    () => (results.length > 0 ? { results, title, wind } : null),
    [results, title, wind]
  );

  const { renderedValue, isExiting } = useAnimatedPresence(activeData);

  if ((isConnected || demoMode) && renderedValue) {
    return (
      <ResultsTable
        results={renderedValue.results}
        title={renderedValue.title}
        wind={renderedValue.wind}
        isExiting={isExiting}
      />
    );
  }
  return null;
}
