# Installation Guide

All packages have been published to GitHub Packages under `@connorberghoffer` scope.

## Published Packages

- `@connorberghoffer/saaskit-config@1.0.0`
- `@connorberghoffer/saaskit-db@1.0.0`
- `@connorberghoffer/saaskit-auth@1.0.0`

## Installing in Your Apps

### 1. Configure npm to use GitHub Packages

Create or update `.npmrc` in your project root:

```
@connorberghoffer:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or set the token as an environment variable:
```bash
export GITHUB_TOKEN=your_token_here
```

### 2. Install the packages

```bash
npm install @connorberghoffer/saaskit-config @connorberghoffer/saaskit-db @connorberghoffer/saaskit-auth
# or
pnpm add @connorberghoffer/saaskit-config @connorberghoffer/saaskit-db @connorberghoffer/saaskit-auth
# or
yarn add @connorberghoffer/saaskit-config @connorberghoffer/saaskit-db @connorberghoffer/saaskit-auth
```

### 3. Update your imports

Change from workspace imports:
```typescript
// Old (workspace)
import { getConfig } from "@saaskit/config";
import { createDatabase } from "@saaskit/db";
import { AuthProvider } from "@saaskit/auth";
```

To published package imports:
```typescript
// New (published)
import { getConfig } from "@connorberghoffer/saaskit-config";
import { createDatabase } from "@connorberghoffer/saaskit-db";
import { AuthProvider } from "@connorberghoffer/saaskit-auth";
```

## Viewing Packages

You can view your published packages at:
- https://github.com/ConnorBerghoffer?tab=packages

Or via npm:
```bash
npm view @connorberghoffer/saaskit-auth
```

## Updating Packages

To publish updates:

1. Update version in `package.json`:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. Build and publish:
   ```bash
   pnpm build
   pnpm publish --no-git-checks
   ```

## Package Locations

- Config: https://github.com/ConnorBerghoffer/saaskit-config/packages
- DB: https://github.com/ConnorBerghoffer/saaskit-db/packages
- Auth: https://github.com/ConnorBerghoffer/saaskit-auth/packages

