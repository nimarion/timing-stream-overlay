import { Startlist } from "@/types";
import {
  TableContainer,
  TableCaption,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/Table";

export default function UpcomingTable({
  startlists,
}: {
  startlists: Startlist[];
}) {
  return (
    <TableContainer>
      <TableCaption>
        Kommende Läufe
      </TableCaption>
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-24">Zeit</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {startlists.map((result, index) => {
            return (
              <TableRow key={index} index={index}>
                <TableCell index={index} totalRows={startlists.length} isFirstCol align="center">
                  {result.startTime}
                </TableCell>
                <TableCell index={index} totalRows={startlists.length} isLastCol>
                  <span className="truncate w-full">{result.title}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
