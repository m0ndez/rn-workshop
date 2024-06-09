import { createContext } from "@/utils/create-context";
import { ContextValues } from "./types";
import { FC, PropsWithChildren } from "react";
import { useSecureStorageState } from "@/hooks";

const [Provider, useSession] = createContext<ContextValues>();

const SessionProvider: FC<PropsWithChildren> = (props) => {
  const [[isLoading, session], setSession] = useSecureStorageState("USERNAME");

  return (
    <Provider
      value={{
        signIn: (name) => {
          setSession(name);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { SessionProvider, useSession };
