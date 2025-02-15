import { Startlist } from "@/types";

export default function UpcomingTable({
  startlists,
}: {
  startlists: Startlist[];
}) {
  return (
    <div className="h-screen flex flex-col justify-end w-[22%] text-2xl">
      <table className="rounded-md table-fixed w-full">
        <caption className="p-2 font-bold text-left bg-gray-200 rounded-t-md">
          Kommende Läufe
        </caption>
        <thead className="collapse w-full">
          <tr>
            <th className="p-4 w-20">Zeit</th>
            <th className="p-4 w-min">Name</th>
          </tr>
        </thead>

        <tbody className="font-bold ">
          {startlists.map((result, index) => {
            return (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`p-2 text-center ${
                    index === 0 ? "" : "border-gray-300 border-t-2"
                  } ${index === startlists.length - 1 ? "rounded-bl-md" : ""}`}
                >
                  {result.startTime}
                </td>
                <td
                  className={`p-2 
                      ${
                        index != 0
                          ? "border-gray-300 border-collapse border-t-2"
                          : ""
                      } ${
                    index === startlists.length - 1 ? "rounded-br-md" : ""
                  }`}
                >
                  {result.title}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
