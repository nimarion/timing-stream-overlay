import { Result } from "@/types";
import CountryFlag from "./CountryFlag";
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/Table";

export default function ReactionsTable({ results }: { results: Result[] }) {
  return (
    <TableContainer>
      <Table className="rounded-md">
        <TableHeader className="rounded-t-md">
          <TableHeaderCell className="rounded-tl-md w-12 sm:w-16 md:w-20">Rang</TableHeaderCell>
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Nation</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell className="rounded-tr-md text-right w-56 sm:w-64 md:w-72">Reaktionszeit</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {results.filter(results => results.reactionTime).map((result, index) => {
            return (
              <TableRow key={index} index={index} isAnimated>
                <TableCell index={index} totalRows={results.length} isFirstCol hasTopRadius align="center">
                  {result.rank}
                </TableCell>
                <TableCell index={index} totalRows={results.length}>
                  <CountryFlag nation={result.nation} />
                </TableCell>
                <TableCell index={index} totalRows={results.length}>
                  <span className="truncate w-full">
                    {result.lastname.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell index={index} totalRows={results.length} isLastCol hasTopRadius align="right">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
