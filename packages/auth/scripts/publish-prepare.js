#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, "..", "package.json");

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

const workspaceDeps = ["@saaskit/config", "@saaskit/db"];

workspaceDeps.forEach((dep) => {
  if (packageJson.dependencies[dep] === "workspace:*") {
    packageJson.dependencies[dep] = "*";
  }
});

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
console.log("✅ Prepared package.json for publishing");

