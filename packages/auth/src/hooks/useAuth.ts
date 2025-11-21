import { useCallback } from "react";
import type { createAuthClient } from "better-auth/react";

type AuthClient = ReturnType<typeof createAuthClient>;

export const useAuth = (authClient: AuthClient) => {
  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to sign out"
      );
    }
  }, [authClient]);

  return {
    signOut,
  };
};

