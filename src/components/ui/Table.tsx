import React, { createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/utils";

interface TableMotionContextValue {
  getRowDelayMs: (staggerIndex: number) => number;
}

const TableMotionContext = createContext<TableMotionContextValue>({
  getRowDelayMs: (staggerIndex) => staggerIndex * 45,
});

export function TableContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto h-full flex flex-col justify-end font-display text-2xl sm:text-3xl md:text-4xl antialiased",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TableCard({
  children,
  isExiting = false,
  batchKey = "default",
  className = "",
}: {
  children: React.ReactNode;
  isExiting?: boolean;
  batchKey?: string | number;
  className?: string;
}) {
  const batchStartRef = useRef<number>(performance.now());
  const prevBatchKeyRef = useRef<string | number>(batchKey);

  if (prevBatchKeyRef.current !== batchKey) {
    prevBatchKeyRef.current = batchKey;
    batchStartRef.current = performance.now();
  }

  useEffect(() => {
    batchStartRef.current = performance.now();
  }, [batchKey]);

  const motionValue: TableMotionContextValue = {
    getRowDelayMs: (staggerIndex: number) => {
      const elapsed = performance.now() - batchStartRef.current;
      // Cascade rows during initial mount or page transition; animate immediately on live incremental arrivals
      if (elapsed <= 180) {
        return Math.max(0, staggerIndex) * 45;
      }
      return 0;
    },
  };

  return (
    <TableMotionContext.Provider value={motionValue}>
      <div
        className={cn(
          "w-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur-md",
          isExiting ? "broadcast-card-out" : "broadcast-card-in",
          className
        )}
      >
        {children}
      </div>
    </TableMotionContext.Provider>
  );
}

export function TableCaption({
  children,
  rightContent,
  progressDurationMs,
  progressKey,
  className = "",
}: {
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  progressDurationMs?: number;
  progressKey?: string | number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative px-4 py-2.5 sm:px-6 sm:py-3.5 bg-theme-panel border-b border-theme-border border-l-[6px] border-l-theme-accent text-theme-primary font-bold tracking-[0.4px] w-full flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="truncate min-w-0 text-[0.95em] leading-tight">{children}</div>
      {rightContent && (
        <div className="flex items-center gap-2.5 shrink-0">{rightContent}</div>
      )}
      {progressDurationMs && progressDurationMs > 0 ? (
        <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10 overflow-hidden">
          <div
            key={progressKey}
            className="h-full w-full bg-theme-accent broadcast-page-progress"
            style={{ animationDuration: `${progressDurationMs}ms` }}
          />
        </div>
      ) : null}
    </div>
  );
}

export function HeaderPill({
  children,
  variant = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "legal" | "illegal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[0.52em] font-bold tracking-wider uppercase tabular-nums leading-none",
        variant === "neutral" && "bg-white/10 text-theme-secondary border border-theme-border",
        variant === "accent" && "bg-theme-accent text-white shadow-theme-glow",
        variant === "legal" && "bg-emerald-500/90 text-white",
        variant === "illegal" && "bg-red-600 text-white shadow-theme-glow",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Table({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table className={cn("table-fixed w-full border-collapse", className)}>
      {children}
    </table>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  index,
  staggerIndex,
  isAnimated = true,
  isPinned = false,
  hasDividerTop = false,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  staggerIndex?: number;
  isAnimated?: boolean;
  isPinned?: boolean;
  hasDividerTop?: boolean;
  className?: string;
}) {
  const { getRowDelayMs } = useContext(TableMotionContext);
  const delayMs = isPinned
    ? 0
    : getRowDelayMs(staggerIndex !== undefined ? staggerIndex : index);

  return (
    <tr
      style={
        isAnimated && !isPinned
          ? ({ "--row-delay": `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
      className={cn(
        "bg-theme-row text-theme-primary transition-colors duration-200",
        index > 0 && !hasDividerTop && "border-t border-theme-border",
        hasDividerTop && "border-t-[3px] border-theme-accent/75",
        isAnimated && !isPinned && "broadcast-row-in",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  isAccentMono = false,
  align = "left",
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  isAccentMono?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  innerClassName?: string;
}) {
  const defaultInnerClass = "px-2 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3.5";

  return (
    <td
      className={cn(
        "p-0",
        align === "center" && "text-center",
        align === "right" && "text-right",
        isAccentMono &&
          "text-theme-accent font-mono font-bold tracking-[0.5px] tabular-nums",
        className
      )}
    >
      <div
        className={cn(
          defaultInnerClass,
          "overflow-hidden flex items-center h-full min-w-0 w-full",
          align === "center" && "justify-center",
          align === "right" && "justify-end",
          innerClassName
        )}
      >
        {children}
      </div>
    </td>
  );
}

export function RankBadge({ rank }: { rank: string }) {
  const trimmed = rank.trim();
  const medalStyle =
    trimmed === "1"
      ? "bg-amber-400 text-neutral-950 shadow-[0_0_12px_rgba(251,191,36,0.45)] border-amber-300"
      : trimmed === "2"
        ? "bg-slate-300 text-neutral-950 border-slate-200"
        : trimmed === "3"
          ? "bg-amber-700 text-amber-50 border-amber-600"
          : "bg-theme-panel/70 text-theme-primary border-theme-border";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[1.85em] h-[1.55em] px-2 rounded-md border font-mono font-bold text-[0.75em] leading-none tabular-nums",
        medalStyle
      )}
    >
      {trimmed}
    </span>
  );
}

export function LaneBadge({ lane }: { lane: string }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[1.85em] h-[1.55em] px-2 rounded-md bg-theme-panel/70 text-theme-primary border border-theme-border font-mono font-bold text-[0.75em] leading-none tabular-nums">
      {lane}
    </span>
  );
}
