# @saaskit/auth

Complete authentication package with Better Auth integration, animated UI components, and full authentication flows.

## Features

- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ Animated UI components with Framer Motion
- ✅ Email-first flow (checks if user exists)
- ✅ Sign up with name, password, confirm password
- ✅ Sign in with password and "remember me"
- ✅ Forgot password flow
- ✅ Terms & Privacy links
- ✅ TypeScript support
- ✅ React hooks and context provider

## Installation

```bash
npm install @saaskit/auth
# or
pnpm add @saaskit/auth
# or
yarn add @saaskit/auth
```

## Peer Dependencies

This package requires:
- `react` ^19.0.0
- `react-dom` ^19.0.0

## Usage

### Server Setup

```typescript
import { createAuthServer } from "@saaskit/auth/server";
import { createDatabase } from "@saaskit/db";
import { getConfig } from "@saaskit/config";

const config = getConfig();
const db = createDatabase(config.DATABASE_URL);

export const auth = createAuthServer({
  db,
  config,
  sendEmail: async ({ to, subject, html, text }) => {
    // Your email sending logic
  },
});
```

### Client Setup

```tsx
import { AuthProvider, AuthFlow } from "@saaskit/auth";
import { useAuthContext, useSession } from "@saaskit/auth/hooks";
import { getConfig } from "@saaskit/config";

function App() {
  const config = getConfig();
  
  return (
    <AuthProvider config={config}>
      <AuthFlow
        authClient={useAuthContext().authClient}
        config={{
          apiUrl: config.API_URL,
          termsUrl: "https://example.com/terms",
          privacyUrl: "https://example.com/privacy",
        }}
      />
    </AuthProvider>
  );
}
```

## Exports

- `@saaskit/auth` - Main exports (components, hooks, providers)
- `@saaskit/auth/server` - Server-side configuration
- `@saaskit/auth/client` - Client configuration
- `@saaskit/auth/components` - UI components
- `@saaskit/auth/hooks` - React hooks
- `@saaskit/auth/providers` - React providers

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `API_URL` - Your API base URL

## License

UNLICENSED - Private package
