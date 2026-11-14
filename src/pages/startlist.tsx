import StartlistTable from "@/components/StartlistTable";
import { useLiveStartlist } from "@/hooks/useTiming";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";

export default function StartlistPage() {
  const { startlist, isConnected, demoMode } = useLiveStartlist();
  const { renderedValue, isExiting } = useAnimatedPresence(startlist);

  if ((isConnected || demoMode) && renderedValue) {
    return <StartlistTable startlist={renderedValue} isExiting={isExiting} />;
  }
  return null;
}
