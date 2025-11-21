import { useState } from "react";
import { motion } from "framer-motion";
import type { ForgotPasswordData } from "../types";

interface ForgotPasswordStepProps {
  email: string;
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const ForgotPasswordStep = ({
  email,
  onSubmit,
  onBack,
  isLoading,
  error,
  success,
}: ForgotPasswordStepProps) => {
  const [formData, setFormData] = useState<ForgotPasswordData>({ email });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.email || !formData.email.includes("@")) {
      setLocalError("Please enter a valid email address");
      return;
    }

    await onSubmit(formData);
  };

  const displayError = error || localError;

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4 text-center"
      >
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Password reset link has been sent to {formData.email}. Please check
            your email.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to sign in
        </button>
      </motion.div>
    );
  }

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
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <div className="space-y-2">
          <label htmlFor="reset-email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="reset-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="you@example.com"
            autoComplete="email"
            autoFocus
          />
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
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.email}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Sending..." : "Send reset link"}
      </button>
    </motion.form>
  );
};

