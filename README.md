# Obsidian Bridge

**For Cursor and Grok Bot.**

**Free, MIT.** Connect Cursor or Grok Bot to a **local Obsidian vault**: read notes, append work logs, search — all via MCP. Nothing leaves your machine except what you paste in chat.

## Important

This marketplace plugin **does not** bundle your vault or Obsidian.app. It starts the local MCP server [obsidian-mcp](https://github.com/1019666077-bit/obsidian-mcp) (MIT fork of [StevenStavrakis/obsidian-mcp](https://github.com/StevenStavrakis/obsidian-mcp)) with a vault path **you** configure.

Homepage: https://mymoying.com/obsidian — coming soon.

## Install

1. Install from Cursor Marketplace / Grok Bot Connect Apps (after listing), **or** clone into `~/.cursor/plugins/local/obsidian-bridge` and reload.
2. Install **Node.js 22+**.
3. Set your vault **absolute path** (folder must already contain `.obsidian`):

   - Copy `vault.local.example.txt` → `vault.local.txt` and edit one line, **or**
   - Set env `OBSIDIAN_BRIDGE_VAULT`, **or**
   - Put the path in `~/.cursor/obsidian-bridge-vault.txt`

4. Reload Cursor. First MCP start may run `npx obsidian-mcp@2` (network once).

## Free vs Pro

| Free | Pro (placeholder) |
| --- | --- |
| Read notes | Multi-vault UI |
| Create / append work logs | Graph queries |
| Search content, filenames, tags | Scheduled sync |
| Single vault id `notes` | Bulk tag automation |

## What’s inside

| Piece | Role |
| --- | --- |
| `mcp.json` | Starts `scripts/serve.mjs` → `npx obsidian-mcp@2 serve` |
| `scripts/serve.mjs` | Resolves vault path; never commits secrets |
| `skills/obsidian-worklog` | When to read, append, search |
| `rules/obsidian-bridge.mdc` | Local-only, Free tool guardrails |
| `commands/log-work`, `search-vault`, `check-obsidian-bridge` | Common flows |

## Local smoke test

From this repo (with `vault.local.txt` pointing at your vault):

```bash
cd scripts/smoke
npm install
node accept-local.mjs
```

Default acceptance note: `obsidian-bridge-local.md` in the vault root.

## License

MIT — see `LICENSE`. obsidian-mcp is MIT; upstream credit Steven Stavrakis.

## Author

Moying Studio · moying.studio@outlook.com
