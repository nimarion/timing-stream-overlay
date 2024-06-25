import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";

export default function StartlistTable({
  startlist,
}: {
  startlist: Startlist;
}) {
  return (
    <table className="rounded-md table-fixed w-full ">
      <caption className="text-xl p-2 font-bold text-left bg-gray-200 rounded-t-md">
        {startlist.title}
      </caption>
      <thead className="collapse w-full">
        <tr>
          <th className="p-4 w-4">Bahn</th>
          <th className="p-4 w-11">Nation</th>
          <th className="p-4 w-min">Name</th>
        </tr>
      </thead>

      <tbody className="font-bold ">
        {startlist.members.map((result, index) => {
          return (
            <tr key={index} className="bg-gray-100">
              <td
                className={`p-2 ${
                  index === 0 ? "" : "border-gray-300 border-t-2"
                } ${
                  index === startlist.members.length - 1 ? "rounded-bl-md" : ""
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
                  index === startlist.members.length - 1 ? "rounded-br-md" : ""
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
