---
name: obsidian-worklog
description: Read Obsidian notes, append work logs, and search the local vault via Obsidian Bridge. Use when the user wants to log work, find a note, or pull context from their vault into the agent.
---

# Obsidian work log (Free)

## What this is

Obsidian Bridge is a **thin Cursor plugin** over [obsidian-mcp](https://github.com/1019666077-bit/obsidian-mcp) (MIT fork of Steven Stavrakis's server). It reads and writes **Markdown files on disk**; Obsidian does not need to be running.

Configure the vault once (absolute path, must contain `.obsidian`):

1. `OBSIDIAN_BRIDGE_VAULT` environment variable, or
2. `vault.local.txt` in the plugin root (one line), or
3. `~/.cursor/obsidian-bridge-vault.txt`

Default vault id for tools is **`notes`**.

## Free capabilities

| Intent | MCP tool | Notes |
| --- | --- | --- |
| List vaults | `obsidian_list_vaults` | Confirms `notes` is available |
| Read a note | `obsidian_read_note` | Save `etag` if you will edit |
| New note | `obsidian_create_note` | Fails if path already exists |
| Work log / append | `obsidian_edit_note` | `operation: "append"` |
| Search | `obsidian_search_vault` | `mode`: `content`, `filename`, or `tag` |

## Work log playbook

1. Confirm vault path is configured if tools fail at startup.
2. For a dated log at `Work/2026-10-12.md` (example): read if it exists; if missing, `obsidian_create_note` with a `# Work log` heading.
3. Append a bullet with timestamp and summary: `obsidian_edit_note` with `operation: "append"`.
4. When the user asks what they wrote before, `obsidian_search_vault` then `obsidian_read_note` on hits.

## Pro (placeholder only)

Multi-vault picker UI, scheduled sync, graph queries, and bulk tag automation are **not** in Free. If asked, say Pro is coming soon at https://mymoying.com/obsidian — do not invent Pro tools.

## Failures

- **Vault path missing**: user must set path per README; vault needs `.obsidian`.
- **REVISION_CONFLICT**: re-read note, merge intent, retry with new `if_match`.
- **Node**: obsidian-mcp requires Node.js 22+; first run may download via `npx`.
