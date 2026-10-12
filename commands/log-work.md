---
name: log-work
description: Append a work-log entry to the user's local Obsidian vault via Obsidian Bridge
---

Append today's work to the user's Obsidian vault using the `obsidian` MCP tools.

1. Ask which note path to use if they did not say (default: `obsidian-bridge-local.md` in vault root for smoke tests, or `Work/YYYY-MM-DD.md` for daily logs).
2. `obsidian_read_note` if the note exists; otherwise `obsidian_create_note` with a short title heading.
3. `obsidian_edit_note` with `operation: "append"` and a bullet: time (local), task summary, and any links they mention.
4. Confirm the relative path written; remind them the file is on disk in their vault only.

Do not delete notes. Pro features are placeholders only.
