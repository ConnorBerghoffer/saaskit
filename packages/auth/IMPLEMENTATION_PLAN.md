# Auth Package Implementation Plan

## Overview
Complete, publishable auth package with Better Auth integration, animated UI components, and full authentication flows.

## Package Structure
```
packages/auth/
├── src/
│   ├── server/
│   │   ├── config.ts          # Better Auth server configuration
│   │   ├── handler.ts          # Express/Fastify handler
│   │   └── index.ts            # Server exports
│   ├── client/
│   │   ├── client.ts           # Better Auth client setup
│   │   └── index.ts             # Client exports
│   ├── components/
│   │   ├── AuthFlow.tsx        # Main auth component (email-first flow)
│   │   ├── EmailStep.tsx       # Email input step
│   │   ├── SignUpStep.tsx      # Signup form (name, password, confirm)
│   │   ├── SignInStep.tsx      # Signin form (password)
│   │   ├── ForgotPasswordStep.tsx # Forgot password flow
│   │   ├── GoogleButton.tsx    # Google OAuth button
│   │   └── index.ts            # Component exports
│   ├── hooks/
│   │   ├── useAuth.ts          # Main auth hook
│   │   ├── useSession.ts       # Session management hook
│   │   └── index.ts            # Hook exports
│   ├── providers/
│   │   ├── AuthProvider.tsx    # React context provider
│   │   └── index.ts            # Provider exports
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── index.ts                # Main package export
├── package.json
└── tsconfig.json
```

## Features to Implement

### 1. Server Configuration (Better Auth)
- Email/password authentication
- Google OAuth provider
- Password reset flow with email
- Session management (rememberMe support)
- Database adapter (Drizzle)
- Email sending hooks

### 2. Client Configuration
- Better Auth client initialization
- API endpoint configuration
- Type-safe client methods

### 3. UI Components
- **AuthFlow**: Main container with step management
- **EmailStep**: Email input, check if user exists
- **SignUpStep**: Name, password, confirm password, terms/privacy
- **SignInStep**: Password input, remember me checkbox
- **ForgotPasswordStep**: Email input, reset flow
- **GoogleButton**: OAuth sign-in button

### 4. Animations (Framer Motion)
- AnimatePresence for step transitions
- Slide animations between steps
- Form field animations
- Loading states

### 5. React Integration
- AuthProvider with context
- useAuth hook for auth state
- useSession hook for session management
- Error handling and loading states

## Dependencies
- better-auth (server + client)
- react
- framer-motion
- @saaskit/db (for database)
- @saaskit/config (for configuration)
- shadcn/ui components (button, input, checkbox, etc.)

## Implementation Steps
1. Update package.json with dependencies
2. Create server configuration
3. Create client configuration
4. Build type definitions
5. Create UI components with animations
6. Build React hooks
7. Create AuthProvider
8. Wire into Vite app
9. Test all flows

