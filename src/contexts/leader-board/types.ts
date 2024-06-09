import { z } from "zod";
import { scoreSchema, leaderBoardSchema } from "./schemas";

export type ScoreData = z.infer<typeof scoreSchema>;

export type LeaderBoardData = z.infer<typeof leaderBoardSchema>;

export type ContextValues = {
  handleSetLeaderBoard: (score: number) => void;
  handleResetLeaderBoard: () => void;
  leaderBoardData: LeaderBoardData;
};
