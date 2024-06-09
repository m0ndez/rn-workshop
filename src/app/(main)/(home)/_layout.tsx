import { useQuestionContext } from "@/contexts";
import { useAppState } from "@/hooks";
import { MainLayout } from "@/layouts";

export default function Layout() {
  const { handleShuffle } = useQuestionContext();

  useAppState({ handleForegroundState: handleShuffle });

  return (
    <MainLayout
      screenListeners={{
        focus: (event) => {
          if (!event.target?.includes("index")) {
            handleShuffle();
          }
        },
      }}
    />
  );
}
