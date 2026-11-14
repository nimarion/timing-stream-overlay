import { Startlist } from "@/types";
import { getOverlayLabels } from "@/utils/i18n";
import {
  TableContainer,
  TableCard,
  TableCaption,
  HeaderPill,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/Table";

export default function UpcomingTable({
  startlists,
  isExiting = false,
}: {
  startlists: Startlist[];
  isExiting?: boolean;
}) {
  const labels = getOverlayLabels();

  return (
    <TableContainer>
      <TableCard isExiting={isExiting} batchKey={`upcoming-${startlists.length}`}>
        <TableCaption>{labels.upcomingTitle}</TableCaption>

        <Table>
          <colgroup>
            <col className="w-28 sm:w-32 md:w-36" />
            <col />
          </colgroup>

          <TableBody>
            {startlists.map((item, index) => {
              return (
                <TableRow
                  key={`${item.date}-${item.startTime}-${item.title}`}
                  index={index}
                  isAnimated
                >
                  <TableCell align="center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-theme-panel/70 border border-theme-border font-mono font-bold text-[0.75em] text-theme-accent tabular-nums">
                      {item.startTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-3 w-full min-w-0">
                      <span className="font-bold truncate">{item.title}</span>
                      {item.distance > 0 && (
                        <HeaderPill variant="neutral" className="shrink-0">
                          {item.distance}m
                        </HeaderPill>
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
