import { z } from "zod";

export const scoreSchema = z.object({
  name: z.string(),
  score: z.number(),
});

export const leaderBoardSchema = z.array(scoreSchema).catch([]);
