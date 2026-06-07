import { Startlist } from "@/types";

export default function UpcomingTable({
  startlists,
}: {
  startlists: Startlist[];
}) {
  return (
    <div className="w-full h-full flex flex-col text-2xl sm:text-3xl md:text-4xl">
      <div className="p-2 font-bold text-left bg-gray-200 rounded-t-md truncate w-full table-caption-header">
        Kommende Läufe
      </div>
      <table className="table-fixed w-full">
        <thead className="collapse w-full">
          <tr>
            <th className="p-4 w-24">Zeit</th>
            <th className="p-4">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {startlists.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-0 text-center ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${index === startlists.length - 1 ? "rounded-bl-md" : ""}`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center justify-center h-full">
                    {result.startTime}
                  </div>
                </td>
                <td
                  className={`p-0 ${
                    index != 0 ? "border-gray-300 border-t-2" : ""
                  } ${index === startlists.length - 1 ? "rounded-br-md" : ""}`}
                >
                  <div className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 overflow-hidden flex items-center h-full min-w-0 w-full">
                    <span className="truncate w-full">{result.title}</span>
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
