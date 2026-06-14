import React from "react";
import { cn } from "@/utils";

export function TableContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("w-full h-full flex flex-col text-2xl sm:text-3xl md:text-4xl", className)}>
      {children}
    </div>
  );
}

export function TableCaption({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 font-bold text-left bg-gray-200 rounded-t-md truncate w-full table-caption-header">
      {children}
    </div>
  );
}

export function Table({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <table className={cn("table-fixed w-full", className)}>{children}</table>;
}

export function TableHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <thead className={cn("collapse", className)}>
      <tr className="text-left">{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <th className={cn("p-4", className)}>{children}</th>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="font-bold">{children}</tbody>;
}

export function TableRow({ children, index, isAnimated = false, className = "" }: { children: React.ReactNode, index: number, isAnimated?: boolean, className?: string }) {
  return (
    <tr className={cn("bg-gray-100", isAnimated && index !== 0 && "cssanimation sequence fadeInBottom", className)}>
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
  align = "left",
  className = "",
  innerClassName = ""
}: {
  children: React.ReactNode,
  index: number,
  totalRows: number,
  isFirstCol?: boolean,
  isLastCol?: boolean,
  hasTopRadius?: boolean,
  align?: "left" | "center" | "right",
  className?: string,
  innerClassName?: string
}) {
  const isFirstRow = index === 0;
  const isLastRow = index === totalRows - 1;

  // Consistent inner padding across all tables
  const defaultInnerClass = "px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4";

  return (
    <td 
      className={cn(
        "p-0",
        align === "center" && "text-center",
        align === "right" && "text-right",
        !isFirstRow && "border-t-2 border-gray-300",
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
