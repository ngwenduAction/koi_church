import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const prismaEntry = require.resolve("prisma/build/index.js");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const content = readFileSync(filePath, "utf8");
  const entries = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
}

const envFromFiles = {
  ...loadEnvFile(resolve(process.cwd(), ".env")),
  ...loadEnvFile(resolve(process.cwd(), ".env.local")),
};

const effectiveEnv = {
  ...envFromFiles,
  ...process.env,
};

const rawArgs = process.argv.slice(2);
const targetFlag = rawArgs.find((argument) => argument.startsWith("--target="));
const explicitTarget = targetFlag ? targetFlag.split("=")[1] : null;
const args = rawArgs.filter((argument) => !argument.startsWith("--target="));
const databaseUrl = effectiveEnv.DATABASE_URL ?? "";
const inferredTarget =
  explicitTarget ??
  effectiveEnv.PRISMA_TARGET ??
  (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://") ? "rds" : "local");

const schemaPath =
  inferredTarget === "rds"
    ? resolve(process.cwd(), "prisma-rds", "schema.prisma")
    : resolve(process.cwd(), "prisma", "schema.prisma");

console.log(`[prisma-command] target=${inferredTarget} schema=${schemaPath}`);

const result = spawnSync(process.execPath, [prismaEntry, ...args, "--schema", schemaPath], {
  cwd: process.cwd(),
  env: effectiveEnv,
  stdio: "inherit",
});

if (typeof result.status === "number") {
  process.exit(result.status);
}

if (result.error) {
  console.error(result.error);
}

process.exit(1);

