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
        <span className="truncate">Kommende Läufe</span>
      </TableCaption>
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-24">Zeit</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {startlists.map((item, index) => {
            return (
              <TableRow
                key={`${item.date}-${item.startTime}-${item.title}`}
                index={index}
              >
                <TableCell
                  index={index}
                  totalRows={startlists.length}
                  isFirstCol
                  align="center"
                >
                  {item.startTime}
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={startlists.length}
                  isLastCol
                >
                  <span className="truncate w-full">{item.title}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
