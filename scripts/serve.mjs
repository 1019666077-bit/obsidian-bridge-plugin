/**
 * Stdio launcher for obsidian-mcp (MIT). Vault path is never bundled;
 * set OBSIDIAN_BRIDGE_VAULT or vault.local.txt in the plugin root.
 * Server package: https://github.com/1019666077-bit/obsidian-mcp (fork of StevenStavrakis/obsidian-mcp).
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const pluginRoot =
  process.env.CURSOR_PLUGIN_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function resolveVaultPath() {
  const fromEnv = process.env.OBSIDIAN_BRIDGE_VAULT?.trim();
  if (fromEnv) return fromEnv;

  const localFile = path.join(pluginRoot, "vault.local.txt");
  if (existsSync(localFile)) {
    return readFileSync(localFile, "utf8").trim();
  }

  const home = process.env.USERPROFILE || process.env.HOME || "";
  const userFile = path.join(home, ".cursor", "obsidian-bridge-vault.txt");
  if (existsSync(userFile)) {
    return readFileSync(userFile, "utf8").trim();
  }

  process.stderr.write(
    [
      "obsidian-bridge: vault path not configured.",
      "Set OBSIDIAN_BRIDGE_VAULT, or create vault.local.txt in the plugin folder,",
      "or ~/.cursor/obsidian-bridge-vault.txt with one absolute path line.",
      "The vault must contain an .obsidian directory.",
      ""
    ].join("\n")
  );
  process.exit(1);
}

const vaultPath = resolveVaultPath();
const vaultArg = `notes=${vaultPath}`;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

const child = spawn(
  npx,
  ["-y", "obsidian-mcp@2", "serve", "--vault", vaultArg, "--log-level", "error"],
  { stdio: "inherit", shell: process.platform === "win32" }
);

child.on("error", (err) => {
  process.stderr.write(`obsidian-bridge: failed to start npx: ${err.message}\n`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
