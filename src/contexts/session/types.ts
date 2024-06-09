export type ContextValues = {
  signIn: (name: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};
