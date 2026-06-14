import React from "react";

export function TableContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full h-full flex flex-col text-2xl sm:text-3xl md:text-4xl ${className}`}>
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
  return <table className={`table-fixed w-full ${className}`}>{children}</table>;
}

export function TableHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <thead className={`collapse ${className}`}>
      <tr className="text-left">{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <th className={`p-4 ${className}`}>{children}</th>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="font-bold">{children}</tbody>;
}

export function TableRow({ children, index, isAnimated = false, className = "" }: { children: React.ReactNode, index: number, isAnimated?: boolean, className?: string }) {
  return (
    <tr className={`bg-gray-100 ${isAnimated && index !== 0 ? "cssanimation sequence fadeInBottom" : ""} ${className}`}>
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
  let alignClass = "";
  let justifyClass = "";
  if (align === "center") {
    alignClass = "text-center";
    justifyClass = "justify-center";
  }
  if (align === "right") {
    alignClass = "text-right";
    justifyClass = "justify-end";
  }
  
  const isFirstRow = index === 0;
  const isLastRow = index === totalRows - 1;

  let borderClass = "";
  if (!isFirstRow) borderClass = "border-t-2 border-gray-300";

  let radiusClass = "";
  if (isFirstRow && hasTopRadius) {
    if (isFirstCol) radiusClass += " rounded-tl-md";
    if (isLastCol) radiusClass += " rounded-tr-md";
  }
  if (isLastRow) {
    if (isFirstCol) radiusClass += " rounded-bl-md";
    if (isLastCol) radiusClass += " rounded-br-md";
  }

  // Consistent inner padding across all tables
  const defaultInnerClass = "px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4";

  return (
    <td className={`p-0 ${alignClass} ${borderClass} ${radiusClass} ${className}`.trim()}>
      <div className={`${defaultInnerClass} overflow-hidden flex items-center h-full min-w-0 w-full ${justifyClass} ${innerClassName}`.trim()}>
        {children}
      </div>
    </td>
  );
}
