import { Result } from "@/types";
import CountryFlag from "./CountryFlag";
import { cn, formatLastname } from "@/utils";
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

const MAX_REACTION_SCALE = 0.25;
const LEGAL_REACTION_LIMIT = 0.1;

function getReactionBarColor(reactionTime: number): string {
  if (reactionTime < LEGAL_REACTION_LIMIT) {
    return "#ef4444";
  }
  if (reactionTime <= 0.145) {
    return "linear-gradient(90deg, #10b981, #14b8a6)";
  }
  if (reactionTime <= 0.19) {
    return "linear-gradient(90deg, #14b8a6, #f59e0b)";
  }
  return "linear-gradient(90deg, #f59e0b, #f97316)";
}

export default function ReactionsTable({
  results,
  title,
  isExiting = false,
}: {
  results: Result[];
  title?: string | null;
  isExiting?: boolean;
}) {
  const labels = getOverlayLabels();
  const filteredResults = results
    .filter(
      (r): r is Result & { reactionTime: number } =>
        r.reactionTime !== null && !Number.isNaN(r.reactionTime)
    )
    .slice(0, 8);

  const legalReactions = filteredResults
    .map((r) => r.reactionTime)
    .filter((rt) => rt >= LEGAL_REACTION_LIMIT);
  const fastestLegalReaction =
    legalReactions.length > 0 ? Math.min(...legalReactions) : null;

  return (
    <TableContainer>
      <TableCard isExiting={isExiting} batchKey={title ?? "reactions"}>
        <TableCaption
          rightContent={
            title ? (
              <HeaderPill variant="neutral">{labels.reactionTimesTitle}</HeaderPill>
            ) : undefined
          }
        >
          {title || labels.reactionTimesTitle}
        </TableCaption>

        <Table>
          <colgroup>
            <col className="w-16 sm:w-20 md:w-24" />
            <col className="w-16 sm:w-20 md:w-24" />
            <col />
            <col className="w-56 sm:w-64 md:w-72" />
          </colgroup>

          <TableBody>
            {filteredResults.map((result, index) => {
              const isFalseStart = result.reactionTime < LEGAL_REACTION_LIMIT;
              const isFastest =
                !isFalseStart &&
                fastestLegalReaction !== null &&
                Math.abs(result.reactionTime - fastestLegalReaction) < 0.0005;
              const barPercent = Math.max(
                0,
                Math.min((result.reactionTime / MAX_REACTION_SCALE) * 100, 100)
              );
              const thresholdPercent = (LEGAL_REACTION_LIMIT / MAX_REACTION_SCALE) * 100;

              return (
                <TableRow
                  key={`${result.bib}-${result.rank}`}
                  index={index}
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
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div
                      className={cn(
                        "flex flex-row items-center gap-2.5 bg-theme-panel/90 px-2 py-1.5 rounded-md w-min ml-auto border border-theme-border",
                        isFalseStart && "ring-2 ring-red-500 border-red-500/60",
                        isFastest && "border-emerald-400/60"
                      )}
                    >
                      <div className="relative h-5 w-36 sm:w-40 bg-black/50 rounded overflow-hidden">
                        {/* Subtle Red Danger Zone (0.000s - 0.100s) */}
                        <div
                          className="absolute inset-y-0 left-0 bg-red-500/20 pointer-events-none"
                          style={{ width: `${thresholdPercent}%` }}
                        />

                        {/* Reaction Fill Bar */}
                        <div
                          className="relative h-full transition-all duration-500 ease-out rounded-r-sm"
                          style={{
                            width: `${barPercent}%`,
                            background: getReactionBarColor(result.reactionTime),
                          }}
                        />

                        {/* 100ms Legal Threshold Marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                          style={{ left: `${thresholdPercent}%` }}
                        />
                      </div>

                      <span
                        className={cn(
                          "font-mono text-sm sm:text-base font-bold tabular-nums min-w-[4.2ch] text-right",
                          isFalseStart
                            ? "text-red-400"
                            : isFastest
                              ? "text-emerald-400"
                              : "text-theme-primary"
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
      </TableCard>
    </TableContainer>
  );
}
