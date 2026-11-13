import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";
import { parseNationAndClub } from "@/utils/country";
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
        <span className="truncate">{startlist.title}</span>
      </TableCaption>
      <Table>
        <TableHeader className="sticky top-0">
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Bahn</TableHeaderCell>
          <TableHeaderCell className="w-12 sm:w-16 md:w-20">Nation</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {startlist.members.map((member, index) => {
            const { club } = parseNationAndClub(member.nation);

            return (
              <TableRow key={`${member.bib}-${member.lane}`} index={index}>
                <TableCell
                  index={index}
                  totalRows={startlist.members.length}
                  isFirstCol
                  align="center"
                >
                  {member.lane}
                </TableCell>
                <TableCell index={index} totalRows={startlist.members.length}>
                  <CountryFlag nation={member.nation} />
                </TableCell>
                <TableCell
                  index={index}
                  totalRows={startlist.members.length}
                  isLastCol
                >
                  <div className="flex items-baseline gap-3 truncate w-full min-w-0">
                    <span className="truncate">
                      {member.firstname} {member.lastname.toUpperCase()}
                    </span>
                    {club && (
                      <span className="text-theme-secondary font-normal text-[0.65em] truncate shrink">
                        {club}
                      </span>
                    )}
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
