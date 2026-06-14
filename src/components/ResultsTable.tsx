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

export default function ResultsTable({ results }: { results: Result[] }) {
  // if more than 8 results show first and then last 7 results
  if (results.length > 8) {
    const firstResult = results[0];
    const lastResults = results.slice(-7);
    results = [firstResult, ...lastResults];
  }

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
          {results.map((result, index) => (
            <TableRow key={index} index={index} isAnimated>
              <TableCell index={index} totalRows={results.length} isFirstCol hasTopRadius align="center">
                {result.rank}
              </TableCell>
              <TableCell index={index} totalRows={results.length}>
                <CountryFlag nation={result.nation} />
              </TableCell>
              <TableCell index={index} totalRows={results.length}>
                <span className="truncate w-full">
                  {formatLastname(result.lastname)}
                </span>
              </TableCell>
              <TableCell index={index} totalRows={results.length} isLastCol hasTopRadius align="right">
                {result.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
