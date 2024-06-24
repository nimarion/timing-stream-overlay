import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Flag from "react-world-flags";
import { findCountryByIocCode } from "@/country-utils";

type StartlistEvent = {
  title: string;
  distance: number;
  members: StartlistMember[];
};

type StartlistMember = {
  firstname: string;
  lastname: string;
  bib: string;
  nation: string;
  lane: string;
};

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [results, setResults] = useState<StartlistEvent>();

  useEffect(() => {
    if (!lastJsonMessage) return;
    const type = lastJsonMessage.type;
    if (type === "startlist") {
      const results = lastJsonMessage;
      setResults(results);
    }
  }, [lastJsonMessage]);

  if (readyState === ReadyState.OPEN) {
    if (!results) {
      return null;
    }
    return (
      <table className="rounded-md table-fixed w-full ">
        <caption className="text-xl p-2 font-bold text-left bg-gray-200 rounded-t-md">
          {results.title}
        </caption>
        <thead className="collapse w-full">
          <tr>
            <th className="p-4 w-4">Bahn</th>
            <th className="p-4 w-11">Nation</th>
            <th className="p-4 w-min">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {results.members.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-2 ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${
                    index === results.members.length - 1 ? "rounded-bl-md" : ""
                  }`}
                >
                  {result.lane}
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
                  className={`p-2 
                      ${
                        index != 0
                          ? "border-gray-300 border-collapse border-t-2"
                          : ""
                      } ${
                    index === results.members.length - 1 ? "rounded-br-md" : ""
                  }`}
                >
                  {result.firstname} {result.lastname}
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
