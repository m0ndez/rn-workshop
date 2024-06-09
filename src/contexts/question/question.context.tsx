import { createContext } from "@/utils/create-context";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { QUESTIONS } from "@/constants";
import { questionReducer } from "./reducer";
import { ContextValues, ReducerState } from "./types";
import { z } from "zod";
import { useLeaderBoardContext } from "../leader-board";

const [Provider, useQuestionContext] = createContext<ContextValues>();

const QuestionProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { handleSetLeaderBoard: setScore } = useLeaderBoardContext();

  const initialState: ReducerState = useMemo(() => {
    return {
      questions: QUESTIONS,
      totalQuestions: QUESTIONS.length,
      totalAnswered: 0,
      totalScore: 0,
    };
  }, []);

  const [{ questions, totalQuestions, totalAnswered, totalScore }, dispatch] =
    useReducer(questionReducer, initialState);

  const handleShuffle: ContextValues["handleShuffle"] = useCallback(() => {
    dispatch({ type: "SHUFFLE" });
  }, []);

  const handleAnswer: ContextValues["handleAnswer"] = useCallback((payload) => {
    dispatch({ type: "ANSWER", payload });
  }, []);

  const handleMultiAnswer: ContextValues["handleMultiAnswer"] = useCallback(
    (payload) => {
      dispatch({ type: "MULTI_ANSWER", payload });
    },
    []
  );

  const handleReset: ContextValues["handleReset"] = useCallback(() => {
    dispatch({ type: "RESET", payload: initialState });
  }, []);

  const singleQuestion: ContextValues["singleQuestion"] = useMemo(() => {
    return questions.find((f) => !f.answered);
  }, [questions]);

  const allQuestions: ContextValues["allQuestions"] = useMemo(() => {
    return questions
      .filter((f) => !f.answered)
      .sort((a, b) => (a.answered === b.answered ? 0 : a.answered ? 1 : -1));
  }, [questions]);

  const isSuccess: ContextValues["isSuccess"] = useMemo(() => {
    if (totalAnswered === totalQuestions) {
      return true;
    }
    return false;
  }, [totalAnswered, totalQuestions]);

  useEffect(() => {
    if (isSuccess) {
      setScore(totalScore);
    }
  }, [isSuccess]);

  const contextValues: ContextValues = {
    handleReset,
    handleAnswer,
    handleMultiAnswer,
    handleShuffle,
    singleQuestion,
    allQuestions,
    totalQuestions,
    totalAnswered,
    totalScore,
    isSuccess,
  };

  // if (isLoading) {
  //   return null;
  // }

  return <Provider value={contextValues}>{children}</Provider>;
};

export { QuestionProvider, useQuestionContext };

const storageSchema = z
  .array(
    z.object({
      name: z.string(),
      score: z.number(),
    })
  )
  .catch([]);

// const useSaveScore = () => {
//   const [storage, setStorage] = useAsyncStorageState("LEADER_BOARD");
//   const [isLoading, storageData] = storage;

//   const { session } = useSession();

//   const saveScore = (score: number) => {
//     if (!session) {
//       return;
//     }

//     const createScore = {
//       name: session,
//       score,
//     };

//     if (!storageData) {
//       setStorage(JSON.stringify([createScore]));
//       return;
//     }

//     const parsedStorageData = storageSchema.parse(JSON.parse(storageData));

//     const newStorageData = parsedStorageData
//       .filter((f) => f.name !== session)
//       .concat(createScore)
//       .sort((a, b) => b.score - a.score);

//     setStorage(JSON.stringify(newStorageData));
//   };

//   return {
//     saveScore,
//     isLoading,
//   };
// };
