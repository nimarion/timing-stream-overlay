import { Result } from "@/types";
import CountryFlag from "./CountryFlag";

export default function ResultsTable({ results }: { results: Result[] }) {
  return (
    <div className="h-screen flex flex-col justify-end w-[22%] text-2xl">
      <table className="rounded-md table-fixed w-full">
        <thead className="sticky top-0 collapse">
          <tr className="text-left">
            <th className="p-4 rounded-tl-md w-12">Rang</th>
            <th className="p-4 w-16">Nation</th>
            <th className="p-4 w-48">Name</th>
            <th className="rounded-tr-md p-4 text-right">Ergebnis</th>
          </tr>
        </thead>

        <tbody className="font-bold">
          {results.map((result, index) => (
            <tr
              key={index}
              className={`bg-gray-100 ${
                index !== 0 ? `cssanimation sequence fadeInBottom` : ""
              }`}
            >
              <td
                className={`p-2 text-center ${
                  index === 0 ? "rounded-tl-md" : "border-t-2 border-gray-300"
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
                  index === 0 ? "rounded-tr-md" : "border-t-2 border-gray-300"
                } ${index === results.length - 1 ? "rounded-br-md" : ""}`}
              >
                {result.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
