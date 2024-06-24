import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Flag from "react-world-flags";
import { findCountryByIocCode } from "@/country-utils";

type Result = {
  firstname: string;
  lastname: string;
  rank: string;
  bib: string;
  nation: string;
  result: string;
  time: string;
  reactionTime: string | null;
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
      <table className=" bg-white rounded-md table-fixed w-full ">
        <thead className="rounded-t-md collapse w-full">
          <tr className="text-left bg-red-500">
            <th className="p-4 rounded-tl-md w-4">Rang</th>
            <th className="p-4 w-11">Nation</th>
            <th className="p-4 w-40">Name</th>
            <th className="rounded-tr-md p-4">Reaktionszeit</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {results.map((result, index) => {
            return (
              <tr
                key={index}
                className={`bg-gray-100 ${
                  index !== 0 ? `cssanimation sequence fadeInBottom` : ""
                }`}
              >
                <td
                  className={`p-2 ${
                    index === 0
                      ? "rounded-tl-md "
                      : "border-gray-300 border-t-2"
                  } ${index === results.length - 1 ? "rounded-bl-md" : ""}`}
                >
                  {result.rank}
                </td>
                <td
                  className={`p-2 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  <Flag
                    height={"16"}
                    code={
                      findCountryByIocCode(
                        result.nation.split(/\|/)[0].trim()
                      )?.["iso-3166-1-alpha2"]
                    }
                    fallback={<span>{result.nation.split(/\|/)[0]}</span>}
                  />
                </td>
                <td
                  className={`p-2 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  {result.lastname.toUpperCase()}
                </td>
                <td
                  className={`p-2 text-right ${
                    index === 0
                      ? "rounded-tr-md "
                      : "border-gray-300  border-collapse border-t-2"
                  } ${index === results.length - 1 ? "rounded-br-md" : ""}`}
                >
                  {result.reactionTime}
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
