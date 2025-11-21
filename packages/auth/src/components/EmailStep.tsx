import { useState } from "react";
import { motion } from "framer-motion";

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const EmailStep = ({
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  error,
}: EmailStepProps) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !email.includes("@")) {
      setLocalError("Please enter a valid email address");
      return;
    }

    await onSubmit(email);
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
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
      <button
        type="submit"
        disabled={isLoading || !email}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Checking..." : "Continue"}
      </button>
    </motion.form>
  );
};

