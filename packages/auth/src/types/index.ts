export type AuthStep = "email" | "signup" | "signin" | "forgot-password" | "reset-password";

export interface AuthFlowState {
  step: AuthStep;
  email: string;
  isLoading: boolean;
  error: string | null;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthConfig {
  apiUrl: string;
  termsUrl?: string;
  privacyUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

