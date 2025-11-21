import { useState } from "react";
import { motion } from "framer-motion";
import type { SignUpData } from "../types";

interface SignUpStepProps {
  email: string;
  onSubmit: (data: SignUpData) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  termsUrl?: string;
  privacyUrl?: string;
}

export const SignUpStep = ({
  email,
  onSubmit,
  onBack,
  isLoading,
  error,
  termsUrl,
  privacyUrl,
}: SignUpStepProps) => {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email,
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.name.trim()) {
      setLocalError("Name is required");
      return;
    }

    if (formData.password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      setLocalError("You must accept the terms and conditions");
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
          <label htmlFor="name" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="John Doe"
            autoComplete="name"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-50 opacity-60"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium"
          >
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            id="accept-terms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) =>
              setFormData({ ...formData, acceptTerms: e.target.checked })
            }
            disabled={isLoading}
            className="mt-1"
          />
          <label htmlFor="accept-terms" className="text-sm">
            I agree to the{" "}
            {termsUrl && (
              <a
                href={termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Terms and Conditions
              </a>
            )}
            {termsUrl && privacyUrl && " and "}
            {privacyUrl && (
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </a>
            )}
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
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </motion.form>
  );
};

