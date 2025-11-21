# Quick Publish Guide

## Quick Start (npm Private)

```bash
# 1. Login to npm
npm login

# 2. Build the package
cd packages/auth
pnpm build

# 3. Publish (from monorepo root, publishes all @saaskit packages)
cd ../..
pnpm -r publish --access restricted --filter "@saaskit/*"
```

## Important Notes

⚠️ **Dependencies**: `@saaskit/auth` depends on `@saaskit/config` and `@saaskit/db`. You must publish those first, or publish all together:

```bash
# Publish all @saaskit packages in correct order
pnpm -r publish --access restricted --filter "@saaskit/config"
pnpm -r publish --access restricted --filter "@saaskit/db"  
pnpm -r publish --access restricted --filter "@saaskit/auth"
```

## After Publishing

Install in your apps:

```bash
npm install @saaskit/auth @saaskit/config @saaskit/db
```

## Updating Versions

```bash
cd packages/auth
npm version patch  # or minor, major
pnpm build
pnpm publish --access restricted
```

