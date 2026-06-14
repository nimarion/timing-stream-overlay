import { z } from "zod";

export const ResultSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  rank: z.string(),
  bib: z.string(),
  nation: z.string(),
  result: z.string(),
  time: z.string(),
  reactionTime: z.number().nullable(),
});

export const CompetitorSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  bib: z.string(),
  nation: z.string(),
  lane: z.string(),
});

export const AthleteProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  nation: z.string(),
  subtitle: z.string().optional(),
});

export const StartlistSchema = z.object({
  title: z.string(),
  distance: z.number(),
  members: z.array(CompetitorSchema),
  startTime: z.string(),
  date: z.string(),
});

export const WebSocketMessageSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("results"), results: z.array(ResultSchema) }),
  z.object({ type: z.literal("raceStarted") }),
  z.object({ type: z.literal("startlists"), startlists: z.array(StartlistSchema) }),
  z.object({ type: z.literal("lowerThird"), athlete: AthleteProfileSchema.nullable() }),
  StartlistSchema.extend({ type: z.literal("startlist") }),
]);

// We infer the types directly from the Zod schemas so there is a single source of truth
export type Result = z.infer<typeof ResultSchema>;
export type Competitor = z.infer<typeof CompetitorSchema>;
export type AthleteProfile = z.infer<typeof AthleteProfileSchema>;
export type Startlist = z.infer<typeof StartlistSchema>;
export type WebSocketMessage = z.infer<typeof WebSocketMessageSchema>;
