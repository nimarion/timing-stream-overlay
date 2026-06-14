import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";
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

export default function StartlistTable({
  startlist,
}: {
  startlist: Startlist;
}) {
  return (
    <TableContainer className="justify-end antialiased">
      <TableCaption>
        {startlist.title}
      </TableCaption>
      <Table>
        <TableHeader className="sticky top-0">
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Bahn</TableHeaderCell>
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Nation</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {startlist.members.map((result, index) => {
            return (
              <TableRow key={index} index={index}>
                <TableCell index={index} totalRows={startlist.members.length} isFirstCol align="center">
                  {result.lane}
                </TableCell>
                <TableCell index={index} totalRows={startlist.members.length}>
                  <CountryFlag nation={result.nation} />
                </TableCell>
                <TableCell index={index} totalRows={startlist.members.length} isLastCol>
                  <span className="truncate w-full">
                    {result.firstname} {result.lastname.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
