import { useEffect, useState } from "react";
import { Result } from "@/types";
import CountryFlag from "./CountryFlag";
import { formatLastname } from "@/utils";
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/Table";

const PAGE_ROTATION_MS = 5000;

export default function ResultsTable({ results }: { results: Result[] }) {
  const totalPages =
    results.length <= 8 ? 1 : 1 + Math.ceil((results.length - 8) / 7);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [results.length]);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, PAGE_ROTATION_MS);
    return () => clearInterval(interval);
  }, [totalPages]);

  const activePage = page < totalPages ? page : 0;
  const visibleResults =
    results.length <= 8
      ? results
      : activePage === 0
        ? results.slice(0, 8)
        : [
            results[0],
            ...results.slice(8 + (activePage - 1) * 7, 8 + activePage * 7),
          ];

  const isLeaderPinnedWithGap = results.length > 8 && activePage > 0;

  return (
    <TableContainer className="justify-end antialiased">
      <Table className="rounded-md">
        <TableHeader className="sticky top-0">
          <TableHeaderCell className="rounded-tl-md w-12 sm:w-16 md:w-20">Rang</TableHeaderCell>
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Nation</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell className="rounded-tr-md text-right w-32 sm:w-48 md:w-56">Ergebnis</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {visibleResults.map((result, index) => {
            const showPinnedDivider = isLeaderPinnedWithGap && index === 1;

            return (
              <TableRow
                key={`${result.bib}-${result.rank}`}
                index={index}
                isAnimated
              >
                <TableCell
                  index={index}
                  totalRows={visibleResults.length}
                  isFirstCol
                  hasTopRadius
                  align="center"
                  className={showPinnedDivider ? "!border-t-4 !border-theme-accent/70" : ""}
                >
                  {result.rank}
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={visibleResults.length}
                  className={showPinnedDivider ? "!border-t-4 !border-theme-accent/70" : ""}
                >
                  <CountryFlag nation={result.nation} />
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={visibleResults.length}
                  className={showPinnedDivider ? "!border-t-4 !border-theme-accent/70" : ""}
                >
                  <span className="truncate w-full">
                    {formatLastname(result.lastname)}
                  </span>
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={visibleResults.length}
                  isLastCol
                  hasTopRadius
                  isAccentMono
                  align="right"
                  className={showPinnedDivider ? "!border-t-4 !border-theme-accent/70" : ""}
                >
                  {result.time}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
