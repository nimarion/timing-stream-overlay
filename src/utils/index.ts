import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatLastname(lastname: string): string {
  if (lastname.length <= 15) {
    return lastname.toUpperCase();
  }
  const splitted = lastname.split(" ");
  if (splitted.length > 2) {
    return splitted[splitted.length - 1].toUpperCase();
  }
  if (splitted.length === 2) {
    return `${splitted[0].charAt(0).toUpperCase()}. ${splitted[1].toUpperCase()}`;
  }
  return splitted[0].toUpperCase();
}

export function isDemo() {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("demo") === "true") {
      return true;
    }
  }
  return process.env.NODE_ENV !== "production";
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}