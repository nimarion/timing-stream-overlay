export type Locale = "de" | "en";

const LABELS = {
  de: {
    rank: "Rang",
    lane: "Bahn",
    nation: "Nation",
    name: "Name",
    result: "Ergebnis",
    reactionTime: "Reaktionszeit",
    reactionTimesTitle: "Reaktionszeiten",
    resultsTitle: "Ergebnisse",
    upcomingTitle: "Kommende Läufe",
    time: "Zeit",
    wind: "Wind",
  },
  en: {
    rank: "Rank",
    lane: "Lane",
    nation: "Nation",
    name: "Athlete",
    result: "Result",
    reactionTime: "Reaction Time",
    reactionTimesTitle: "Reaction Times",
    resultsTitle: "Results",
    upcomingTitle: "Upcoming Events",
    time: "Time",
    wind: "Wind",
  },
} as const;

export function getOverlayLabels() {
  if (typeof window !== "undefined") {
    const lang = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
    if (lang === "en") {
      return LABELS.en;
    }
  }
  return LABELS.de;
}
