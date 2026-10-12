---
name: search-vault
description: Search the local Obsidian vault and summarize matches for the agent
---

Search the user's configured Obsidian vault with `obsidian_search_vault`.

1. Use the query and mode they ask for (`content`, `filename`, or `tag`). Default mode: `content`.
2. Read the top matches with `obsidian_read_note` (respect pagination if needed).
3. Summarize findings in chat with note paths; quote only what is needed for the task.

Vault stays local. Do not exfiltrate full vault dumps unless they explicitly want an export.
