import ReactionsTable from "@/components/ReactionsTable";
import { useLiveResults } from "@/hooks/useTiming";

export default function ReactionsPage() {
  const { results, isConnected, demoMode } = useLiveResults(8);

  if (isConnected || demoMode) {
    return <ReactionsTable results={results} />;
  }
  return null;
}
