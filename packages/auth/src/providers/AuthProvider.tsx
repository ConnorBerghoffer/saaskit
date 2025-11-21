import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { createAuthClient } from "better-auth/react";
import { createAuthClientInstance } from "../client/client";
import type { AppConfig } from "@saaskit/config";

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthContextValue {
  authClient: AuthClient;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  config: AppConfig;
}

export const AuthProvider = ({ children, config }: AuthProviderProps) => {
  const authClient = useMemo(
    () => createAuthClientInstance(config),
    [config]
  );

  const value = useMemo(
    () => ({
      authClient,
    }),
    [authClient]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

