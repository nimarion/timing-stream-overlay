import { Result } from "@/types";
import CountryFlag from "./CountryFlag";

export default function ReactionsTable({ results }: { results: Result[] }) {
  return (
    <div className="w-full h-full flex flex-col text-2xl sm:text-3xl md:text-4xl">
      <table className="rounded-md table-fixed w-full">
        <thead className="rounded-t-md collapse w-full">
          <tr className="text-left">
            <th className="p-4 rounded-tl-md w-12 sm:w-16 md:w-20">Rang</th>
            <th className="p-4 w-12 sm:w-16 md:w-20">Nation</th>
            <th className="p-4">Name</th>
            <th className="rounded-tr-md p-4 text-right w-56 sm:w-64 md:w-72">Reaktionszeit</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {results.filter(results => results.reactionTime).map((result, index) => {
            return (
              <tr
                key={index}
                className={`bg-gray-100 ${
                  index !== 0 ? `cssanimation sequence fadeInBottom` : ""
                }`}
              >
                <td
                  className={`p-0 text-center ${
                    index === 0
                      ? "rounded-tl-md "
                      : "border-gray-300 border-t-2"
                  } ${index === results.length - 1 ? "rounded-bl-md" : ""}`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center justify-center h-full">
                    {result.rank}
                  </div>
                </td>
                <td
                  className={`p-0 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center h-full">
                    <CountryFlag nation={result.nation} />
                  </div>
                </td>
                <td
                  className={`p-0 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center h-full min-w-0 w-full">
                    <span className="truncate w-full">
                      {result.lastname.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td
                  className={`p-0 text-right ${
                    index === 0
                      ? "rounded-tr-md "
                      : "border-gray-300  border-collapse border-t-2"
                  } ${index === results.length - 1 ? "rounded-br-md" : ""}`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center justify-end h-full w-full">
                    <div className="flex flex-row items-center gap-2 bg-black p-1 rounded-md w-min ml-auto">
                      <div className="relative h-5 w-40 bg-neutral-800 rounded overflow-hidden">
                        {/* Gradient Reaction Time Bar */}
                        <div
                          className="h-5 transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (result.reactionTime! / 0.25) * 100,
                              100
                            )}%`,
                            background: "linear-gradient(to right, yellow, red)",
                          }}
                        ></div>

                        {/* White Marker at 100ms */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white"
                          style={{ left: `${(0.1 / 0.25) * 100}%` }}
                        ></div>
                      </div>

                      {/* Time Display */}
                      <span className="text-white text-sm font-bold">
                        {result.reactionTime!.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
