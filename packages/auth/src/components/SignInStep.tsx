import { useState } from "react";
import { motion } from "framer-motion";
import type { SignInData } from "../types";

interface SignInStepProps {
  email: string;
  onSubmit: (data: SignInData) => Promise<void>;
  onBack: () => void;
  onForgotPassword: () => void;
  isLoading: boolean;
  error: string | null;
}

export const SignInStep = ({
  email,
  onSubmit,
  onBack,
  onForgotPassword,
  isLoading,
  error,
}: SignInStepProps) => {
  const [formData, setFormData] = useState<SignInData>({
    email,
    password: "",
    rememberMe: true,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }

    await onSubmit(formData);
  };

  const displayError = error || localError;

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:text-blue-700 mb-2"
      >
        ← Back
      </button>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="signin-email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="signin-email"
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-50 opacity-60"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Enter your password"
            autoComplete="current-password"
            autoFocus
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="remember-me"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData({ ...formData, rememberMe: e.target.checked })
            }
            disabled={isLoading}
            className=""
          />
          <label htmlFor="remember-me" className="text-sm">
            Keep me signed in
          </label>
        </div>

        {displayError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {displayError}
          </motion.p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.password}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </motion.form>
  );
};

