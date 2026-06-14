import ResultsTable from "@/components/ResultsTable";
import { useLiveResults } from "@/hooks/useTiming";

export default function ResultsPage() {
  const { results, isConnected, demoMode } = useLiveResults();

  if (isConnected || demoMode) {
    return <ResultsTable results={results} />;
  }
  return null;
}
