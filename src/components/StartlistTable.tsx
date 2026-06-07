import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";

export default function StartlistTable({
  startlist,
}: {
  startlist: Startlist;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-end antialiased text-2xl sm:text-3xl md:text-4xl">
      <div className="p-2 font-bold text-left bg-gray-200 rounded-t-md truncate w-full table-caption-header">
        {startlist.title}
      </div>
      <table className="table-fixed w-full">
        <thead className="sticky top-0 collapse">
          <tr className="text-left">
            <th className="p-4 w-12 sm:w-16 md:w-20">Bahn</th>
            <th className="p-4 w-12 sm:w-16 md:w-20">Nation</th>
            <th className="p-4">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {startlist.members.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-0 text-center ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${
                    index === startlist.members.length - 1
                      ? "rounded-bl-md"
                      : ""
                  }`}
                >
                  <div className="px-2 py-2 overflow-hidden flex items-center justify-center h-full">
                    {result.lane}
                  </div>
                </td>
                <td
                  className={`p-0 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  <div className="px-2 py-2 overflow-hidden flex items-center h-full">
                    <CountryFlag nation={result.nation} />
                  </div>
                </td>
                <td
                  className={`p-0 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  } ${
                    index === startlist.members.length - 1
                      ? "rounded-br-md"
                      : ""
                  }`}
                >
                  <div className="px-2 py-2 overflow-hidden flex items-center h-full min-w-0 w-full">
                    <span className="truncate w-full">
                      {result.firstname} {result.lastname.toUpperCase()}
                    </span>
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
