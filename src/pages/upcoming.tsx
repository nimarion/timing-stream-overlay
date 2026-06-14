import UpcomingTable from "@/components/UpcomingTable";
import { useLiveUpcoming } from "@/hooks/useTiming";

export default function UpcomingPage() {
  const { startlists, isConnected, demoMode } = useLiveUpcoming();

  if (isConnected || demoMode) {
    return <UpcomingTable startlists={startlists.slice(0, 5)} />;
  }
  return null;
}
