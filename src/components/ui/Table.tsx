import React from "react";
import { cn } from "@/utils";

export function TableContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full h-full flex flex-col font-display text-2xl sm:text-3xl md:text-4xl", className)}>
      {children}
    </div>
  );
}

export function TableCaption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "px-4 py-3 font-bold text-left bg-theme-panel text-theme-accent text-[1.05em] tracking-[0.5px] shadow-theme-panel backdrop-blur-md rounded-t-md truncate w-full flex items-center justify-between gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Table({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <table className={cn("table-fixed w-full", className)}>{children}</table>;
}

export function TableHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <thead className={cn("collapse bg-theme-panel", className)}>
      <tr className="text-left">{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "px-4 py-3.5 text-theme-secondary font-medium uppercase tracking-[1px] text-[0.65em]",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="font-bold">{children}</tbody>;
}

export function TableRow({
  children,
  index,
  isAnimated = false,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  isAnimated?: boolean;
  className?: string;
}) {
  return (
    <tr
      className={cn(
        "bg-theme-row text-theme-primary",
        isAnimated && index !== 0 && "cssanimation sequence fadeInBottom",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  index,
  totalRows,
  isFirstCol = false,
  isLastCol = false,
  hasTopRadius = false,
  isAccentMono = false,
  align = "left",
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  index: number;
  totalRows: number;
  isFirstCol?: boolean;
  isLastCol?: boolean;
  hasTopRadius?: boolean;
  isAccentMono?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  innerClassName?: string;
}) {
  const isFirstRow = index === 0;
  const isLastRow = index === totalRows - 1;

  const defaultInnerClass = "px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4";

  return (
    <td
      className={cn(
        "p-0",
        align === "center" && "text-center",
        align === "right" && "text-right",
        isAccentMono && "text-theme-accent font-mono font-bold tracking-[0.5px] tabular-nums",
        !isFirstRow && "border-t-2 border-theme-border",
        isFirstRow && hasTopRadius && isFirstCol && "rounded-tl-md",
        isFirstRow && hasTopRadius && isLastCol && "rounded-tr-md",
        isLastRow && isFirstCol && "rounded-bl-md",
        isLastRow && isLastCol && "rounded-br-md",
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
