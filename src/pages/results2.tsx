import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import countryMapping from "../country-mapping.json";
import Flag from "react-world-flags";

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
  const [results, setResults] = useState<Result[]>([
    /*{
      firstname: "",
      lastname: "Klasen",
      rank: "1",
      result: "10.23",
      time: "10.23",
      bib: "123",
      nation: "GER",
    },
    {
      firstname: "",
      lastname: "Marion",
      rank: "2",
      result: "10.24",
      time: "10.24",
      bib: "123",
      nation: "GER | LC Rehlingen",
    },
    {
      firstname: "",
      lastname: "Strupp",
      rank: "3",
      result: "10.26",
      time: "10.26",
      bib: "123",
      nation: "GER",
    }*/
  ]);
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

  /*const [place, setPlace] = useState(1);

  useEffect(() => {
    // add new result line every 2 seconds
    const interval = setInterval(() => {
      setResults((results) => {
        if (results.length >= 10) {
          return results;
        }
        const newResult = {
          firstname: "",
          lastname: "Klasen",
          rank: `${place}`,
          result: "10.23",
          time: "10.23",
          bib: "123",
          nation: "GBR",
        };
        setPlace((place) => place + 1);
        console.log(place);
        return [newResult, ...results];
      });
    }, 2000);
    return () => clearInterval(interval);
  });*/

  function findCountryByIocCode(iocCode: string) {
    // return random country
    //return countryMapping[Math.floor(Math.random() * countryMapping.length)];

    const country = countryMapping.find(
      (country) => country.ioc.toUpperCase() === iocCode.toUpperCase()
    );
    if (country) {
      return country;
    }
    return null;
  }

  if (readyState === ReadyState.OPEN) {
    return (
      <div className=" flex flex-col gap-4 justify-between">
        <table className=" bg-white rounded-md table-fixed w-full ">
          <thead className="rounded-t-md collapse w-full">
            <tr className="text-left bg-red-500">
              <th className="p-4 rounded-tl-md w-4">Rang</th>
              <th className="p-4 w-11">Nation</th>
              <th className="p-4 w-48">Name</th>
              <th className="rounded-tr-md p-4">Ergebnis</th>
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
                        findCountryByIocCode(result.nation.split(/\|/)[0].trim())?.[
                          "iso-3166-1-alpha2"
                        ]
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
                    {result.time}
                  </td>
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
