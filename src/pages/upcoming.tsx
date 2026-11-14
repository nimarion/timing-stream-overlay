import { useMemo } from "react";
import UpcomingTable from "@/components/UpcomingTable";
import { useLiveUpcoming } from "@/hooks/useTiming";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";

export default function UpcomingPage() {
  const { startlists, isConnected, demoMode } = useLiveUpcoming();

  const activeStartlists = useMemo(
    () => (startlists.length > 0 ? startlists.slice(0, 5) : null),
    [startlists]
  );

  const { renderedValue, isExiting } = useAnimatedPresence(activeStartlists);

  if ((isConnected || demoMode) && renderedValue) {
    return <UpcomingTable startlists={renderedValue} isExiting={isExiting} />;
  }
  return null;
}
