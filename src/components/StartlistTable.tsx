import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";

export default function StartlistTable({
  startlist,
}: {
  startlist: Startlist;
}) {
  return (
    <div className="h-screen flex flex-col justify-end antialiased w-[22%] text-2xl">
      <table className="rounded-md table-fixed w-full">
        <caption className="p-2 font-bold text-left bg-gray-200 rounded-t-md">
          {startlist.title}
        </caption>
        <thead className="sticky top-0 collapse">
          <tr className="text-left">
            <th className="p-4 w-12">Bahn</th>
            <th className="p-4 w-12">Nation</th>
            <th className="p-4 w-min">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {startlist.members.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-2 text-center ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${
                    index === startlist.members.length - 1
                      ? "rounded-bl-md"
                      : ""
                  }`}
                >
                  {result.lane}
                </td>
                <td
                  className={`p-2 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  }`}
                >
                  <CountryFlag nation={result.nation} />
                </td>
                <td
                  className={`p-2
                      ${
                        index != 0
                          ? "border-gray-300 border-collapse border-t-2"
                          : ""
                      } ${
                    index === startlist.members.length - 1
                      ? "rounded-br-md"
                      : ""
                  }`}
                >
                  {result.firstname} {result.lastname.toUpperCase()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
