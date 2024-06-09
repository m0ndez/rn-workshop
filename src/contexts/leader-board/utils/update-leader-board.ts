import { LeaderBoardData, ScoreData } from "../types";
import orderBy from "lodash/orderBy";
type UpdateLeaderBoardParams = {
  score: ScoreData;
  leaderBoardData: LeaderBoardData;
};

export const updateLeaderBoard = (
  params: UpdateLeaderBoardParams
): LeaderBoardData => {
  const { leaderBoardData, score } = params;
  if (leaderBoardData.length === 0) {
    return [score];
  }
  const oldStorageData: LeaderBoardData = leaderBoardData.filter(
    (f) => f.name !== score.name
  );

  const newStorageData: LeaderBoardData = orderBy(
    [...oldStorageData, score],
    "score",
    "desc"
  );
  return newStorageData;
};
