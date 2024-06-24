import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type StartlistEvent = {
  title: string;
  distance: number;
  startTime: string;
  date: string;
};

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [results, setResults] = useState<StartlistEvent[]>([]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const type = lastJsonMessage.type;
    if (type === "startlists") {
      setResults(lastJsonMessage.startlists);
    }
  }, [lastJsonMessage]);

  if (readyState === ReadyState.OPEN) {
    return (
      <table className="rounded-md table-fixed w-full ">
        <caption className="text-xl p-2 font-bold text-left bg-gray-200 rounded-t-md">
          Kommende Läufe
        </caption>
        <thead className="collapse w-full">
          <tr>
            <th className="p-4 w-14">Zeit</th>
            <th className="p-4 w-min">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {results.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-2 ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${index === results.length - 1 ? "rounded-bl-md" : ""}`}
                >
                  {result.startTime}
                </td>
                <td
                  className={`p-2 
                      ${
                        index != 0
                          ? "border-gray-300 border-collapse border-t-2"
                          : ""
                      } ${index === results.length - 1 ? "rounded-br-md" : ""}`}
                >
                  {result.title}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <div className="w-screen flex flex-row gap-4 justify-end p-4">
      <div className="bg-gray-100 flex w-auto	 p-4 rounded-md text-right text-4xl justify-center items-center">
        <p className="time text-right w-full font-bold">Connecting...</p>
      </div>
    </div>
  );
}
