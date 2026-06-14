import StartlistTable from "@/components/StartlistTable";
import { useLiveStartlist } from "@/hooks/useTiming";

export default function StartlistPage() {
  const { startlist, isConnected, demoMode } = useLiveStartlist();

  if (isConnected || demoMode) {
    if (!startlist) {
      return null;
    }
    return <StartlistTable startlist={startlist} />;
  }
  return null;
}
