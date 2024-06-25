import { Result } from "@/types";
import CountryFlag from "./CountryFlag";

export default function ResultsTable({ results }: { results: Result[] }) {
  return (
    <table className=" bg-white rounded-md table-fixed w-full ">
      <thead className="rounded-t-md collapse w-full">
        <tr className="text-left">
          <th className="p-4 rounded-tl-md w-4">Rang</th>
          <th className="p-4 w-11">Nation</th>
          <th className="p-4 w-40">Name</th>
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
                  index === 0 ? "rounded-tl-md " : "border-gray-300 border-t-2"
                } ${index === results.length - 1 ? "rounded-bl-md" : ""}`}
              >
                {result.rank}
              </td>
              <td
                className={`p-2 ${
                  index != 0 ? "border-gray-300 border-t-2" : ""
                }`}
              >
                <CountryFlag nation={result.nation} />
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
  );
}
