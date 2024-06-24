import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type Result = {
  firstname: string;
  lastname: string;
  rank: string;
  bib: string;
  nation: string;
  result: string;
  time: string;
};

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    if (!lastJsonMessage) return;
    const type = lastJsonMessage.type;
    if (type === "results") {
      const results = lastJsonMessage.results;
      setResults(results);
    } else if (type === "raceStarted") {
      setResults([]);
    }
  }, [lastJsonMessage]);
  if (readyState === ReadyState.OPEN) {
    return (
      <div className="w-screen flex flex-col gap-4 justify-between">
        <table className="w-full bg-white rounded-md">
          <thead className="rounded-t-md">
            <tr className="text-left bg-red-500">
              <th className="p-4 rounded-tl-md">Rang</th>
              <th className="p-4">Name</th>
              <th className="p-4">Nation</th>
              <th className="rounded-tr-md p-4">Ergebnis</th>
            </tr>
          </thead>

          <tbody className="font-bold  w-full" id="resultTable">
            {results.map((result, index) => {
              return (
                <tr key={index}>
                  <td className="p-4">{result.rank}</td>
                  <td className="p-4">
                    {result.firstname} {result.lastname}
                  </td>
                  <td className="p-4">{result.nation}</td>
                  <td className="p-4 rounded-r-md">{result.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
