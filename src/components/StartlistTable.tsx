import { Startlist } from "@/types";
import CountryFlag from "./CountryFlag";
import { parseNationAndClub } from "@/utils/country";
import {
  TableContainer,
  TableCard,
  TableCaption,
  HeaderPill,
  Table,
  TableBody,
  TableRow,
  TableCell,
  LaneBadge,
} from "./ui/Table";

export default function StartlistTable({
  startlist,
  isExiting = false,
}: {
  startlist: Startlist;
  isExiting?: boolean;
}) {
  return (
    <TableContainer>
      <TableCard
        isExiting={isExiting}
        batchKey={`${startlist.title}-${startlist.startTime}`}
      >
        <TableCaption
          rightContent={
            <>
              {startlist.distance > 0 && (
                <HeaderPill variant="neutral">{startlist.distance}m</HeaderPill>
              )}
              {startlist.startTime && (
                <HeaderPill variant="accent">{startlist.startTime}</HeaderPill>
              )}
            </>
          }
        >
          {startlist.title}
        </TableCaption>

        <Table>
          <colgroup>
            <col className="w-16 sm:w-20 md:w-24" />
            <col className="w-16 sm:w-20 md:w-24" />
            <col />
          </colgroup>

          <TableBody>
            {startlist.members.map((member, index) => {
              const { club } = parseNationAndClub(member.nation);

              return (
                <TableRow
                  key={`${member.bib}-${member.lane}`}
                  index={index}
                  isAnimated
                >
                  <TableCell align="center">
                    <LaneBadge lane={member.lane} />
                  </TableCell>
                  <TableCell>
                    <CountryFlag nation={member.nation} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-baseline gap-3 truncate w-full min-w-0">
                      <span className="truncate">
                        <span className="font-normal opacity-85">
                          {member.firstname}
                        </span>{" "}
                        <span className="font-bold tracking-wide">
                          {member.lastname.toUpperCase()}
                        </span>
                      </span>
                      {club && (
                        <span className="text-theme-secondary font-normal text-[0.6em] truncate shrink">
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
      </TableCard>
    </TableContainer>
  );
}
