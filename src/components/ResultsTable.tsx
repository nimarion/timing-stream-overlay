import { useEffect, useState } from "react";
import { Result } from "@/types";
import CountryFlag from "./CountryFlag";
import WindIcon from "./WindIcon";
import { formatLastname } from "@/utils";
import { parseNationAndClub } from "@/utils/country";
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
  RankBadge,
} from "./ui/Table";

const PAGE_ROTATION_MS = 5000;

function formatWindPill(wind: number): string {
  const rounded = Number(wind.toFixed(1));
  if (rounded === 0) return "+0.0 m/s";
  return `${rounded > 0 ? `+${rounded.toFixed(1)}` : rounded.toFixed(1)} m/s`;
}

export default function ResultsTable({
  results,
  title,
  wind,
  isExiting = false,
}: {
  results: Result[];
  title?: string | null;
  wind?: number | null;
  isExiting?: boolean;
}) {
  const labels = getOverlayLabels();
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
  const showCaption = Boolean(title || wind !== null && wind !== undefined || totalPages > 1);

  return (
    <TableContainer>
      <TableCard isExiting={isExiting} batchKey={`${title ?? "results"}-${activePage}`}>
        {showCaption && (
          <TableCaption
            progressDurationMs={totalPages > 1 ? PAGE_ROTATION_MS : undefined}
            progressKey={activePage}
            rightContent={
              wind !== null && wind !== undefined ? (
                <HeaderPill variant={wind > 2.0 ? "illegal" : "legal"}>
                  <WindIcon className="w-3.5 h-3.5" />
                  <span>{formatWindPill(wind)}</span>
                </HeaderPill>
              ) : undefined
            }
          >
            {title || labels.resultsTitle}
          </TableCaption>
        )}

        <Table>
          <colgroup>
            <col className="w-16 sm:w-20 md:w-24" />
            <col className="w-16 sm:w-20 md:w-24" />
            <col />
            <col className="w-32 sm:w-44 md:w-52" />
          </colgroup>

          <TableBody>
            {visibleResults.map((result, index) => {
              const isPinnedLeader = index === 0 && totalPages > 1;
              const showPinnedDivider = isLeaderPinnedWithGap && index === 1;
              const { club } = parseNationAndClub(result.nation);

              return (
                <TableRow
                  key={
                    isPinnedLeader
                      ? `leader-${result.bib}`
                      : `p${activePage}-${result.bib}-${result.rank}`
                  }
                  index={index}
                  staggerIndex={isLeaderPinnedWithGap ? index - 1 : index}
                  isPinned={isPinnedLeader && activePage > 0}
                  hasDividerTop={showPinnedDivider}
                  isAnimated
                >
                  <TableCell align="center">
                    <RankBadge rank={result.rank} />
                  </TableCell>
                  <TableCell>
                    <CountryFlag nation={result.nation} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-baseline gap-2.5 truncate w-full min-w-0">
                      {result.firstname && (
                        <span className="font-normal opacity-80 shrink-0">
                          {result.firstname}
                        </span>
                      )}
                      <span className="font-bold tracking-wide truncate">
                        {formatLastname(result.lastname)}
                      </span>
                      {club && (
                        <span className="hidden sm:inline text-theme-secondary font-normal text-[0.6em] truncate shrink">
                          {club}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right" isAccentMono>
                    {result.time}
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
