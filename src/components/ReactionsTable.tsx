import { Result } from "@/types";
import CountryFlag from "./CountryFlag";
import { cn, formatLastname } from "@/utils";
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/Table";

const MAX_REACTION_SCALE = 0.25;
const LEGAL_REACTION_LIMIT = 0.1;

export default function ReactionsTable({ results }: { results: Result[] }) {
  const filteredResults = results.filter(
    (r): r is Result & { reactionTime: number } =>
      r.reactionTime !== null && !Number.isNaN(r.reactionTime)
  );

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
          {filteredResults.map((result, index) => {
            const isFalseStart = result.reactionTime < LEGAL_REACTION_LIMIT;
            const barPercent = Math.max(
              0,
              Math.min((result.reactionTime / MAX_REACTION_SCALE) * 100, 100)
            );

            return (
              <TableRow key={`${result.bib}-${result.rank}`} index={index} isAnimated>
                <TableCell
                  index={index}
                  totalRows={filteredResults.length}
                  isFirstCol
                  hasTopRadius
                  align="center"
                >
                  {result.rank}
                </TableCell>
                <TableCell index={index} totalRows={filteredResults.length}>
                  <CountryFlag nation={result.nation} />
                </TableCell>
                <TableCell index={index} totalRows={filteredResults.length}>
                  <span className="truncate w-full">
                    {formatLastname(result.lastname)}
                  </span>
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={filteredResults.length}
                  isLastCol
                  hasTopRadius
                  align="right"
                >
                  <div
                    className={cn(
                      "flex flex-row items-center gap-2 bg-theme-panel p-1.5 rounded-md w-min ml-auto",
                      isFalseStart && "ring-2 ring-red-500"
                    )}
                  >
                    <div className="relative h-5 w-40 bg-black/60 rounded overflow-hidden">
                      <div
                        className="h-5 transition-all duration-300"
                        style={{
                          width: `${barPercent}%`,
                          background: isFalseStart
                            ? "#ef4444"
                            : "linear-gradient(to right, #eab308, #ef4444)",
                        }}
                      />

                      {/* White Marker at 100ms (World Athletics False Start Threshold) */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white"
                        style={{ left: `${(LEGAL_REACTION_LIMIT / MAX_REACTION_SCALE) * 100}%` }}
                      />
                    </div>

                    <span
                      className={cn(
                        "font-mono text-sm font-bold tabular-nums px-1",
                        isFalseStart ? "text-red-400" : "text-theme-primary"
                      )}
                    >
                      {result.reactionTime.toFixed(3)}
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
