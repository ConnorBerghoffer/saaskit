import { useMemo } from "react";
import type { createAuthClient } from "better-auth/react";

type AuthClient = ReturnType<typeof createAuthClient>;

export const useSession = (authClient: AuthClient) => {
  const session = authClient.useSession();

  return useMemo(
    () => ({
      data: session.data,
      isPending: session.isPending,
      error: session.error,
      user: session.data?.user ?? null,
      isAuthenticated: !!session.data?.user,
    }),
    [session]
  );
};

