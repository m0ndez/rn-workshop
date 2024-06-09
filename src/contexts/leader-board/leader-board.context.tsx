import { createContext } from "@/utils/create-context";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { useAsyncStorageState } from "@/hooks";
import { ContextValues, LeaderBoardData, ScoreData } from "./types";
import { useSession } from "../session";
import { leaderBoardSchema } from "./schemas";
import { updateLeaderBoard } from "./utils/update-leader-board";

const [Provider, useLeaderBoardContext] = createContext<ContextValues>();

const LeaderBoardProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [storage, setStorage] = useAsyncStorageState("LEADER_BOARD");

  const [isLoading, storageData] = storage;

  const { session } = useSession();

  const handleResetLeaderBoard: ContextValues["handleResetLeaderBoard"] =
    useCallback(() => {
      setStorage(null);
    }, []);

  const leaderBoardData: ContextValues["leaderBoardData"] = useMemo(() => {
    const leaderBoardData = JSON.parse(storageData ?? "[]");
    return leaderBoardSchema.parse(leaderBoardData);
  }, [storageData]);

  const handleSetLeaderBoard: ContextValues["handleSetLeaderBoard"] =
    useCallback(
      (scoreValue) => {
        if (!session) {
          return;
        }
        const score: ScoreData = {
          name: session,
          score: scoreValue,
        };

        const newStorageData = updateLeaderBoard({
          leaderBoardData,
          score,
        });

        setStorage(JSON.stringify(newStorageData));
      },

      [leaderBoardData, session]
    );

  if (isLoading) {
    return null;
  }

  return (
    <Provider
      value={{
        handleResetLeaderBoard,
        handleSetLeaderBoard,
        leaderBoardData,
      }}
    >
      {children}
    </Provider>
  );
};

export { LeaderBoardProvider, useLeaderBoardContext };
