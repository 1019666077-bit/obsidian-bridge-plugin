/**
 * Local acceptance: create/append obsidian-bridge-local.md in the configured vault.
 * Usage (from scripts/smoke): node accept-local.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

const pluginRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const NOTE = "obsidian-bridge-local.md";

function vaultPath() {
  const local = path.join(pluginRoot, "vault.local.txt");
  if (existsSync(local)) return readFileSync(local, "utf8").trim();
  const env = process.env.OBSIDIAN_BRIDGE_VAULT?.trim();
  if (env) return env;
  throw new Error("Set vault.local.txt or OBSIDIAN_BRIDGE_VAULT");
}

function textOf(result) {
  const content = result.content;
  if (!Array.isArray(content)) return "";
  return content.find((c) => c.type === "text")?.text ?? "";
}

async function callOk(client, name, args) {
  const result = await client.callTool({ name, arguments: args });
  if (result.isError) throw new Error(`${name}: ${textOf(result)}`);
  const structured = result.structuredContent;
  if (structured?.ok === true) return structured.data;
  return structured;
}

const root = vaultPath();
const stamp = new Date().toISOString();
const line = `\n- ${stamp} Obsidian Bridge local acceptance OK\n`;

const client = new Client(
  { name: "obsidian-bridge-smoke", version: "0.1.0" },
  { versionNegotiation: { mode: { pin: "2026-07-28" } } }
);

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "obsidian-mcp@2", "serve", "--vault", `notes=${root}`, "--log-level", "error"],
  stderr: "pipe"
});

await client.connect(transport);
try {
  const vaults = await callOk(client, "obsidian_list_vaults", {});
  console.log("vaults:", vaults);

  let exists = true;
  try {
    await callOk(client, "obsidian_read_note", { vault: "notes", path: NOTE });
  } catch {
    exists = false;
  }

  if (!exists) {
    await callOk(client, "obsidian_create_note", {
      vault: "notes",
      path: NOTE.replace(/\.md$/u, ""),
      content: "# Obsidian Bridge local\n"
    });
  }

  await callOk(client, "obsidian_edit_note", {
    vault: "notes",
    path: NOTE,
    operation: "append",
    content: line
  });

  const search = await callOk(client, "obsidian_search_vault", {
    vault: "notes",
    query: "Obsidian Bridge local acceptance",
    mode: "content"
  });
  console.log("search hits:", search.count ?? search);

  const abs = path.join(root, NOTE);
  console.log("Wrote:", abs);
} finally {
  await client.close();
}
