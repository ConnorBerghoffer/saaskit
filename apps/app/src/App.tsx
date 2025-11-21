import { useEffect } from "react";
import { AuthProvider, AuthFlow, useAuthContext, useSession } from "@saaskit/auth";
import { getConfig } from "@saaskit/config";

let config: ReturnType<typeof getConfig>;

try {
  config = getConfig();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(`Configuration error: ${message}`);
}

const AuthContent = () => {
  const { authClient } = useAuthContext();
  const session = useSession(authClient);

  if (session.isAuthenticated) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        <p className="text-slate-300">
          Signed in as {session.user?.email}
        </p>
      </div>
    );
  }

  return (
    <AuthFlow
      authClient={authClient}
      config={{
        apiUrl: config.API_URL,
        termsUrl: "https://example.com/terms",
        privacyUrl: "https://example.com/privacy",
        onSuccess: () => {
          window.location.reload();
        },
      }}
    />
  );
};

export const App = () => {
  return (
    <AuthProvider config={config}>
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 p-4">
        <section className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">saaskit</p>
            <h1 className="text-3xl font-semibold">Authentication</h1>
          </div>
          <div className="bg-slate-900/70 p-6 rounded-xl">
            <AuthContent />
          </div>
        </section>
      </main>
    </AuthProvider>
  );
};
