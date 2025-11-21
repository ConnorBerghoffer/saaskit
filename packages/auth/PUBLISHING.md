# Publishing @saaskit/auth

This guide explains how to publish the auth package as a private npm package.

## Option 1: npm Private Packages (Recommended)

### Prerequisites
- npm account with paid plan (for private packages)
- Or use GitHub Packages (free for private)

### Steps

1. **Login to npm:**
   ```bash
   npm login
   ```

2. **Publish all related packages together:**
   Since `@saaskit/auth` depends on `@saaskit/config` and `@saaskit/db`, publish them in order:

   ```bash
   # From monorepo root
   cd packages/config
   pnpm publish --access restricted
   
   cd ../db
   pnpm publish --access restricted
   
   cd ../auth
   pnpm publish --access restricted
   ```

3. **Or use pnpm's publish feature (handles workspace deps):**
   ```bash
   # From monorepo root
   pnpm -r publish --access restricted
   ```

## Option 2: GitHub Packages (Free)

### Setup

1. **Update package.json publishConfig:**
   ```json
   "publishConfig": {
     "registry": "https://npm.pkg.github.com",
     "@saaskit:registry": "https://npm.pkg.github.com"
   }
   ```

2. **Create .npmrc in package directory:**
   ```
   @saaskit:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. **Set GitHub token:**
   ```bash
   export GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Update package name to include GitHub org:**
   ```json
   "name": "@your-org/saaskit-auth"
   ```

5. **Publish:**
   ```bash
   npm publish
   ```

## Option 3: Private npm Registry

If you have your own npm registry (e.g., Verdaccio, npm Enterprise):

1. **Configure registry:**
   ```bash
   npm config set registry https://your-registry.com
   ```

2. **Login:**
   ```bash
   npm login --registry=https://your-registry.com
   ```

3. **Publish:**
   ```bash
   npm publish
   ```

## Installing in Other Projects

After publishing, install in your apps:

```bash
# npm
npm install @saaskit/auth

# pnpm
pnpm add @saaskit/auth

# yarn
yarn add @saaskit/auth
```

### For GitHub Packages

Add to your project's `.npmrc`:
```
@saaskit:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Version Management

To publish updates:

1. Update version in `package.json`
2. Build: `pnpm build`
3. Publish: `pnpm publish --access restricted`

Or use semantic versioning:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Notes

- The package is marked as `"private": true` which prevents accidental public publishing
- `publishConfig.access: "restricted"` ensures it's published as private
- Only `dist/` and `README.md` are included in the published package (see `.npmignore`)

