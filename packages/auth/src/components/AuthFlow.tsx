import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { createAuthClient } from "better-auth/react";
import type {
  AuthStep,
  AuthFlowState,
  SignUpData,
  SignInData,
  ForgotPasswordData,
  AuthConfig,
} from "../types";
import { EmailStep } from "./EmailStep";
import { SignUpStep } from "./SignUpStep";
import { SignInStep } from "./SignInStep";
import { ForgotPasswordStep } from "./ForgotPasswordStep";
import { GoogleButton } from "./GoogleButton";

type AuthClient = ReturnType<typeof createAuthClient>;

interface AuthFlowProps {
  authClient: AuthClient;
  config?: AuthConfig;
}

export const AuthFlow = ({ authClient, config }: AuthFlowProps) => {
  const [state, setState] = useState<AuthFlowState>({
    step: "email",
    email: "",
    isLoading: false,
    error: null,
  });
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const checkUserExists = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        const response = await fetch(
          `${config?.apiUrl || ""}/api/auth/check-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          return data.exists ?? false;
        }
        return false;
      } catch {
        return false;
      }
    },
    [config?.apiUrl]
  );

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const exists = await checkUserExists(email);
        setUserExists(exists);
        setState((prev) => ({
          ...prev,
          email,
          step: exists ? "signin" : "signup",
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        }));
      }
    },
    [checkUserExists]
  );

  const handleSignUp = useCallback(
    async (data: SignUpData) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (result.error) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error.message || "Failed to create account",
          }));
          return;
        }

        if (config?.onSuccess) {
          config.onSuccess();
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        }));
        if (config?.onError) {
          config.onError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        }
      }
    },
    [authClient, config]
  );

  const handleSignIn = useCallback(
    async (data: SignInData) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        if (result.error) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error.message || "Invalid email or password",
          }));
          return;
        }

        if (config?.onSuccess) {
          config.onSuccess();
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        }));
        if (config?.onError) {
          config.onError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        }
      }
    },
    [authClient, config]
  );

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordData) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authClient.requestPasswordReset({
          email: data.email,
          redirectTo: `${config?.apiUrl || ""}/reset-password`,
        });

        if (result.error) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error.message || "Failed to send reset email",
          }));
          return;
        }

        setForgotPasswordSuccess(true);
        setState((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        }));
      }
    },
    [authClient, config]
  );

  const handleGoogleSignIn = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Google sign-in failed",
      }));
    }
  }, [authClient]);

  const handleBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "email",
      error: null,
    }));
    setForgotPasswordSuccess(false);
  }, []);

  const handleForgotPasswordClick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "forgot-password",
      error: null,
    }));
    setForgotPasswordSuccess(false);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {state.step === "email" && (
          <EmailStep
            key="email"
            email={state.email}
            onEmailChange={(email) =>
              setState((prev) => ({ ...prev, email }))
            }
            onSubmit={handleEmailSubmit}
            isLoading={state.isLoading}
            error={state.error}
          />
        )}

        {state.step === "signup" && (
          <SignUpStep
            key="signup"
            email={state.email}
            onSubmit={handleSignUp}
            onBack={handleBack}
            isLoading={state.isLoading}
            error={state.error}
            termsUrl={config?.termsUrl}
            privacyUrl={config?.privacyUrl}
          />
        )}

        {state.step === "signin" && (
          <SignInStep
            key="signin"
            email={state.email}
            onSubmit={handleSignIn}
            onBack={handleBack}
            onForgotPassword={handleForgotPasswordClick}
            isLoading={state.isLoading}
            error={state.error}
          />
        )}

        {state.step === "forgot-password" && (
          <ForgotPasswordStep
            key="forgot-password"
            email={state.email}
            onSubmit={handleForgotPassword}
            onBack={handleBack}
            isLoading={state.isLoading}
            error={state.error}
            success={forgotPasswordSuccess}
          />
        )}
      </AnimatePresence>

      {state.step === "email" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-4">
            <GoogleButton onClick={handleGoogleSignIn} disabled={state.isLoading} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

