import LowerThird from "@/components/LowerThird";
import { useLiveLowerThird } from "@/hooks/useTiming";

export default function LowerThirdPage() {
  const { athlete, isConnected, demoMode } = useLiveLowerThird();

  if (isConnected || demoMode) {
    return <LowerThird athlete={athlete} />;
  }
  
  return null;
}
